import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_USERS_API_URL, // ej: http://localhost:8000
  headers: { 'Content-Type': 'application/json' },
});
console.log(api)

export const getUsers   = () => api.get('/api/users');
export const getUser    = (id) => api.get(`/api/users/${id}`);
export const createUser = (data) => api.post('/api/users', data);
export const updateUser = (id, data) => api.put(`/api/users/${id}`, data);
export const deleteUser = (id) => api.delete(`/api/users/${id}`);
