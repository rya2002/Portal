import api from "./api";
import { ArtigoDTO, CreateArtigoPayload } from "../types/artigos";

export async function getAllArtigos(): Promise<ArtigoDTO[]> {
  const res = await api.get("/artigos");
  return res.data;
}

export async function getArtigoById(id: string): Promise<ArtigoDTO> {
  const res = await api.get(`/artigos/${id}`);
  return res.data;
}

export async function createArtigo(
  data: CreateArtigoPayload
): Promise<ArtigoDTO> {
  const res = await api.post("/artigos", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}

export async function updateArtigo(
  id: string,
  data: Partial<CreateArtigoPayload>
): Promise<ArtigoDTO> {
  const res = await api.put(`/artigos/${id}`, data);
  return res.data;
}

export async function deleteArtigo(id: string): Promise<boolean> {
  await api.delete(`/artigos/${id}`);
  return true;
}

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

export async function uploadPdfArtigo(id: string, file: File): Promise<void> {
  const formData = new FormData();
  formData.append("ArquivoPdf", file);

  await api.put(`/artigos/${id}/upload`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}
