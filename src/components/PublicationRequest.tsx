import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { ForumPost } from "../types/auth";

interface Props {
  onBack: () => void;
  onSubmitPost: (post: ForumPost) => void;
}

const categorias = [
  "Direitos e Vulnerabilidades",
  "Ambulantes no Carnaval",
  "Maternidade Solo",
  "Racismo",
  "Saúde Pública",
];

export function PublicationRequest({ onBack, onSubmitPost }: Props) {
  const { user } = useAuth();

  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!user) return;

    const novoPost: ForumPost = {
      id: crypto.randomUUID(),
      title: titulo,
      content: descricao,
      author: user.name,
      authorRole: user.role, // "aluno" | "professor" etc.
      createdAt: new Date().toISOString(),
      likes: 0,
      comments: [],
      category: categoria,
    };

    // Salvar no localStorage
    const existing = localStorage.getItem("forum_posts");
    const parsed = existing ? JSON.parse(existing) : [];
    const updated = [novoPost, ...parsed];
    localStorage.setItem("forum_posts", JSON.stringify(updated));

    // Redirecionar para o fórum e exibir a postagem
    onSubmitPost(novoPost);
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-6">Solicitar Publicação</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Título */}
        <div>
          <label className="font-medium">Título da Publicação</label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 mt-1"
            required
          />
        </div>

        {/* Descrição */}
        <div>
          <label className="font-medium">Descrição</label>
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 mt-1"
            rows={4}
            required
          />
        </div>

        {/* Categoria */}
        <div>
          <label className="font-medium">Categoria</label>
          <select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 mt-1 bg-white"
            required
          >
            <option value="">Selecione uma categoria...</option>
            {categorias.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Enviar Postagem
        </button>
      </form>

      <button
        onClick={onBack}
        className="mt-4 text-blue-600 underline"
      >
        Voltar
      </button>
    </div>
  );
}
