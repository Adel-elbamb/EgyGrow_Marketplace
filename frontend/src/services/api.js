import axios from "axios";

const api = axios.create({
  baseURL: 'http://localhost:3000'
});

// Simple token interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('user_token');
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

export default api;
