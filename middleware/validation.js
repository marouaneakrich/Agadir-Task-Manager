
const validateRegister = (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || name.trim().length < 2) {
    return res.status(400).json({ error: 'Name must be at least 2 characters long' });
  }

  if (!email || !isValidEmail(email)) {
    return res.status(400).json({ error: 'Please provide a valid email address' });
  }

  if (!password || password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters long' });
  }

  next();
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !isValidEmail(email)) {
    return res.status(400).json({ error: 'Please provide a valid email address' });
  }

  if (!password) {
    return res.status(400).json({ error: 'Password is required' });
  }

  next();
};

const validateTask = (req, res, next) => {
  const { title, description, status, due_date } = req.body;

  if (!title || title.trim().length < 3) {
    return res.status(400).json({ error: 'Task title must be at least 3 characters long' });
  }

  if (status && !['pending', 'done'].includes(status)) {
    return res.status(400).json({ error: 'Status must be either "pending" or "done"' });
  }

  if (due_date && !isValidDate(due_date)) {
    return res.status(400).json({ error: 'Please provide a valid due date' });
  }

  next();
};

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidDate = (dateString) => {
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date);
};

module.exports = {
  validateRegister,
  validateLogin,
  validateTask
};