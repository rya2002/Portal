import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { mockUsers } from "../../../../data/mockData";
import { useBiblioteca } from "../../hooks/useBiblioteca";
import { Artigo, Revista } from "../../types";

export default function PublicPage() {
  const navigate = useNavigate();
  const { adicionarArtigo, adicionarRevista } = useBiblioteca();

  const [activeTab, setActiveTab] = useState<"artigos" | "revistas">("artigos");

  // Estados para Artigo
  const [tituloArtigo, setTituloArtigo] = useState("");
  const [descricaoArtigo, setDescricaoArtigo] = useState("");
  const [dataArtigo, setDataArtigo] = useState("");
  const [autoresArtigo, setAutoresArtigo] = useState<string[]>([]);
  const [areaArtigo, setAreaArtigo] = useState("");
  const [keywordsArtigo, setKeywordsArtigo] = useState<string[]>([]);
  const [novaKeywordArtigo, setNovaKeywordArtigo] = useState("");
  const [arquivoArtigo, setArquivoArtigo] = useState<File | null>(null);

  // Estados para Revista
  const [tituloRevista, setTituloRevista] = useState("");
  const [descricaoRevista, setDescricaoRevista] = useState("");
  const [capaRevista, setCapaRevista] = useState<File | null>(null);
  const [dataRevista, setDataRevista] = useState("");
  const [autoresRevista, setAutoresRevista] = useState<string[]>([]);
  const [areaRevista, setAreaRevista] = useState("");
  const [keywordsRevista, setKeywordsRevista] = useState<string[]>([]);
  const [novaKeywordRevista, setNovaKeywordRevista] = useState("");
  const [arquivoRevista, setArquivoRevista] = useState<File | null>(null);

  // Lista de usuários elegíveis
  const eligibleAuthors = Object.values(mockUsers).filter(
    (u) => u.userType !== "aluno-comum" && u.userType !== "administrador"
  );

  // Helpers de keyword
  const adicionarKeywordArtigo = () => {
    const kw = novaKeywordArtigo.trim();
    if (kw && !keywordsArtigo.includes(kw)) {
      setKeywordsArtigo([...keywordsArtigo, kw]);
    }
    setNovaKeywordArtigo("");
  };

  const removerKeywordArtigo = (kw: string) =>
    setKeywordsArtigo(keywordsArtigo.filter((k) => k !== kw));

  const adicionarKeywordRevista = () => {
    const kw = novaKeywordRevista.trim();
    if (kw && !keywordsRevista.includes(kw)) {
      setKeywordsRevista([...keywordsRevista, kw]);
    }
    setNovaKeywordRevista("");
  };

  const removerKeywordRevista = (kw: string) =>
    setKeywordsRevista(keywordsRevista.filter((k) => k !== kw));

  // Conversor Base64
  function toBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  }

  // Publicar Artigo
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

    adicionarArtigo(novoArtigo);

    // Limpar campos
    setTituloArtigo("");
    setDescricaoArtigo("");
    setDataArtigo("");
    setAutoresArtigo([]);
    setAreaArtigo("");
    setKeywordsArtigo([]);
    setArquivoArtigo(null);

    alert("Artigo publicado com sucesso!");
    navigate("/biblioteca");
  };

  // Publicar Revista
  const handleAddRevista = async () => {
    let capaBase64 = "";
    if (capaRevista) capaBase64 = await toBase64(capaRevista);

    const novaRevista: Revista = {
      id: Date.now().toString(),
      titulo: tituloRevista,
      descricao: descricaoRevista,
      capa: capaBase64,
      publicacao: dataRevista,
      arquivopdf: arquivoRevista ? arquivoRevista.name : "",
      autores: autoresRevista,
      area: areaRevista,
      keywords: keywordsRevista,
    };

    adicionarRevista(novaRevista);

    // Limpar campos
    setTituloRevista("");
    setDescricaoRevista("");
    setCapaRevista(null);
    setDataRevista("");
    setAutoresRevista([]);
    setAreaRevista("");
    setKeywordsRevista([]);
    setArquivoRevista(null);

    alert("Revista publicada com sucesso!");
    navigate("/biblioteca");
  };

  // ------------------------------------------------------------------
  // CHECKLIST COMPONENT (para Artigo e Revista)
  // ------------------------------------------------------------------
  const ChecklistAutores = ({
    selecionados,
    setSelecionados,
  }: {
    selecionados: string[];
    setSelecionados: (v: string[]) => void;
  }) => (
    <div className="border rounded p-3">
      <p className="text-sm font-semibold mb-2">Selecione os autores:</p>

      <div className="max-h-40 overflow-y-auto space-y-1">
        {eligibleAuthors.map((u) => (
          <label key={u.email} className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={selecionados.includes(u.name)}
              onChange={() => {
                if (selecionados.includes(u.name)) {
                  setSelecionados(selecionados.filter((a) => a !== u.name));
                } else {
                  setSelecionados([...selecionados, u.name]);
                }
              }}
            />
            {u.name}{" "}
            <span className="text-gray-500">({u.userType})</span>
          </label>
        ))}
      </div>
    </div>
  );

  // ------------------------------------------------------------------
  // RENDER
  // ------------------------------------------------------------------
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow">
      <button
        onClick={() => navigate("/biblioteca")}
        className="mb-4 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
      >
        ← Voltar
      </button>

      <h1 className="text-2xl font-bold mb-6">Publicar Conteúdo</h1>

      {/* Tabs */}
      <div className="flex mb-6 border-b">
        <button
          onClick={() => setActiveTab("artigos")}
          className={`px-4 py-2 ${
            activeTab === "artigos"
              ? "border-b-2 border-blue-500 font-bold"
              : "text-gray-600"
          }`}
        >
          Artigo
        </button>
        <button
          onClick={() => setActiveTab("revistas")}
          className={`px-4 py-2 ${
            activeTab === "revistas"
              ? "border-b-2 border-blue-500 font-bold"
              : "text-gray-600"
          }`}
        >
          Revista
        </button>
      </div>

      {/* FORMULÁRIO DE ARTIGO */}
      {activeTab === "artigos" && (
        <div className="space-y-4">

          <input
            className="w-full border p-2 rounded"
            placeholder="Título"
            value={tituloArtigo}
            onChange={(e) => setTituloArtigo(e.target.value)}
          />

          <textarea
            className="w-full border p-2 rounded"
            placeholder="Descrição"
            value={descricaoArtigo}
            onChange={(e) => setDescricaoArtigo(e.target.value)}
          />

          <input
            type="date"
            className="w-full border p-2 rounded"
            value={dataArtigo}
            onChange={(e) => setDataArtigo(e.target.value)}
          />

          {/* CHECKLIST AQUI */}
          <ChecklistAutores
            selecionados={autoresArtigo}
            setSelecionados={setAutoresArtigo}
          />

          <input
            className="w-full border p-2 rounded"
            placeholder="Área de estudo"
            value={areaArtigo}
            onChange={(e) => setAreaArtigo(e.target.value)}
          />

          {/* Keywords */}
          <div>
            <div className="flex gap-2 mb-2">
              <input
                value={novaKeywordArtigo}
                onChange={(e) => setNovaKeywordArtigo(e.target.value)}
                placeholder="Adicionar keyword"
                className="flex-1 border p-2 rounded"
              />
              <button
                type="button"
                onClick={adicionarKeywordArtigo}
                className="px-3 py-2 bg-green-600 text-white rounded"
              >
                +
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {keywordsArtigo.map((k) => (
                <span
                  key={k}
                  className="flex items-center gap-2 bg-blue-100 text-blue-800 px-2 py-1 rounded-full"
                >
                  <span>{k}</span>
                  <button onClick={() => removerKeywordArtigo(k)}>×</button>
                </span>
              ))}
            </div>
          </div>

          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setArquivoArtigo(e.target.files?.[0] || null)}
          />

          <button
            onClick={handleAddArtigo}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Publicar Artigo
          </button>
        </div>
      )}

      {/* FORMULÁRIO DE REVISTA */}
      {activeTab === "revistas" && (
        <div className="space-y-4">

          <input
            className="w-full border p-2 rounded"
            placeholder="Título"
            value={tituloRevista}
            onChange={(e) => setTituloRevista(e.target.value)}
          />

          <textarea
            className="w-full border p-2 rounded"
            placeholder="Descrição"
            value={descricaoRevista}
            onChange={(e) => setDescricaoRevista(e.target.value)}
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setCapaRevista(e.target.files?.[0] || null)}
          />

          <input
            type="date"
            className="w-full border p-2 rounded"
            value={dataRevista}
            onChange={(e) => setDataRevista(e.target.value)}
          />

          {/* CHECKLIST AQUI */}
          <ChecklistAutores
            selecionados={autoresRevista}
            setSelecionados={setAutoresRevista}
          />

          <input
            className="w-full border p-2 rounded"
            placeholder="Área de estudo"
            value={areaRevista}
            onChange={(e) => setAreaRevista(e.target.value)}
          />

          {/* Keywords */}
          <div>
            <div className="flex gap-2 mb-2">
              <input
                value={novaKeywordRevista}
                onChange={(e) => setNovaKeywordRevista(e.target.value)}
                placeholder="Adicionar keyword"
                className="flex-1 border p-2 rounded"
              />

              <button
                type="button"
                onClick={adicionarKeywordRevista}
                className="px-3 py-2 bg-green-600 text-white rounded"
              >
                +
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {keywordsRevista.map((k) => (
                <span
                  key={k}
                  className="flex items-center gap-2 bg-blue-100 text-blue-800 px-2 py-1 rounded-full"
                >
                  <span>{k}</span>
                  <button onClick={() => removerKeywordRevista(k)}>×</button>
                </span>
              ))}
            </div>

          </div>

          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setArquivoRevista(e.target.files?.[0] || null)}
          />

          <button
            onClick={handleAddRevista}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Publicar Revista
          </button>

        </div>
      )}
    </div>
  );
}
