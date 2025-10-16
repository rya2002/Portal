import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import * as forumService from '../services/forumService';


const resolveApi = (module: any, candidates: string[]) => {
  for (const name of candidates) {
    if (typeof module[name] === 'function') return module[name];
  }
  return undefined;
};

const parseResponse = (res: any) => res?.data?.data ?? res?.data ?? res;

type ForumPost = {
  id?: string;
  titulo?: string;
  descricao?: string;
  autor?: string;
  createdAt?: string;
  [k: string]: any;
};

export function ForumDiscussions() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');

  const getAllFn = resolveApi(forumService, ['getAllForums', 'getForums', 'fetchForums', 'listForums', 'getAllForumPosts', 'getAll']);
  const createFn = resolveApi(forumService, ['createForum', 'createForumPost', 'createPost', 'addForum']);
  const updateFn = resolveApi(forumService, ['updateForum', 'updateForumPost', 'editForum', 'patchForum', 'update']);
  const deleteFn = resolveApi(forumService, ['deleteForum', 'deleteForumPost', 'removeForum', 'destroyForum', 'delete']);

  useEffect(() => {
    let mounted = true;
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        if (!getAllFn) throw new Error('Função de listagem do fórum não encontrada em services.');
        const res = await getAllFn();
        const data = parseResponse(res) as ForumPost[];
        if (mounted) setPosts(Array.isArray(data) ? data : []);
      } catch (err: any) {
        console.error(err);
        if (mounted) setError(err.message ?? 'Erro ao carregar discussões.');
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchPosts();
    return () => { mounted = false; };
  }, []);

  const handleCreate = async () => {
    if (!user) return setError('Autenticação necessária.');
    if (!createFn) return setError('Função de criação não encontrada em services.');
    try {
      const payload = { titulo: newTitle, descricao: newDesc };
      const res = await createFn(payload);
      const created = parseResponse(res);
      if (created) setPosts(prev => [created, ...prev]);
      else if (getAllFn) {
        const all = parseResponse(await getAllFn());
        setPosts(Array.isArray(all) ? all : []);
      }
      setNewTitle('');
      setNewDesc('');
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Erro ao criar discussão.');
    }
  };

  const handleUpdate = async (id: string, updates: Partial<ForumPost>) => {
    if (!updateFn) return setError('Função de atualização não encontrada em services.');
    try {
      try {
        await updateFn(id, updates);
      } catch {
        await updateFn({ id, ...updates });
      }
      setPosts(prev => prev.map(p => (p.id === id ? { ...p, ...updates } : p)));
    } catch (err) {
      console.error(err);
      setError('Erro ao atualizar discussão.');
    }
  };

  const handleDelete = async (id: string) => {
    if (!deleteFn) return setError('Função de exclusão não encontrada em services.');
    try {
      try {
        await deleteFn(id);
      } catch {
        await deleteFn({ id });
      }
      setPosts(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      console.error(err);
      setError('Erro ao deletar discussão.');
    }
  };

  if (loading) return <div>Carregando discussões...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      {user && (
        <div className="mb-4">
          <h3>Criar nova discussão</h3>
          <input value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="Título" />
          <textarea value={newDesc} onChange={e => setNewDesc(e.target.value)} placeholder="Descrição" />
          <button onClick={handleCreate}>Publicar</button>
        </div>
      )}

      <ul>
        {posts.map(post => (
          <li key={post.id ?? Math.random()} className="border p-3 mb-2">
            <h4>{post.titulo}</h4>
            <p>{post.descricao}</p>
            <small>{post.autor} • {post.createdAt}</small>

            {user && (user.role === 'admin' || user.role === 'professor') && post.id && (
              <div className="mt-2">
                <button onClick={() => handleDelete(post.id!)} className="text-red-600 mr-2">Excluir</button>
                <button onClick={() => handleUpdate(post.id!, { titulo: (post.titulo ?? '') + ' (edit)' })}>Editar</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}