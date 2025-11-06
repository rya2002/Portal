import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllUsersRequest } from "../../../../services/userService";
import { createArtigo, uploadPdfArtigo } from "../../../../services/artigoService";
import { createRevista, uploadPdfRevista } from "../../../../services/revistaService";
import { ensureKeywordsByTitles } from "../../../../services/keywordService";

interface Usuario {
  id: string;
  nome: string;
  email: string;
  tipoUsuario: number;
}

const AREA_MAP: Record<string, number> = {
  "Direitos e Vulnerabilidades": 0,
  "Maternidade Solo": 1,
  "Ambulantes no Carnaval": 2,
  "Racismo Ambiental": 3,
  "Saúde Pública": 4,
  "Violência e Gênero": 5,
  "Pessoas com Deficiência": 6,
};

export default function PublicPage() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<"artigos" | "revistas">("artigos");
  const [users, setUsers] = useState<Usuario[]>([]);

  const [formArtigo, setFormArtigo] = useState({
    titulo: "",
    descricao: "",
    data: "",
    autores: [] as string[],
    area: "",
    keywords: [] as string[],
    arquivo: null as File | null,
  });

  const [formRevista, setFormRevista] = useState({
    titulo: "",
    descricao: "",
    data: "",
    autores: [] as string[],
    area: "",
    keywords: [] as string[],
    capa: null as File | null,
    arquivo: null as File | null,
  });

  const [novaKeyword, setNovaKeyword] = useState("");
  const [novaKeywordRevista, setNovaKeywordRevista] = useState("");

  const AREAS_ESTUDO = Object.keys(AREA_MAP);

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

  const eligibleAuthors = users.filter((u) => u.tipoUsuario === 1 || u.tipoUsuario === 2);

  const addKeyword = (value: string, setFn: any, list: string[]) => {
    const kw = value.trim();
    if (!kw) return;
    setFn([...list, kw]);
  };

  const removeKeyword = (kw: string, setFn: any, list: string[]) => {
    setFn(list.filter((k) => k !== kw));
  };

  const handleAddArtigo = async () => {
    if (!formArtigo.titulo || !formArtigo.descricao || !formArtigo.data || !formArtigo.area) {
      alert("Preencha os campos obrigatórios!");
      return;
    }

    try {
      const kws = await ensureKeywordsByTitles(formArtigo.keywords);
      const keywordsIds = kws.map((k) => k.id);

      const payload = {
        titulo: formArtigo.titulo,
        descricao: formArtigo.descricao,
        publicacao: formArtigo.data,
        area: AREA_MAP[formArtigo.area],
        autores: formArtigo.autores,
        keywordsIds,
      };

      const created = await createArtigo(payload);
      const artigoId: string =
        created?.data?.id ?? created?.id ?? created ?? "";

      if (!artigoId) {
        alert("Erro ao criar artigo: ID não retornado.");
        return;
      }

      if (formArtigo.arquivo) {
        await uploadPdfArtigo(artigoId, formArtigo.arquivo);
      }

      alert("✅ Artigo publicado com sucesso!");
      navigate("/biblioteca");
    } catch {
      alert("❌ Erro ao publicar artigo. Tente novamente.");
    }
  };

  const handleAddRevista = async () => {
    if (!formRevista.titulo || !formRevista.descricao || !formRevista.data || !formRevista.area) {
      alert("Preencha os campos obrigatórios!");
      return;
    }

    try {
      const kws = await ensureKeywordsByTitles(formRevista.keywords);
      const keywordsIds = kws.map((k) => k.id);

      const form = new FormData();
      form.append("titulo", formRevista.titulo);
      form.append("descricao", formRevista.descricao);
      form.append("publicacao", formRevista.data);
      form.append("area", String(AREA_MAP[formRevista.area]));

      formRevista.autores.forEach((a, i) => form.append(`Autores[${i}]`, a));
      keywordsIds.forEach((id, i) => form.append(`KeywordsIds[${i}]`, String(id)));

      if (formRevista.capa) form.append("Capa", formRevista.capa);
      if (formRevista.arquivo) form.append("ArquivoPdf", formRevista.arquivo);

      const newId: string = await createRevista(form);

      if (!newId) {
        alert("Erro ao criar revista: ID não retornado.");
        return;
      }

      if (formRevista.arquivo) {
        await uploadPdfRevista(newId, formRevista.arquivo);
      }

      alert("✅ Revista publicada com sucesso!");
      navigate("/biblioteca");
    } catch {
      alert("❌ Erro ao publicar revista.");
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow">
      <button onClick={() => navigate("/biblioteca")} className="mb-4 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
        ← Voltar
      </button>

      <h1 className="text-2xl font-bold mb-6">Publicar Conteúdo</h1>

      <div className="flex mb-6 border-b text-center">
        <button
          onClick={() => setActiveTab("artigos")}
          className={`flex-1 px-4 py-2 ${activeTab === "artigos" ? "border-b-2 border-blue-500 font-bold text-blue-700" : "text-gray-600"}`}
        >
          Artigo
        </button>
        <button
          onClick={() => setActiveTab("revistas")}
          className={`flex-1 px-4 py-2 ${activeTab === "revistas" ? "border-b-2 border-blue-500 font-bold text-blue-700" : "text-gray-600"}`}
        >
          Revista
        </button>
      </div>

      {/* Formulário Artigos */}
      {activeTab === "artigos" && (
        <div className="space-y-4 w-full">
          <input
            className="w-full border p-2 rounded"
            placeholder="Título"
            value={formArtigo.titulo}
            onChange={(e) => setFormArtigo({ ...formArtigo, titulo: e.target.value })}
          />
          <textarea
            className="w-full border p-2 rounded"
            placeholder="Descrição"
            value={formArtigo.descricao}
            onChange={(e) => setFormArtigo({ ...formArtigo, descricao: e.target.value })}
          />
          <input
            type="date"
            className="w-full border p-2 rounded"
            value={formArtigo.data}
            onChange={(e) => setFormArtigo({ ...formArtigo, data: e.target.value })}
          />

          <select
            multiple
            className="w-full border p-2 rounded"
            value={formArtigo.autores}
            onChange={(e) =>
              setFormArtigo({ ...formArtigo, autores: Array.from(e.target.selectedOptions, (opt) => opt.value) })
            }
          >
            {eligibleAuthors.map((u) => (
              <option key={u.email} value={u.nome}>
                {u.nome}
              </option>
            ))}
          </select>

          <label className="block text-sm font-medium text-gray-700">Área de estudo</label>
          <select
            className="w-full border p-2 rounded"
            value={formArtigo.area}
            onChange={(e) => setFormArtigo({ ...formArtigo, area: e.target.value })}
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
                value={novaKeyword}
                onChange={(e) => setNovaKeyword(e.target.value)}
                placeholder="Adicionar keyword"
                className="flex-1 border p-2 rounded"
              />
              <button
                type="button"
                onClick={() => {
                  addKeyword(novaKeyword, (k: string[]) => setFormArtigo({ ...formArtigo, keywords: k }), formArtigo.keywords);
                  setNovaKeyword("");
                }}
                className="px-3 py-2 bg-green-600 text-white rounded"
              >
                +
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formArtigo.keywords.map((k, idx) => (
                <span key={`${k}-${idx}`} className="flex items-center gap-2 bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                  <span>{k}</span>
                  <button
                    onClick={() =>
                      removeKeyword(k, (kw: string[]) => setFormArtigo({ ...formArtigo, keywords: kw }), formArtigo.keywords)
                    }
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
            onChange={(e) => setFormArtigo({ ...formArtigo, arquivo: e.target.files?.[0] || null })}
          />

          <button onClick={handleAddArtigo} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Publicar Artigo
          </button>
        </div>
      )}

      {/* Formulário Revistas */}
      {activeTab === "revistas" && (
        <div className="space-y-4 w-full">
          <input
            className="w-full border p-2 rounded"
            placeholder="Título"
            value={formRevista.titulo}
            onChange={(e) => setFormRevista({ ...formRevista, titulo: e.target.value })}
          />
          <textarea
            className="w-full border p-2 rounded"
            placeholder="Descrição"
            value={formRevista.descricao}
            onChange={(e) => setFormRevista({ ...formRevista, descricao: e.target.value })}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Selecione a capa</label>
            <input
              type="file"
              accept="image/*"
              className="w-full border border-gray-300 rounded p-2 cursor-pointer bg-gray-50 hover:bg-gray-100"
              onChange={(e) => setFormRevista({ ...formRevista, capa: e.target.files?.[0] || null })}
            />
          </div>

          <input
            type="date"
            className="w-full border p-2 rounded"
            value={formRevista.data}
            onChange={(e) => setFormRevista({ ...formRevista, data: e.target.value })}
          />

          <select
            multiple
            className="w-full border p-2 rounded"
            value={formRevista.autores}
            onChange={(e) =>
              setFormRevista({ ...formRevista, autores: Array.from(e.target.selectedOptions, (opt) => opt.value) })
            }
          >
            {eligibleAuthors.map((u) => (
              <option key={u.email} value={u.nome}>
                {u.nome}
              </option>
            ))}
          </select>

          <label className="block text-sm font-medium text-gray-700">Área de estudo</label>
          <select
            className="w-full border p-2 rounded"
            value={formRevista.area}
            onChange={(e) => setFormRevista({ ...formRevista, area: e.target.value })}
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
                onClick={() => {
                  addKeyword(
                    novaKeywordRevista,
                    (k: string[]) => setFormRevista({ ...formRevista, keywords: k }),
                    formRevista.keywords
                  );
                  setNovaKeywordRevista("");
                }}
                className="px-3 py-2 bg-green-600 text-white rounded"
              >
                +
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formRevista.keywords.map((k, idx) => (
                <span key={`${k}-${idx}`} className="flex items-center gap-2 bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                  <span>{k}</span>
                  <button
                    onClick={() =>
                      removeKeyword(
                        k,
                        (kw: string[]) => setFormRevista({ ...formRevista, keywords: kw }),
                        formRevista.keywords
                      )
                    }
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
            onChange={(e) => setFormRevista({ ...formRevista, arquivo: e.target.files?.[0] || null })}
          />

          <button onClick={handleAddRevista} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Publicar Revista
          </button>
        </div>
      )}
    </div>
  );
}
