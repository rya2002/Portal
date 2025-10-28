import api from './api';

export async function getAllRevistas() {
  const res = await api.get('/revista');
  // 🔹 Garante que retorna sempre um array
  return Array.isArray(res.data) ? res.data : res.data?.data ?? [];
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

export async function downloadPdfRevista(id: string) {
  const res = await api.get(`/revista/${id}/download`, { responseType: 'blob' });
  const url = window.URL.createObjectURL(res.data);
  const a = document.createElement('a');
  a.href = url;
  a.download = `revista-${id}.pdf`;
  a.click();
  window.URL.revokeObjectURL(url);
}

export async function uploadPdfRevista(id: string, file: File) {
  const form = new FormData();
  form.append('Id', id);              
  form.append('ArquivoPdf', file);     

  await api.put(`/revista/${id}/upload`, form, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
}