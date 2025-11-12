import { useState } from "react";
import { Send, Paperclip, Trash2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { searchConteudo, type Publicacao } from "../services/searchService";

type Message = {
  id: number;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      id: Date.now(),
      sender: "user",
      text: input,
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      // 🔹 Faz a busca via backend (IA)
      const resp = await searchConteudo(input);
      console.log("Resposta da IA:", resp);

      // 🔹 Garante que sempre é um array tipado
      const resultados: Publicacao[] = Array.isArray(resp.data) ? resp.data : [];

      // 🔹 Monta o texto da resposta com links clicáveis
      const text =
        resultados.length > 0
          ? `🤖 Encontrei ${resultados.length} resultado(s):\n\n${resultados
              .map((r, i) => {
                const titulo = r.titulo || "Sem título";
                const desc = r.descricao || "Sem descrição";
                // Se tiver link, cria Markdown de link
                const tituloFmt = r.pdfUrl
                  ? `[${titulo}](${r.pdfUrl})`
                  : `**${titulo}**`;
                return `${i + 1}. ${tituloFmt} — ${desc}`;
              })
              .join("\n\n")}`
          : "🤖 Nenhum resultado encontrado para sua pesquisa.";

      const aiMessage: Message = {
        id: Date.now() + 1,
        sender: "ai",
        text,
        timestamp: new Date().toLocaleTimeString(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error: any) {
      console.error("❌ Erro ao buscar resultados:", error);
      const aiMessage: Message = {
        id: Date.now() + 1,
        sender: "ai",
        text:
          "❌ Ocorreu um erro ao buscar os resultados. Verifique sua conexão ou tente novamente.",
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Área de mensagens */}
      <main className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${
              msg.sender === "user" ? "items-end" : "items-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-2xl max-w-[80%] whitespace-pre-wrap ${
                msg.sender === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-800 shadow"
              }`}
            >
              {/* 🔹 Renderiza Markdown (links e negrito) */}
              <ReactMarkdown>{msg.text}</ReactMarkdown>
            </div>
            <span className="text-xs text-gray-400 mt-1">
              {msg.timestamp}
            </span>
          </div>
        ))}

        {loading && (
          <p className="text-gray-500 italic text-center mt-4">
            🤖 Analisando sua pergunta...
          </p>
        )}
      </main>

      {/* Área de entrada */}
      <footer className="p-4 bg-white border-t flex items-center space-x-2">
        <button className="p-2 text-gray-500 hover:text-blue-600">
          <Paperclip className="w-5 h-5" />
        </button>

        <textarea
          className="flex-1 border rounded-lg p-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-600"
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Pergunte algo sobre os conteúdos do portal..."
          disabled={loading}
        />

        <button
          onClick={sendMessage}
          disabled={loading}
          className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-60"
        >
          <Send className="w-5 h-5" />
        </button>

        <button
          onClick={() => setMessages([])}
          className="p-2 text-red-500 hover:text-red-700"
          title="Limpar conversa"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </footer>
    </div>
  );
}
