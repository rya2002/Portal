// src/services/revistaService.ts
import api from "./api";

// 📘 Obter todas as revistas
export async function getAllRevistas() {
  const res = await api.get("/revista");
  return res.data;
}

// 📘 Obter revista por ID
export async function getRevistaById(id: string) {
  const res = await api.get(`/revista/${id}`);
  return res.data;
}

// ✏️ Criar nova revista
export async function createRevista(data: any) {
  const res = await api.post("/revista", data);
  return res.data;
}

// ✏️ Atualizar revista
export async function updateRevista(id: string, data: any) {
  const res = await api.put(`/revista/${id}`, data);
  return res.data;
}

// 🗑️ Excluir revista
export async function deleteRevista(id: string) {
  const res = await api.delete(`/revista/${id}`);
  return res.data;
}

// 📥 Download do PDF
export async function downloadPdfRevista(id: string) {
  const res = await api.get(`/revista/${id}/download`, {
    responseType: "blob", // importante para baixar arquivos binários
  });

  // Cria o link temporário para baixar o arquivo
  const url = window.URL.createObjectURL(new Blob([res.data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `revista-${id}.pdf`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  return true;
}

// 📤 Upload de PDF
export async function uploadPdfRevista(id: string, file: File) {
  const formData = new FormData();
  formData.append("ArquivoPdf", file);

  const res = await api.put(`/revista/${id}/upload`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}

// 🖼️ Upload de imagem (capa)
export async function uploadImagemRevista(id: string, file: File) {
  const formData = new FormData();
  formData.append("Capa", file);

  const res = await api.put(`/revista/${id}/imagem`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}
