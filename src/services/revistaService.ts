import api from "./api";

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5186/api";

const isValidGuid = (id?: string) =>
  typeof id === "string" &&
  /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/.test(
    id
  );

// GET todas
export async function getAllRevistas() {
  const res = await api.get("/revista");
  return res.data;
}

// GET por ID
export async function getRevistaById(id: string) {
  const res = await api.get(`/revista/${id}`);
  const r = res.data?.data ?? res.data;

  return {
    id: r.id,
    titulo: r.titulo,
    descricao: r.descricao,
    publicacao: r.publicacao,
    arquivopdf: r.arquivopdf,
    autores: r.autores ?? [],
    area: r.area ?? "",
    keywords: (r.keywords ?? []).map((k: any) => ({
      id: k.id,
      titulo: k.titulo,
    })),
    capaUrl: `${BASE_URL}/revista/${id}/imagem`,
  };
}

// CREATE usando FormData
export async function createRevista(formData: FormData) {
  const res = await api.post("/revista", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}

// UPLOAD CAPA
export async function uploadCapaRevista(id: string, file: File) {
  const form = new FormData();
  form.append("Capa", file);

  await api.put(`/revista/${id}/imagem`, form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}

// UPLOAD PDF
export async function uploadPdfRevista(id: string, file: File) {
  const form = new FormData();
  form.append("ArquivoPdf", file);

  await api.put(`/revista/${id}/upload`, form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}

// DOWNLOAD PDF
export async function downloadPdfRevista(id: string, titulo?: string) {
  const res = await api.get(`/revista/${id}/download`, {
    responseType: "blob",
  });

  const url = window.URL.createObjectURL(res.data);
  const a = document.createElement("a");

  a.href = url;
  a.download = `${titulo ?? "revista"}-${id}.pdf`;
  a.click();

  window.URL.revokeObjectURL(url);
}

// DELETE
export async function deleteRevista(id: string) {
  await api.delete(`/revista/${id}`);
  return true;
}
