import { useState } from "react";
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

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      id: Date.now(),
      sender: "user",
      text: input,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    setTimeout(() => {
      const aiResponse: Message = {
        id: Date.now() + 1,
        sender: "ai",
        text: "🤖 Estou analisando seu pedido... (aqui entraria a resposta do modelo OpenAI).",
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">

      {/* Chat messages */}
      <main className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${
              msg.sender === "user" ? "items-end" : "items-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-2xl max-w-[70%] ${
                msg.sender === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-800 shadow"
              }`}
            >
              {msg.text}
            </div>
            <span className="text-xs text-gray-400 mt-1">{msg.timestamp}</span>
          </div>
        ))}
      </main>

      {/* Input */}
      <footer className="p-4 bg-white border-t flex items-center space-x-2">
        <button className="p-2 text-gray-500 hover:text-blue-600">
          <Paperclip className="w-5 h-5" />
        </button>
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
