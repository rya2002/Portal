import api from './api';

export async function getAllArtigos() {
  const res = await api.get('/artigos');
  // 🔹 Garante que retorna sempre um array
  return Array.isArray(res.data) ? res.data : res.data?.data ?? [];
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

export async function downloadPdfArtigo(id: string) {
  const res = await api.get(`/artigos/${id}/download`, { responseType: 'blob' });
  const url = window.URL.createObjectURL(res.data);
  const a = document.createElement('a');
  a.href = url;
  a.download = `artigo-${id}.pdf`;
  a.click();
  window.URL.revokeObjectURL(url);
}

export async function uploadPdfArtigo(id: string, file: File) {
  const form = new FormData();
  form.append('Id', id);              
  form.append('ArquivoPdf', file);    

  await api.put(`/artigos/${id}/upload`, form, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
}