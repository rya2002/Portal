// src/services/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5186/api', // criar um arquivo dentro de src ".env" com essas informações dentro "VITE_API_BASE_URL=http://localhost:5186/api"
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // envia cookies (sessão, autenticação, etc)
});

// Interceptador de respostas (pra capturar erros automaticamente)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Erro na requisição:', error.response || error);
    return Promise.reject(error);
  }
);

export default api;
