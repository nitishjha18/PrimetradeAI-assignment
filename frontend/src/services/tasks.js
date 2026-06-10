import api from './api';

export const getTasks = () => {
  return api.get('/tasks');
};

export const createTask = (title, description, status) => {
  return api.post('/tasks', { title, description, status });
};

export const updateTask = (id, data) => {
  return api.put(`/tasks/${id}`, data);
};

export const deleteTask = (id) => {
  return api.delete(`/tasks/${id}`);
};
