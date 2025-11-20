import { Event, CreateEventData, UpdateEventData } from "../components/Event/types";

const API_URL = "https://localhost:5186/api/evento"; // 🔹 Ajuste conforme o backend

// 🔹 GET - Buscar todos os eventos
export async function getAllEventosRequest(): Promise<Event[]> {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Erro ao buscar eventos");
  return res.json();
}

// 🔹 GET - Buscar evento por ID
export async function getEventoByIdRequest(id: string): Promise<Event> {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error("Erro ao buscar evento por ID");
  return res.json();
}

// 🔹 POST - Criar novo evento
export async function createEventoRequest(eventData: CreateEventData): Promise<Event> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(eventData),
  });
  if (!res.ok) throw new Error("Erro ao criar evento");
  return res.json();
}

// 🔹 PUT - Atualizar evento existente
export async function updateEventoRequest(id: string, eventData: UpdateEventData): Promise<Event> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(eventData),
  });
  if (!res.ok) throw new Error("Erro ao atualizar evento");
  return res.json();
}

// 🔹 DELETE - Deletar evento
export async function deleteEventoRequest(id: string): Promise<void> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Erro ao deletar evento");
}
