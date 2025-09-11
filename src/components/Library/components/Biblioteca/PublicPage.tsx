import React, { useState } from "react";
import { mockUsers } from "/Users/maia2/OneDrive/Área de Trabalho/emergencia-main/forum/FORUM 3.0/Projeto/Portal-1/src/data/mockData"
import { addArticle, addRevista, loadFromStorage } from "/Users/maia2/OneDrive/Área de Trabalho/emergencia-main/forum/FORUM 3.0/Projeto/Portal-1/src/components/Library/data/mockData";
import { Artigo, Revista } from "/Users/maia2/OneDrive/Área de Trabalho/emergencia-main/forum/FORUM 3.0/Projeto/Portal-1/src/components/Library/types";


loadFromStorage();

export default function PublicPage() {
  const [activeTab, setActiveTab] = useState<"artigos" | "revistas">("artigos");

  // Estados para formulário de Artigo
  const [tituloArtigo, setTituloArtigo] = useState("");
  const [descricaoArtigo, setDescricaoArtigo] = useState("");
  const [dataArtigo, setDataArtigo] = useState("");
  const [autoresArtigo, setAutoresArtigo] = useState<string[]>([]);
  const [areaArtigo, setAreaArtigo] = useState("");
  const [keywordsArtigo, setKeywordsArtigo] = useState<string[]>([]);
  const [arquivoArtigo, setArquivoArtigo] = useState<File | null>(null);

  // Estados para formulário de Revista
  const [tituloRevista, setTituloRevista] = useState("");
  const [descricaoRevista, setDescricaoRevista] = useState("");
  const [edicaoRevista, setEdicaoRevista] = useState("");
  const [capaRevista, setCapaRevista] = useState<File | null>(null);
  const [dataRevista, setDataRevista] = useState("");
  const [autoresRevista, setAutoresRevista] = useState<string[]>([]);
  const [areaRevista, setAreaRevista] = useState("");
  const [keywordsRevista, setKeywordsRevista] = useState<string[]>([]);
  const [arquivoRevista, setArquivoRevista] = useState<File | null>(null);

  // Lista de usuários em formato de array
  const usersList = Object.values(mockUsers);

  // 🔹 Salvar novo artigo
  const handleAddArtigo = () => {
    const novoArtigo: Artigo = {
      id: Date.now().toString(),
      titulo: tituloArtigo,
      descricao: descricaoArtigo,
      publicacao: dataArtigo,
      arquivopdf: arquivoArtigo ? arquivoArtigo.name : "",
      autores: autoresArtigo,
      area: areaArtigo,
      keywords: keywordsArtigo,
    };
    addArticle(novoArtigo);
    alert("Artigo publicado com sucesso!");
  };

  // 🔹 Salvar nova revista
  const handleAddRevista = () => {
    const novaRevista: Revista = {
      id: Date.now().toString(),
      titulo: tituloRevista,
      descricao: descricaoRevista,
      edicao: edicaoRevista,
      capa: capaRevista ? URL.createObjectURL(capaRevista) : "",
      publicacao: dataRevista,
      arquivopdf: arquivoRevista ? arquivoRevista.name : "",
      autores: autoresRevista,
      area: areaRevista,
      keywords: keywordsRevista,
    };
    addRevista(novaRevista);
    alert("Revista publicada com sucesso!");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6">Publicar Conteúdo</h1>

      {/* Abas */}
      <div className="flex mb-6 border-b">
        <button
          onClick={() => setActiveTab("artigos")}
          className={`px-4 py-2 ${activeTab === "artigos" ? "border-b-2 border-blue-500 font-bold" : "text-gray-600"}`}
        >
          Artigo
        </button>
        <button
          onClick={() => setActiveTab("revistas")}
          className={`px-4 py-2 ${activeTab === "revistas" ? "border-b-2 border-blue-500 font-bold" : "text-gray-600"}`}
        >
          Revista
        </button>
      </div>

      {/* Aba Artigo */}
      {activeTab === "artigos" && (
        <div className="space-y-4">
          <input className="w-full border p-2 rounded" placeholder="Título" value={tituloArtigo} onChange={(e) => setTituloArtigo(e.target.value)} />
          <textarea className="w-full border p-2 rounded" placeholder="Descrição" value={descricaoArtigo} onChange={(e) => setDescricaoArtigo(e.target.value)} />
          <input type="date" className="w-full border p-2 rounded" value={dataArtigo} onChange={(e) => setDataArtigo(e.target.value)} />

          {/* Select múltiplo para autores */}
          <select
            multiple
            className="w-full border p-2 rounded"
            value={autoresArtigo}
            onChange={(e) => setAutoresArtigo(Array.from(e.target.selectedOptions, opt => opt.value))}
          >
            {usersList.map((user) => (
              <option key={user.email} value={user.name}>
                {user.name} ({user.userType})
              </option>
            ))}
          </select>

          <input className="w-full border p-2 rounded" placeholder="Área de estudo" value={areaArtigo} onChange={(e) => setAreaArtigo(e.target.value)} />
          <input className="w-full border p-2 rounded" placeholder="Palavras-chave (separadas por vírgula)" onChange={(e) => setKeywordsArtigo(e.target.value.split(","))} />
          <input type="file" accept="application/pdf" onChange={(e) => setArquivoArtigo(e.target.files?.[0] || null)} />
          <button onClick={handleAddArtigo} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Publicar Artigo</button>
        </div>
      )}

      {/* Aba Revista */}
      {activeTab === "revistas" && (
        <div className="space-y-4">
          <input className="w-full border p-2 rounded" placeholder="Título" value={tituloRevista} onChange={(e) => setTituloRevista(e.target.value)} />
          <textarea className="w-full border p-2 rounded" placeholder="Descrição" value={descricaoRevista} onChange={(e) => setDescricaoRevista(e.target.value)} />
          <input className="w-full border p-2 rounded" placeholder="Edição" value={edicaoRevista} onChange={(e) => setEdicaoRevista(e.target.value)} />
          <input type="file" accept="image/*" onChange={(e) => setCapaRevista(e.target.files?.[0] || null)} />
          <input type="date" className="w-full border p-2 rounded" value={dataRevista} onChange={(e) => setDataRevista(e.target.value)} />

          {/* Select múltiplo para autores */}
          <select
            multiple
            className="w-full border p-2 rounded"
            value={autoresRevista}
            onChange={(e) => setAutoresRevista(Array.from(e.target.selectedOptions, opt => opt.value))}
          >
            {usersList.map((user) => (
              <option key={user.email} value={user.name}>
                {user.name} ({user.userType})
              </option>
            ))}
          </select>

          <input className="w-full border p-2 rounded" placeholder="Área de estudo" value={areaRevista} onChange={(e) => setAreaRevista(e.target.value)} />
          <input className="w-full border p-2 rounded" placeholder="Palavras-chave (separadas por vírgula)" onChange={(e) => setKeywordsRevista(e.target.value.split(","))} />
          <input type="file" accept="application/pdf" onChange={(e) => setArquivoRevista(e.target.files?.[0] || null)} />
          <button onClick={handleAddRevista} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Publicar Revista</button>
        </div>
      )}
    </div>
  );
}
