import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach JWT token to every request if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const lessonAPI = {
  getAll: () => api.get('/lessons').then(r => r.data),
  getById: (id) => api.get(`/lessons/${id}`).then(r => r.data),
  create: (data) => api.post('/lessons', data).then(r => r.data),
  update: (id, data) => api.put(`/lessons/${id}`, data).then(r => r.data),
  delete: (id) => api.delete(`/lessons/${id}`).then(r => r.data),
};

export const userAPI = {
  getAll: () => api.get('/users').then(r => r.data),
  getById: (id) => api.get(`/users/${id}`).then(r => r.data),
};

export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials).then(r => r.data),
};

export const contactAPI = {
  submit: (data) => api.post('/contact', data).then(r => r.data),
};

export const discountAPI = {
  validate: (code) => api.post('/discounts/validate', { code }).then(r => r.data),
};

export const paymentAPI = {
  createStripeIntent: (data) => api.post('/payments/stripe/intent', data).then(r => r.data),
  confirmStripePayment: (data) => api.post('/payments/stripe/confirm', data).then(r => r.data),
  createCryptoBooking: (data) => api.post('/payments/crypto', data).then(r => r.data),
  getCoachWallet: () => api.get('/payments/coach-wallet').then(r => r.data),
};

export const bookingAPI = {
  getAll: () => api.get('/bookings').then(r => r.data),
  getById: (id) => api.get(`/bookings/${id}`).then(r => r.data),
};

export default api;
