// src/services/artigoService.ts
import api from './api';

/** Buscar todos os artigos */
export async function getAllArtigos() {
  const res = await api.get('/artigos');
  return res.data;
}

/** Buscar artigo por ID */
export async function getArtigoById(id: string) {
  const res = await api.get(`/artigos/${id}`);
  return res.data;
}

/** Criar novo artigo */
export async function createArtigo(data: any) {
  const res = await api.post('/artigos', data);
  return res.data;
}

/** Atualizar artigo existente */
export async function updateArtigo(id: string, data: any) {
  const res = await api.put(`/artigos/${id}`, data);
  return res.data;
}

/** Deletar artigo */
export async function deleteArtigo(id: string) {
  const res = await api.delete(`/artigos/${id}`);
  return res.data;
}

/** 🆕 Upload de PDF para o artigo */
export async function uploadPdfArtigo(id: string, file: File) {
  const formData = new FormData();
  formData.append('ArquivoPdf', file);
  formData.append('Id', id);

  const res = await api.put(`/artigos/${id}/upload`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return res.data;
}

/** 🆕 Download do PDF do artigo */
export async function downloadPdfArtigo(id: string) {
  const res = await api.get(`/artigos/${id}/download`, { responseType: 'blob' });
  const blob = new Blob([res.data], { type: 'application/pdf' });
  const url = window.URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = `artigo-${id}.pdf`;
  link.click();

  window.URL.revokeObjectURL(url);
}
