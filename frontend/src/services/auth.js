import api from './api';

export const register = (email, password, role) => {
  return api.post('/auth/register', { email, password, role });
};

export const login = (email, password) => {
  return api.post('/auth/login', { email, password });
};
