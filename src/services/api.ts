// src/services/api.ts

import axios from 'axios';

const api = axios.create({
  // Define a URL base para TODAS as requisições (ex: http://localhost:5186/api)
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5186/api', 
  headers: {
    'Content-Type': 'application/json',
  },
  // Essencial para enviar e receber o cookie de autenticação/sessão
  withCredentials: true, 
});

// Interceptador de respostas (pra capturar erros automaticamente)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Loga o erro, permitindo que o bloco 'catch' no service o receba
    console.error('Erro na requisição:', error.response || error);
    return Promise.reject(error);
  }
);

export default api;
