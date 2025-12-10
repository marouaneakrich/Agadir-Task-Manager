const express = require('express');
const { pool } = require('../config/database');
const { authenticateToken } = require('../middleware/auth');
const { validateTask } = require('../middleware/validation');

const router = express.Router();

router.use(authenticateToken);

router.get('/', async (req, res) => {
  try {
    const { status } = req.query;
    let query = 'SELECT * FROM tasks WHERE user_id = $1';
    const params = [req.user.id];

    if (status && ['pending', 'done'].includes(status)) {
      query += ' AND status = $2';
      params.push(status);
    }

    query += ' ORDER BY due_date ASC, created_at DESC';

    const result = await pool.query(query, params);

    res.json({
      success: true,
      count: result.rows.length,
      tasks: result.rows
    });
  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(500).json({ error: 'Server error fetching tasks' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'SELECT * FROM tasks WHERE id = $1 AND user_id = $2',
      [id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json({
      success: true,
      task: result.rows[0]
    });
  } catch (error) {
    console.error('Get task error:', error);
    res.status(500).json({ error: 'Server error fetching task' });
  }
});

router.post('/', validateTask, async (req, res) => {
  try {
    const { title, description, due_date } = req.body;

    const result = await pool.query(
      'INSERT INTO tasks (user_id, title, description, due_date) VALUES ($1, $2, $3, $4) RETURNING *',
      [req.user.id, title, description, due_date]
    );

    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      task: result.rows[0]
    });
  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({ error: 'Server error creating task' });
  }
});

router.put('/:id', validateTask, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status, due_date } = req.body;

    const checkTask = await pool.query(
      'SELECT * FROM tasks WHERE id = $1 AND user_id = $2',
      [id, req.user.id]
    );

    if (checkTask.rows.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const result = await pool.query(
      'UPDATE tasks SET title = $1, description = $2, status = $3, due_date = $4 WHERE id = $5 AND user_id = $6 RETURNING *',
      [title, description, status || 'pending', due_date, id, req.user.id]
    );

    res.json({
      success: true,
      message: 'Task updated successfully',
      task: result.rows[0]
    });
  } catch (error) {
    console.error('Update task error:', error);
    res.status(500).json({ error: 'Server error updating task' });
  }
});

router.patch('/:id/done', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'UPDATE tasks SET status = $1 WHERE id = $2 AND user_id = $3 RETURNING *',
      ['done', id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json({
      success: true,
      message: 'Task marked as done',
      task: result.rows[0]
    });
  } catch (error) {
    console.error('Mark done error:', error);
    res.status(500).json({ error: 'Server error updating task status' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING *',
      [id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json({
      success: true,
      message: 'Task deleted successfully',
      task: result.rows[0]
    });
  } catch (error) {
    console.error('Delete task error:', error);
    res.status(500).json({ error: 'Server error deleting task' });
  }
});

module.exports = router;