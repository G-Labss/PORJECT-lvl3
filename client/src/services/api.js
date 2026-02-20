import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const lessonAPI = {
  getAll: async () => {
    const response = await api.get('/lessons');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/lessons/${id}`);
    return response.data;
  },

  create: async (lessonData) => {
    const response = await api.post('/lessons', lessonData);
    return response.data;
  },

  update: async (id, lessonData) => {
    const response = await api.put(`/lessons/${id}`, lessonData);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/lessons/${id}`);
    return response.data;
  },
};

export const userAPI = {
  getAll: async () => {
    const response = await api.get('/users');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },
};

export default api;