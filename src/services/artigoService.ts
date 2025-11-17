import api from "./api";
import { ArtigoDTO } from "../types/artigos";

// GET
export async function getAllArtigos(): Promise<ArtigoDTO[]> {
  const res = await api.get("/artigos");
  return res.data;
}

export async function getArtigoById(id: string): Promise<ArtigoDTO> {
  const res = await api.get(`/artigos/${id}`);
  return res.data;
}

// CREATE usando FormData
export async function createArtigo(formData: FormData): Promise<ArtigoDTO> {
  const res = await api.post("/artigos", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}

// UPDATE (se quiser manter como JSON)
export async function updateArtigo(
  id: string,
  data: Partial<ArtigoDTO>
): Promise<ArtigoDTO> {
  const res = await api.put(`/artigos/${id}`, data);
  return res.data;
}

// DELETE
export async function deleteArtigo(id: string): Promise<boolean> {
  await api.delete(`/artigos/${id}`);
  return true;
}

// DOWNLOAD
export async function downloadPdfArtigo(
  id: string,
  titulo = "artigo"
): Promise<void> {
  const res = await api.get(`/artigos/${id}/download`, {
    responseType: "blob",
  });
  const url = window.URL.createObjectURL(res.data);

  const link = document.createElement("a");
  link.href = url;
  link.download = `${titulo}-${id}.pdf`;
  link.click();

  window.URL.revokeObjectURL(url);
}

// UPLOAD PDF (caso queira alterar após a criação)
export async function uploadPdfArtigo(id: string, file: File): Promise<void> {
  const formData = new FormData();
  formData.append("ArquivoPdf", file);

  await api.put(`/artigos/${id}/upload`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}
