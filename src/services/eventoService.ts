// src/services/eventoService.ts

// Interface básica (ajuste conforme o formato real do seu evento)
export interface Evento {
  id: string; // Guid no C#
  nome: string;
  data: string; // Pode ser ISO ou outro formato vindo do backend
  // Outros campos conforme o backend
}

export interface CreateEventData {
  nome: string;
  // Outros campos necessários
}

export interface UpdateEventData {
  id: string;
  nome: string;
  // Outros campos se houver
}

// 🔗 Base URL do backend
const API_URL = "https://localhost:7032/api/evento"; // ajuste conforme teu back

// GET - Buscar todos os eventos
export async function getAllEventosRequest(): Promise<Evento[]> {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Erro ao buscar eventos");
  return res.json();
}

// GET - Buscar um evento por ID
export async function getEventoByIdRequest(id: string): Promise<Evento> {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error("Erro ao buscar evento por ID");
  return res.json();
}

// POST - Criar um novo evento
export async function createEventoRequest(eventData: CreateEventData): Promise<Evento> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(eventData),
  });
  if (!res.ok) throw new Error("Erro ao criar evento");
  return res.json();
}

// PUT - Atualizar evento existente
export async function updateEventoRequest(id: string, eventData: UpdateEventData): Promise<void> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(eventData),
  });
  if (!res.ok) throw new Error("Erro ao atualizar evento");
}

// DELETE - Deletar evento
export async function deleteEventoRequest(id: string): Promise<void> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Erro ao deletar evento");
}
