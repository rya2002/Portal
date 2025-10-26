import { useEffect, useState } from 'react';
import { MessageCircle, User, Clock } from 'lucide-react';
import { getAllPostagens } from '../../../services/forumService';

interface Postagem {
  id: string;
  titulo: string;
  conteudo: string;
  autorNome: string;
  autorEmail: string;
  dataPublicacao: string;
  categoria: string;
  respostas?: number;
}

export function ForumDiscussions() {
  const [postagens, setPostagens] = useState<Postagem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarPostagens() {
      try {
        const data = await getAllPostagens();
        setPostagens(data);
      } catch (err) {
        console.error('Erro ao carregar postagens:', err);
      } finally {
        setLoading(false);
      }
    }

    carregarPostagens();
  }, []);

  if (loading) return <p>Carregando postagens...</p>;

  return (
    <div className="space-y-4">
      {postagens.map((p) => (
        <div
          key={p.id}
          className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {p.titulo}
          </h3>
          <p className="text-gray-700 mb-3">{p.conteudo}</p>

          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span className="flex items-center space-x-1">
              <User className="w-4 h-4" />
              <span>{p.autorNome || 'Desconhecido'}</span>
            </span>
            <span className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>
                {new Date(p.dataPublicacao).toLocaleDateString('pt-BR')}
              </span>
            </span>
            {p.categoria && (
              <span className="text-blue-600 font-medium">{p.categoria}</span>
            )}
            {p.respostas !== undefined && (
              <span className="flex items-center space-x-1">
                <MessageCircle className="w-4 h-4" />
                <span>{p.respostas} respostas</span>
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
