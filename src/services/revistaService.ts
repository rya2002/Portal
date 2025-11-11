import api from "./api";

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5186/api";

// Helper local
const isValidGuid = (id?: string) =>
  typeof id === "string" &&
  /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/.test(
    id
  );

// GET todas as revistas
export async function getAllRevistas() {
  const res = await api.get("/revista");
  return res.data;

  // const raw = Array.isArray(res.data?.data)
  //   ? res.data.data
  //   : Array.isArray(res.data)
  //   ? res.data
  //   : [];

  // // filtra IDs inválidos (evita warnings e ações em 0000-...-0000)
  // const safe = raw.filter((r: any) => isValidGuid(r?.id));

  // return safe.map((r: any) => ({
  //   id: r.id as string,
  //   titulo: r.titulo,
  //   descricao: r.descricao,
  //   publicacao: r.publicacao,
  //   arquivopdf: r.arquivopdf,
  //   autores: r.autores ?? [],
  //   area: r.area ?? "",
  //   keywords: (r.keywords ?? []).map((k: any) => ({
  //     id: k.id,
  //     titulo: k.titulo,
  //   })),
  //   // rota de imagem pode não existir no backend (405). Só expomos a URL.
  //   capaUrl: `${BASE_URL}/revista/${r.id}/imagem`,
  // }));
}

// GET por ID
export async function getRevistaById(id: string) {
  const res = await api.get(`/revista/${id}`);
  const r = res.data?.data ?? res.data;

  return {
    id: r.id as string,
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

// POST – criar revista (retorna ID)
export async function createRevista(data: {
  titulo: string;
  descricao: string;
  publicacao: string;
  area: number;
  autores: string[];
  keywordsIds: string[];
}) {
  const res = await api.post("/revista", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res;
}

// PUT – upload de capa
export async function uploadCapaRevista(id: string, file: File) {
  const form = new FormData();
  form.append("Capa", file);
  await api.put(`/revista/${id}/imagem`, form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}

// PUT – upload de PDF
export async function uploadPdfRevista(id: string, file: File) {
  const form = new FormData();
  form.append("ArquivoPdf", file);
  await api.put(`/revista/${id}/upload`, form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}

// GET – download de PDF
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

// DELETE – silencioso (sem warnings)
export async function deleteRevista(id: string) {
  await api.delete(`/revista/${id}`);
  return true;
}
