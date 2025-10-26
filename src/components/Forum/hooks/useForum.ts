// src/hooks/useForum.ts
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import {
  getAllPostagens,
  createPostagem,
  updatePostagem,
  deletePostagem
} from '../../../services/forumService';
import { Postagem } from '../types/index';

export function useForum() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Postagem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 🔄 Carrega todas as postagens
  const carregarPostagens = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAllPostagens();
      setPosts(data);
      setError(null);
    } catch (err) {
      console.error('Erro ao carregar postagens:', err);
      setError('Erro ao carregar postagens.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    carregarPostagens();
  }, [carregarPostagens]);

  // ✍️ Criar nova postagem
  const criarPostagem = async (novaPostagem: Omit<Postagem, 'id' | 'createdAt' | 'autor'>) => {
    try {
      const post = await createPostagem({
        ...novaPostagem,
        autor: user?.name || 'Usuário Desconhecido',
      });
      setPosts((prev) => [post, ...prev]);
      return post;
    } catch (err) {
      console.error('Erro ao criar postagem:', err);
      throw err;
    }
  };

  // 🔧 Atualizar postagem existente
  const atualizarPostagem = async (id: string, dados: Partial<Postagem>) => {
    try {
      const postAtualizado = await updatePostagem(id, dados);
      setPosts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, ...postAtualizado } : p))
      );
      return postAtualizado;
    } catch (err) {
      console.error('Erro ao atualizar postagem:', err);
      throw err;
    }
  };

  // 🗑️ Deletar postagem
  const removerPostagem = async (id: string) => {
    try {
      await deletePostagem(id);
      setPosts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error('Erro ao deletar postagem:', err);
      throw err;
    }
  };

  // 🔐 Permissões — quem pode publicar
  const canPublish = !!user && ['admin', 'professor', 'aluno', 'aluno-nejusc'].includes(user.role);

  return {
    posts,
    loading,
    error,
    canPublish,
    carregarPostagens,
    criarPostagem,
    atualizarPostagem,
    removerPostagem,
  };
}
