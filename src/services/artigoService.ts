// src/services/artigoService.ts
import api from './api';

export async function getAllArtigos() {
  const res = await api.get('/artigos');
  return res.data;
}

export async function getArtigoById(id: string) {
  const res = await api.get(`/artigos/${id}`);
  return res.data;
}

export async function createArtigo(data: any) {
  const res = await api.post('/artigos', data);
  return res.data;
}

export async function updateArtigo(id: string, data: any) {
  const res = await api.put(`/artigos/${id}`, data);
  return res.data;
}

export async function deleteArtigo(id: string) {
  const res = await api.delete(`/artigos/${id}`);
  return res.data;
}
