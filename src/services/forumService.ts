// src/services/forumService.ts
import api from './api';

export async function getAllForumPosts() {
  const res = await api.get('/forum');
  return res.data;
}

export async function getForumPostById(id: string) {
  const res = await api.get(`/forum/${id}`);
  return res.data;
}

export async function createForum(data: any) {
  const res = await api.post('/forum', data);
  return res.data;
}

export async function updateForum(id: string, data: any) {
  const res = await api.put(`/forum/${id}`, data);
  return res.data;
}

export async function deleteForum(id: string) {
  const res = await api.delete(`/forum/${id}`);
  return res.data;
}
