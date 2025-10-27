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
  const [edicaoRevista, setEdicaoRevista] = useState("");
  const [capaRevista, setCapaRevista] = useState<File | null>(null);
  const [dataRevista, setDataRevista] = useState("");
  const [autoresRevista, setAutoresRevista] = useState<string[]>([]);
  const [areaRevista, setAreaRevista] = useState("");
  const [keywordsRevista, setKeywordsRevista] = useState<string[]>([]);
  const [novaKeywordRevista, setNovaKeywordRevista] = useState("");
  const [arquivoRevista, setArquivoRevista] = useState<File | null>(null);

  useEffect(() => {
    async function getAllUsers() {
      const usersFromApi = await getAllUsersRequest();
      const mappedUsers: Usuario[] = (usersFromApi as any[]).map((u) => ({
        id: u.id,
        nome: u.nome,
        email: u.email,
        tipoUsuario: u.tipoUsuario ?? 0,
      }));
      setUsers(mappedUsers);
    }
    getAllUsers();
  }, []);

  const eligibleAuthors = users.filter(
    (u) => u.tipoUsuario === 1 || u.tipoUsuario === 2
  );

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

  const handleAddRevista = async () => {
    const novaRevista: Revista = {
      id: Date.now().toString(),
      titulo: tituloRevista,
      descricao: descricaoRevista,
      edicao: edicaoRevista,
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

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow">
      <button
        onClick={() => navigate("/biblioteca")}
        className="mb-4 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
      >
        ← Voltar
      </button>

      <h1 className="text-2xl font-bold mb-6">Publicar Conteúdo</h1>

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

          <input
            className="w-full border p-2 rounded"
            placeholder="Área de estudo"
            value={areaArtigo}
            onChange={(e) => setAreaArtigo(e.target.value)}
          />

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
            className="w-full border p-2 rounded"
            placeholder="Edição"
            value={edicaoRevista}
            onChange={(e) => setEdicaoRevista(e.target.value)}
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

          <input
            className="w-full border p-2 rounded"
            placeholder="Área de estudo"
            value={areaRevista}
            onChange={(e) => setAreaRevista(e.target.value)}
          />

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
  );
}
