import { useState, useEffect } from "react";
import { Send, Paperclip, Trash2 } from "lucide-react";

type Message = {
  id: number;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const [artigos, setArtigos] = useState([]);
  const [revistas, setRevistas] = useState([]);

  useEffect(() => {
    setArtigos(JSON.parse(localStorage.getItem("artigos") || "[]"));
    setRevistas(JSON.parse(localStorage.getItem("revistas") || "[]"));
  }, []);

  // ---------------------------------------------------------
  // 🔍 BUSCA INTELIGENTE COM REGEX (keywords dentro de frases)
  // ---------------------------------------------------------
  function buscar(query: string) {
    const frase = query.toLowerCase();

    const detectaKeyword = (keywords: string[]) => {
      return keywords.some((kw) => {
        const k = kw.toLowerCase().trim();
        const regex = new RegExp(`\\b${k}\\b`, "i"); 
        return regex.test(frase);
      });
    };

    const arts = artigos.filter((a: any) => {
      return (
        a.titulo.toLowerCase().includes(frase) ||
        a.descricao.toLowerCase().includes(frase) ||
        a.area.toLowerCase().includes(frase) ||
        detectaKeyword(a.keywords)
      );
    });

    const revs = revistas.filter((r: any) => {
      return (
        r.titulo.toLowerCase().includes(frase) ||
        r.descricao.toLowerCase().includes(frase) ||
        r.area.toLowerCase().includes(frase) ||
        detectaKeyword(r.keywords)
      );
    });

    return { arts, revs };
  }

  // ---------------------------------------------------------
  // ENVIO DE MENSAGEM
  // ---------------------------------------------------------
  const sendMessage = () => {
    if (!input.trim()) return;

    const msg: Message = {
      id: Date.now(),
      sender: "user",
      text: input,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, msg]);
    const query = input;

    setInput("");

    setTimeout(() => {
      const { arts, revs } = buscar(query);

      let resposta = "";

      // -----------------------------
      // ARTIGOS ENCONTRADOS
      // -----------------------------
      arts.forEach((a: any) => {
        resposta += `
📄 <b>Artigo</b><br/>
➡️ <a href="${a.arquivopdf}" style="text-decoration: underline;">${a.titulo}</a><br/>
🔹 Área: ${a.area}<br/><br/>
        `;
      });

      // -----------------------------
      // REVISTAS ENCONTRADAS
      // -----------------------------
      revs.forEach((r: any) => {
        resposta += `
📚 <b>Revista</b><br/>
➡️ <a href="${r.arquivopdf}" style="text-decoration: underline;">${r.titulo}</a><br/>
🔹 Área: ${r.area}<br/>
${r.capa ? `🖼️ <img src="${r.capa}" style="width:120px; margin-top:5px; border-radius:6px;" />` : ""}
<br/>
        `;
      });

      if (!resposta.trim()) {
        resposta = "🤖 Nenhum conteúdo encontrado.";
      }

      const aiMsg: Message = {
        id: Date.now() + 1,
        sender: "ai",
        text: resposta,
        timestamp: new Date().toLocaleTimeString(),
      };

      setMessages((prev) => [...prev, aiMsg]);
    }, 500);
  };

  // ---------------------------------------------------------
  // UI
  // ---------------------------------------------------------
  return (
    <div className="flex flex-col h-screen bg-gray-50">

      <main className="flex-1 overflow-y-auto p-4 space-y-4">
        
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${
              msg.sender === "user" ? "items-end" : "items-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-2xl max-w-[75%] whitespace-pre-line ${
                msg.sender === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-900 shadow"
              }`}
              dangerouslySetInnerHTML={{ __html: msg.text }}
            />
            <span className="text-xs text-gray-400 mt-1">
              {msg.timestamp}
            </span>
          </div>
        ))}

      </main>

      <footer className="p-4 bg-white border-t flex items-center space-x-2">
        <Paperclip className="w-5 h-5 text-gray-500" />
        
        <textarea
          className="flex-1 border rounded-lg p-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-600"
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Digite sua mensagem..."
        />

        <button
          onClick={sendMessage}
          className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Send className="w-5 h-5" />
        </button>

        <button
          onClick={() => setMessages([])}
          className="p-2 text-red-500 hover:text-red-700"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </footer>

    </div>
  );
}
