import React, { createContext, useState, useContext } from 'react';
import apiClient from '../api/client';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTasks = async (status = null) => {
    setLoading(true);
    try {
      const url = status ? `/tasks?status=${status}` : '/tasks';
      const response = await apiClient.get(url);
      setTasks(response.data.tasks);
      return { success: true, tasks: response.data.tasks };
    } catch (error) {
      const message = error.response?.data?.error || 'Failed to fetch tasks';
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (taskData) => {
    try {
      const response = await apiClient.post('/tasks', taskData);
      setTasks([response.data.task, ...tasks]);
      return { success: true, task: response.data.task };
    } catch (error) {
      const message = error.response?.data?.error || 'Failed to create task';
      return { success: false, error: message };
    }
  };

  const updateTask = async (id, taskData) => {
    try {
      const response = await apiClient.put(`/tasks/${id}`, taskData);
      setTasks(
        tasks.map((task) =>
          task.id === id ? response.data.task : task
        )
      );
      return { success: true, task: response.data.task };
    } catch (error) {
      const message = error.response?.data?.error || 'Failed to update task';
      return { success: false, error: message };
    }
  };

  const markTaskDone = async (id) => {
    try {
      const response = await apiClient.patch(`/tasks/${id}/done`);
      setTasks(
        tasks.map((task) =>
          task.id === id ? response.data.task : task
        )
      );
      return { success: true, task: response.data.task };
    } catch (error) {
      const message = error.response?.data?.error || 'Failed to mark task as done';
      return { success: false, error: message };
    }
  };

  const deleteTask = async (id) => {
    try {
      await apiClient.delete(`/tasks/${id}`);
      setTasks(tasks.filter((task) => task.id !== id));
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.error || 'Failed to delete task';
      return { success: false, error: message };
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        fetchTasks,
        createTask,
        updateTask,
        markTaskDone,
        deleteTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within TaskProvider');
  }
  return context;
};