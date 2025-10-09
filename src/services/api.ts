// src/services/api.ts

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5186/api', // Use a variável de ambiente
  headers: {
    'Content-Type': 'application/json',
  },
});

// GET /api/revistas
export const getAllRevistas = () => api.get('/revista');

// GET /api/revistas/{id} -> Ajustado para receber string
export const getRevistaById = (id: string) => api.get(`/revista/${id}`);

// POST /api/revistas
export const createRevista = (data: any) => api.post('/revista', data);

// PUT /api/revistas/{id} -> O ID pode vir no próprio 'data' ou ser passado separadamente
export const updateRevista = (id: string, data: any) => api.put(`/revista/${id}`, data);

// DELETE /api/revistas/{id} -> Ajustado para receber string
export const deleteRevista = (id: string) => api.delete(`/revista/${id}`);

// GET /api/artigos
export const getAllArtigos = () => api.get('/artigos');

// GET /api/artigos/{id} -> Ajustado para receber string
export const getArtigoById = (id: string) => api.get(`/artigos/${id}`);

// POST /api/artigos
export const createArtigo = (data: any) => api.post('/artigos', data);

// PUT /api/artigos/{id} -> O ID pode vir no próprio 'data' ou ser passado separadamente
export const updateArtigo = (id: string, data: any) => api.put(`/artigos/${id}`, data);

// DELETE /api/artigos/{id} -> Ajustado para receber string
export const deleteArtigo = (id: string) => api.delete(`/artigos/${id}`);


export default api;