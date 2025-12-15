// src/services/api.js
import axios from 'axios';

const API_URL = "https://aptarabe.tjdem.online"
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Client API
export const clientsAPI = {
  uploadExcel: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/api/clients/upload-excel', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  getAll: (skip = 0, limit = 100) => {
    return api.get('/api/clients/', { params: { skip, limit } });
  },

  getStats: () => {
    return api.get('/api/clients/stats');
  },

  delete: (clientId) => {
    return api.delete(`/api/clients/${clientId}`);
  },

  deleteAll: () => {
    return api.delete('/api/clients/all');
  },
};

// Email API
export const emailsAPI = {
  sendAll: () => {
    return api.post('/api/emails/send-all');
  },

  sendSingle: (clientId) => {
    return api.post(`/api/emails/send/${clientId}`);
  },
};

// Tracking API
export const trackingAPI = {
  getClientData: (token) => {
    return api.get(`/api/track/data/${token}`);
  },
};

export default api;
