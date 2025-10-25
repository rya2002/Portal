// src/services/forumService.ts

const API_BASE_URL = "http://localhost:5120/api"; // Ajusta pro teu backend

export async function getAllForumPosts() {
  const res = await fetch(`${API_BASE_URL}/forum`);
  if (!res.ok) throw new Error("Erro ao buscar fóruns");
  return res.json();
}

export async function getForumPostById(id: string) {
  const res = await fetch(`${API_BASE_URL}/forum/${id}`);
  if (!res.ok) throw new Error("Erro ao buscar fórum por ID");
  return res.json();
}

export async function createForum(data: any) {
  const res = await fetch(`${API_BASE_URL}/forum`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Erro ao criar fórum");
  return res.json();
}

export async function updateForum(id: string, data: any) {
  const res = await fetch(`${API_BASE_URL}/forum/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Erro ao atualizar fórum");
  return res.json();
}

export async function deleteForum(id: string) {
  const res = await fetch(`${API_BASE_URL}/forum/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Erro ao deletar fórum");
  return res.json();
}
