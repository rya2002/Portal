// src/services/api.ts

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5186/api', // Sugestão: Use a variável de ambiente VITE_API_BASE_URL
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Importante para que os cookies sejam enviados/recebidos
});

// =================== FUNÇÕES DE USUÁRIO ===================
export const loginRequest = (credentials: any) => {
  return api.post('/usuario/Login', credentials);
};

export const registerRequest = (userData: any) => {
  return api.post('/usuario', userData);
};

export const logoutRequest = () => {
  return api.post('/usuario/Logout');
};

// =================== FUNÇÕES DE REVISTA ===================
export const getAllRevistas = () => api.get('/revista');
export const getRevistaById = (id: string) => api.get(`/revista/${id}`);
export const createRevista = (data: any) => api.post('/revista', data);
export const updateRevista = (id: string, data: any) => api.put(`/revista/${id}`, data);
export const deleteRevista = (id: string) => api.delete(`/revista/${id}`);

// =================== FUNÇÕES DE ARTIGO ===================
export const getAllArtigos = () => api.get('/artigos');
export const getArtigoById = (id: string) => api.get(`/artigos/${id}`);
export const createArtigo = (data: any) => api.post('/artigos', data);
export const updateArtigo = (id: string, data: any) => api.put(`/artigos/${id}`, data);
export const deleteArtigo = (id: string) => api.delete(`/artigos/${id}`);

export default api;