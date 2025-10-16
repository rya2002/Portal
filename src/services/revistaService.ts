// src/services/revistaService.ts
import api from './api';

export async function getAllRevistas() {
  const res = await api.get('/revista');
  return res.data;
}

export async function getRevistaById(id: string) {
  const res = await api.get(`/revista/${id}`);
  return res.data;
}

export async function createRevista(data: any) {
  const res = await api.post('/revista', data);
  return res.data;
}

export async function updateRevista(id: string, data: any) {
  const res = await api.put(`/revista/${id}`, data);
  return res.data;
}

export async function deleteRevista(id: string) {
  const res = await api.delete(`/revista/${id}`);
  return res.data;
}
