// src/services/revistaService.ts
import api from './api';

/** Buscar todas as revistas */
export async function getAllRevistas() {
  const res = await api.get('/revista');
  return res.data;
}

/** Buscar revista por ID */
export async function getRevistaById(id: string) {
  const res = await api.get(`/revista/${id}`);
  return res.data;
}

/** Criar nova revista */
export async function createRevista(data: any) {
  const res = await api.post('/revista', data);
  return res.data;
}

/** Atualizar revista existente */
export async function updateRevista(id: string, data: any) {
  const res = await api.put(`/revista/${id}`, data);
  return res.data;
}

/** Deletar revista */
export async function deleteRevista(id: string) {
  const res = await api.delete(`/revista/${id}`);
  return res.data;
}

/** 🆕 Upload de PDF para a revista */
export async function uploadPdfRevista(id: string, file: File) {
  const formData = new FormData();
  formData.append('ArquivoPdf', file);
  formData.append('Id', id);

  const res = await api.put(`/revista/${id}/upload`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return res.data;
}

/** 🆕 Download do PDF da revista */
export async function downloadPdfRevista(id: string) {
  const res = await api.get(`/revista/${id}/download`, { responseType: 'blob' });
  const blob = new Blob([res.data], { type: 'application/pdf' });
  const url = window.URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = `revista-${id}.pdf`;
  link.click();

  window.URL.revokeObjectURL(url);
}
