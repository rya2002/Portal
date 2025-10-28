// src/components/Library/components/PublicPage/PublicPage.tsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useBiblioteca } from "../../hooks/useBiblioteca";
import { Artigo, Revista } from "../../types";
import { getAllUsersRequest } from "../../../../services/userService";
import { uploadPdfArtigo } from "../../../../services/artigoService";
import { uploadPdfRevista } from "../../../../services/revistaService";

interface Usuario {
  id: string;
  nome: string;
  email: string;
  tipoUsuario: number;
}

export default function PublicPage() {
  const navigate = useNavigate();
  const { adicionarArtigo, adicionarRevista } = useBiblioteca();

  const [activeTab, setActiveTab] = useState<"artigos" | "revistas">("artigos");
  const [users, setUsers] = useState<Usuario[]>([]);

  // Estados de Artigo
  const [tituloArtigo, setTituloArtigo] = useState("");
  const [descricaoArtigo, setDescricaoArtigo] = useState("");
  const [dataArtigo, setDataArtigo] = useState("");
  const [autoresArtigo, setAutoresArtigo] = useState<string[]>([]);
  const [areaArtigo, setAreaArtigo] = useState("");
  const [keywordsArtigo, setKeywordsArtigo] = useState<string[]>([]);
  const [novaKeywordArtigo, setNovaKeywordArtigo] = useState("");
  const [arquivoArtigo, setArquivoArtigo] = useState<File | null>(null);

  // Estados de Revista
  const [tituloRevista, setTituloRevista] = useState("");
  const [descricaoRevista, setDescricaoRevista] = useState("");
  const [capaRevista, setCapaRevista] = useState<File | null>(null);
  const [dataRevista, setDataRevista] = useState("");
  const [autoresRevista, setAutoresRevista] = useState<string[]>([]);
  const [areaRevista, setAreaRevista] = useState("");
  const [keywordsRevista, setKeywordsRevista] = useState<string[]>([]);
  const [novaKeywordRevista, setNovaKeywordRevista] = useState("");
  const [arquivoRevista, setArquivoRevista] = useState<File | null>(null);

  // 🔹 Áreas de Estudo — Enum do Backend (Earea)
  const AREAS_ESTUDO = [
    "Direitos e Vulnerabilidades",
    "Maternidade Solo",
    "Ambulantes no Carnaval",
    "Racismo Ambiental",
    "Saúde Pública",
    "Violência e Gênero",
    "Pessoas com Deficiência",
  ];

  // 🔹 Carrega usuários de forma segura
  useEffect(() => {
    async function getAllUsers() {
      const apiResult = await getAllUsersRequest();
      const arr: any[] = Array.isArray(apiResult)
        ? apiResult
        : Array.isArray((apiResult as any)?.data)
        ? (apiResult as any).data
        : [];

      const mappedUsers: Usuario[] = arr.map((u: any) => ({
        id: String(u.id),
        nome: u.nome,
        email: u.email,
        tipoUsuario:
          typeof u.tipoUsuario === "number"
            ? u.tipoUsuario
            : u.tipoUsuario === "alunoNEJUSC"
            ? 1
            : u.tipoUsuario === "professor"
            ? 2
            : u.tipoUsuario === "admin"
            ? 99
            : 0,
      }));

      setUsers(mappedUsers);
    }
    getAllUsers();
  }, []);

  const eligibleAuthors = users.filter(
    (u) => u.tipoUsuario === 1 || u.tipoUsuario === 2
  );

  // 🔹 Keywords
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

  // 🔹 Publicar Artigo
  const handleAddArtigo = async () => {
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

    if (arquivoArtigo) await uploadPdfArtigo(novoArtigo.id, arquivoArtigo);

    alert("Artigo publicado com sucesso!");
    navigate("/biblioteca");
  };

  // 🔹 Publicar Revista
  const handleAddRevista = async () => {
    const novaRevista: Revista = {
      id: Date.now().toString(),
      titulo: tituloRevista,
      descricao: descricaoRevista,
      capaUrl: capaRevista ? URL.createObjectURL(capaRevista) : undefined,
      publicacao: dataRevista,
      arquivopdf: arquivoRevista ? arquivoRevista.name : "",
      autores: autoresRevista,
      area: areaRevista,
      keywords: keywordsRevista,
    };
    adicionarRevista(novaRevista);

    if (arquivoRevista) await uploadPdfRevista(novaRevista.id, arquivoRevista);

    alert("Revista publicada com sucesso!");
    navigate("/biblioteca");
  };

  // 🔹 JSX
  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow">
      <button
        onClick={() => navigate("/biblioteca")}
        className="mb-4 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
      >
        ← Voltar
      </button>

      <h1 className="text-2xl font-bold mb-6">Publicar Conteúdo</h1>

      <div className="flex mb-6 border-b text-center">
        <button
          onClick={() => setActiveTab("artigos")}
          className={`flex-1 px-4 py-2 ${
            activeTab === "artigos"
              ? "border-b-2 border-blue-500 font-bold text-blue-700"
              : "text-gray-600"
          }`}
        >
          Artigo
        </button>
        <button
          onClick={() => setActiveTab("revistas")}
          className={`flex-1 px-4 py-2 ${
            activeTab === "revistas"
              ? "border-b-2 border-blue-500 font-bold text-blue-700"
              : "text-gray-600"
          }`}
        >
          Revista
        </button>
      </div>

      <div className="min-h-[700px] w-full">
        {activeTab === "artigos" && (
          <div className="space-y-4 w-full">
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

            <select
              multiple
              className="w-full border p-2 rounded"
              value={autoresArtigo}
              onChange={(e) =>
                setAutoresArtigo(
                  Array.from(e.target.selectedOptions, (opt) => opt.value)
                )
              }
            >
              {eligibleAuthors.map((u) => (
                <option key={u.email} value={u.nome}>
                  {u.nome} ({u.tipoUsuario})
                </option>
              ))}
            </select>

            {/* 🔹 Selecionar Área (Enum) */}
            <label className="block text-sm font-medium text-gray-700">
              Área de estudo
            </label>
            <select
              className="w-full border p-2 rounded"
              value={areaArtigo}
              onChange={(e) => setAreaArtigo(e.target.value)}
            >
              <option value="">Selecione uma área</option>
              {AREAS_ESTUDO.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>

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
                    <button
                      onClick={() => removerKeywordArtigo(k)}
                      className="text-sm"
                    >
                      ×
                    </button>
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

        {activeTab === "revistas" && (
          <div className="space-y-4 w-full">
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

            {/* Selecionar Capa */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Selecione a capa
              </label>
              <input
                type="file"
                accept="image/*"
                className="w-full border border-gray-300 rounded p-2 cursor-pointer bg-gray-50 hover:bg-gray-100"
                onChange={(e) => setCapaRevista(e.target.files?.[0] || null)}
              />
            </div>

            <input
              type="date"
              className="w-full border p-2 rounded"
              value={dataRevista}
              onChange={(e) => setDataRevista(e.target.value)}
            />

            <select
              multiple
              className="w-full border p-2 rounded"
              value={autoresRevista}
              onChange={(e) =>
                setAutoresRevista(
                  Array.from(e.target.selectedOptions, (opt) => opt.value)
                )
              }
            >
              {eligibleAuthors.map((u) => (
                <option key={u.email} value={u.nome}>
                  {u.nome} ({u.tipoUsuario})
                </option>
              ))}
            </select>

            {/* 🔹 Selecionar Área (Enum) */}
            <label className="block text-sm font-medium text-gray-700">
              Área de estudo
            </label>
            <select
              className="w-full border p-2 rounded"
              value={areaRevista}
              onChange={(e) => setAreaRevista(e.target.value)}
            >
              <option value="">Selecione uma área</option>
              {AREAS_ESTUDO.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>

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
                    <button
                      onClick={() => removerKeywordRevista(k)}
                      className="text-sm"
                    >
                      ×
                    </button>
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
    </div>
  );
}
