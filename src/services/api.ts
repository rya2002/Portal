// src/services/api.ts

import axios from 'axios';

const api = axios.create({
  // URL da API rodando na máquina virtual
  baseURL: 'http://10.77.1.56:8080/api', // 'http://localhost:8080/api'
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
