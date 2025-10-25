// src/services/forumService.ts

// ⚙️ URL da API — ajusta a porta se for diferente no teu backend
const API_URL = "https://localhost:7059/api/postagem"; 

// 🔹 Buscar todas as postagens
export async function getAllPostagens() {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Erro ao buscar postagens");
  }
  return await response.json();
}

// 🔹 Buscar postagem por ID
export async function getPostagemById(id: string) {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) {
    throw new Error("Erro ao buscar postagem por ID");
  }
  return await response.json();
}

// 🔹 Criar nova postagem
export async function createPostagem(data: any) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Erro ao criar postagem");
  }

  return await response.json();
}

// 🔹 Atualizar postagem
export async function updatePostagem(id: string, data: any) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Erro ao atualizar postagem");
  }

  return await response.json();
}

// 🔹 Deletar postagem
export async function deletePostagem(id: string) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Erro ao deletar postagem");
  }

  return await response.json();
}

