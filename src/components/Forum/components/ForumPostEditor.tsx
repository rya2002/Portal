// src/views/Forum/ForumPostEditor.tsx
import { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { createPostagem } from '../../../services/forumService';
import { toast } from 'react-toastify';
import { ArrowLeft, Send } from 'lucide-react';

interface ForumPostEditorProps {
  onBack: () => void;
}

export function ForumPostEditor({ onBack }: ForumPostEditorProps) {
  const { user } = useAuth();
  const [titulo, setTitulo] = useState('');
  const [conteudo, setConteudo] = useState('');
  const [categoria, setCategoria] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!user) {
      toast.error('Você precisa estar logado para publicar.');
      return;
    }

    if (!titulo || !conteudo) {
      toast.warn('Preencha todos os campos obrigatórios.');
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
        status: ['admin', 'professor'].includes(user.role)
          ? 'Aprovado'
          : 'Pendente',
      };

      await createPostagem(novaPostagem);
      setSubmitted(true);
      toast.success('Postagem enviada para análise!');
    } catch (err) {
      console.error('Erro ao criar postagem:', err);
      toast.error('Erro ao criar postagem.');
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-6 flex items-center justify-center">
          <Send className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Postagem Enviada!</h2>
        <p className="text-gray-600 mb-6">
          {['admin', 'professor'].includes(user?.role || '')
            ? 'Sua postagem foi publicada com sucesso.'
            : 'Sua postagem foi enviada para análise e será revisada em breve.'}
        </p>
        <button
          onClick={onBack}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Voltar ao Fórum
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4"
    >
      <div className="flex items-center space-x-3 mb-2">
        <button
          onClick={onBack}
          type="button"
          className="text-blue-600 hover:text-blue-800 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h3 className="text-lg font-semibold text-gray-900">
          Nova Postagem
        </h3>
      </div>

      <input
        type="text"
        placeholder="Título"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        className="w-full border border-gray-300 rounded-lg px-3 py-2"
        required
      />

      <textarea
        placeholder="Conteúdo"
        value={conteudo}
        onChange={(e) => setConteudo(e.target.value)}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 h-32"
        required
      />

      <input
        type="text"
        placeholder="Categoria (opcional)"
        value={categoria}
        onChange={(e) => setCategoria(e.target.value)}
        className="w-full border border-gray-300 rounded-lg px-3 py-2"
      />

      <button
        type="submit"
        disabled={loading}
        className={`bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition ${
          loading ? 'opacity-70 cursor-not-allowed' : ''
        }`}
      >
        {loading ? 'Enviando...' : 'Publicar'}
      </button>
    </form>
  );
}
