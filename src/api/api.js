import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api', // Cambia el puerto si tu backend usa otro
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para incluir el token automáticamente
axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
