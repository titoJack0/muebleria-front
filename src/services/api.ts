import axios from 'axios';

const API_ROOT = import.meta.env.VITE_API_ROOT || 'http://127.0.0.1:8000';
const API_PREFIX = import.meta.env.VITE_API_URL || `${API_ROOT}/api/v1`;

// Instancia usada para llamadas a endpoints v1 (la mayoría del frontend)
const api = axios.create({
  baseURL: API_PREFIX,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  withCredentials: true, // mantener cookies si el backend usa sanctum
});

// Instancia raíz para llamadas relacionadas con sesión / sanctum
export const apiRoot = axios.create({
  baseURL: API_ROOT,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  withCredentials: true,
});

// Interceptor para adjuntar token si existe (opcional)
api.interceptors.request.use((config) => {
  try {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (e) {}
  return config;
});

api.interceptors.response.use((r) => r, (error) => {
  if (error.response?.status === 401) {
    // handled by app (AuthContext)
  }
  return Promise.reject(error);
});

apiRoot.interceptors.request.use((config) => {
  try {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (e) {}
  return config;
});

export default api;
