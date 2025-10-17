// src/services/eventoService.ts

import api from './api';

// Interface básica (ajuste conforme o formato real do seu evento)
interface Evento {
    id: string; // Guid no C#
    nome: string;
    data: string; // Ou outro formato de data/hora
    // Adicione outros campos conforme a estrutura do seu backend (ex: Local, Descricao, etc.)
}

// Interface para a criação de um evento (baseada no CreateEventCommand)
interface CreateEventData {
    nome: string;
    // ... outros campos necessários para a criação ...
}

// Interface para a atualização de um evento (baseada no UpdateEventCommand)
interface UpdateEventData {
    id: string;
    nome: string;
    
}
export async function getAllEventosRequest(): Promise<Evento[]> {
    const res = await api.get('/evento');
    // Seu controller retorna 'eventos' diretamente no corpo.
    return res.data; 
}


export async function getEventoByIdRequest(id: string): Promise<Evento> {
    const res = await api.get(`/evento/${id}`);
    
    if (!res.data.isSuccess) {
        throw new Error(res.data.message || "Falha ao buscar evento.");
    }
    return res.data.data;
}



export async function createEventoRequest(eventData: CreateEventData): Promise<{ id: string }> {
    
    const res = await api.post('/evento', eventData); 
    
    return res.data.eventoId || res.data; 
}
/

/
export async function updateEventoRequest(id: string, eventData: UpdateEventData): Promise<void> {
   
    await api.put(`/evento/${id}`, eventData);
   
}

/
export async function deleteEventoRequest(id: string): Promise<void> {
    await api.delete(`/evento/${id}`);
    // Retorna OK (200) em caso de sucesso.
}