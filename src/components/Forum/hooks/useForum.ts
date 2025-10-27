import { useState, useEffect, useCallback } from 'react';
import {
  getAllPostagens,
  getPostagemById,
  createPostagem,
  updatePostagem,
  deletePostagem,
} from '../../../services/forumService';
import { useAuth } from '../../../contexts/AuthContext';
import { Postagem } from '../types/index';
import { toast } from 'react-toastify';

/**
 * Hook centralizado para gerenciar postagens do fórum
 * — inclui listagem, criação, atualização e exclusão
 */
export function useForum() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Postagem[]>([]);
  const [selectedPost, setSelectedPost] = useState<Postagem | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /** 🔹 Carrega todas as postagens do backend */
  const carregarPostagens = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllPostagens();
      setPosts(data);
    } catch (err) {
      console.error('Erro ao carregar postagens:', err);
      setError('Erro ao carregar postagens.');
      toast.error('Erro ao carregar postagens.');
    } finally {
      setLoading(false);
    }
  }, []);

  /** 🔹 Carregar postagem específica (por ID) */
  const carregarPostagemPorId = useCallback(async (id: string) => {
    setLoading(true);
    try {
      const data = await getPostagemById(id);
      setSelectedPost(data);
      return data;
    } catch (err) {
      console.error('Erro ao carregar postagem:', err);
      toast.error('Erro ao buscar postagem.');
    } finally {
      setLoading(false);
    }
  }, []);

  /** 🔹 Criar nova postagem */
  const adicionarPostagem = useCallback(
    async (titulo: string, conteudo: string, categoria?: string) => {
      if (!user) {
        toast.error('Você precisa estar logado para criar uma postagem.');
        return;
      }

      try {
        setLoading(true);
        const novaPostagem = {
          titulo,
          conteudo,
          categoria,
          autorNome: user.name,
          autorEmail: user.email,
          dataPublicacao: new Date().toISOString(),
          status: 'Pendente',
        };

        const data = await createPostagem(novaPostagem);
        setPosts((prev) => [data, ...prev]);
        toast.success('Postagem criada com sucesso!');
      } catch (err) {
        console.error('Erro ao criar postagem:', err);
        toast.error('Erro ao criar postagem.');
      } finally {
        setLoading(false);
      }
    },
    [user]
  );

  /** 🔹 Atualizar postagem (ex: aprovar/rejeitar) */
  const atualizarPostagem = useCallback(async (id: string, data: any) => {
    try {
      await updatePostagem(id, data);
      setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, ...data } : p)));
      toast.success('Postagem atualizada!');
    } catch (err) {
      console.error('Erro ao atualizar postagem:', err);
      toast.error('Erro ao atualizar postagem.');
    }
  }, []);

  /** 🔹 Deletar postagem */
  const removerPostagem = useCallback(async (id: string) => {
    try {
      await deletePostagem(id);
      setPosts((prev) => prev.filter((p) => p.id !== id));
      toast.success('Postagem removida.');
    } catch (err) {
      console.error('Erro ao deletar postagem:', err);
      toast.error('Erro ao deletar postagem.');
    }
  }, []);

  /** 🔹 Carregar posts automaticamente ao iniciar */
  useEffect(() => {
    carregarPostagens();
  }, [carregarPostagens]);

  /** 🔹 Controle de permissão */
  const canPublish = !!user;
  const isAdmin = user && ['admin', 'professor'].includes(user.role);

  return {
    posts,
    selectedPost,
    loading,
    error,
    canPublish,
    isAdmin,
    carregarPostagens,
    carregarPostagemPorId,
    adicionarPostagem,
    atualizarPostagem,
    removerPostagem,
  };
}
