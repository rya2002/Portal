import { useState } from 'react';
import { toast } from 'react-toastify';
import { useForum } from '../hooks/useForum';

interface ForumPostEditorProps {
  onBack?: () => void;
}

export function ForumPostEditor({ onBack }: ForumPostEditorProps) {
  const { adicionarPostagem, loading } = useForum();
  const [titulo, setTitulo] = useState('');
  const [conteudo, setConteudo] = useState('');
  const [categoria, setCategoria] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!titulo || !conteudo) {
      toast.warn('Preencha todos os campos obrigatórios.');
      return;
    }

    await adicionarPostagem(titulo, conteudo, categoria);
    setTitulo('');
    setConteudo('');
    setCategoria('');

    if (onBack) onBack();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4"
    >
      <h3 className="text-lg font-semibold mb-2">Nova Postagem</h3>

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

      <div className="flex items-center justify-end space-x-4 pt-4 border-t border-gray-200">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
        )}
        <button
          type="submit"
          disabled={loading}
          className={`bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition ${
            loading ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Publicando...' : 'Publicar'}
        </button>
      </div>
    </form>
  );
}
