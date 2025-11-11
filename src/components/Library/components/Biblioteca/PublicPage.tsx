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
		id: "",
    titulo: "",
    descricao: "",
    publicacao: "",
    autores: [],
    area: "",
    keywords: [],
    capaUrl: null,
    pdfUrl: null,
		isDeleted: false,
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

		// FIXME: Refatorar, está com erro. Acredito que sej a por conta do form.append. Olhar o formato do handleAddRevista
 const handleAddArtigo = async () => {
  const { titulo, descricao, data, area, keywords, arquivo } = formArtigo;

  if (!titulo || !descricao || !data || !area) {
    alert("Preencha os campos obrigatórios!");
    return;
  }

  try {
    // 🔹 Garante que as keywords existem e pega os IDs
    const kws = await ensureKeywordsByTitles(keywords);
    const keywordsIds = kws.map((k) => k.id);

    console.log("🧠 Keywords IDs:", keywordsIds);

    // 🔹 Monta o FormData conforme o modelo do Swagger
    const formData = new FormData();
    formData.append("Titulo", titulo);
    formData.append("Descricao", descricao);
    formData.append("DataPublicacao", new Date(data).toISOString());
    formData.append("area", AREA_MAP[area]);

    keywordsIds.forEach((id) => {
      formData.append("KeywordsIds", id);
    });

    // 🔹 Adiciona o PDF (binário)
    if (arquivo instanceof File) {
      formData.append("Arquivopdf", arquivo);
    } else if (typeof arquivo === "string") {
      const blob = await fetch(arquivo).then((r) => r.blob());
      formData.append("Arquivopdf", blob, "artigo.pdf");
    }

    // 🔹 Envia o formulário
    const response = await createArtigo(formData);

    // const artigoId = response?.data?.id ?? response?.id ?? response ?? "";
    // if (!artigoId) {
    //   alert("⚠️ Erro ao criar artigo: ID não retornado.");
    //   return;
    // }

    alert("✅ Artigo publicado com sucesso!");
    navigate("/biblioteca");
  } catch (error) {
    console.error("❌ Erro ao publicar artigo:", error);
    alert("Erro ao publicar artigo. Verifique os dados e tente novamente.");
  }
};

	// TODO: Funcional, mas é possivel melhorar a função 
	const handleAddRevista = async () => {
		// TODO: Enviar autores
		const { titulo, descricao, publicacao, area, autores, keywords, pdfUrl, capaUrl } = formRevista;

		if (!titulo || !descricao || !publicacao || !area || !capaUrl || !pdfUrl) {
			alert("Preencha todos os campos obrigatórios!");
			return;
		}

		try {

			// 🔹 Cria o formData conforme o modelo do Swagger
			const formData = new FormData();
			formData.append("titulo", titulo);
			formData.append("descricao", descricao);
			formData.append("publicacao", new Date(publicacao).toISOString());
			formData.append("area", AREA_MAP[area]);

			 // 🔹 Adiciona Autores
			autores.forEach((autor) => {
				formData.append("Autores", autor);
			});

			// 🔹 Adiciona KeywordsNames
			keywords.forEach((kw) => {
				console.log("🧠 Adicionando keyword:", kw);
				formData.append("KeywordsNames", kw);
			});

			// 🔹 Adiciona arquivos
			if (capaUrl instanceof File) {
				formData.append("Capa", capaUrl);
			} else if (typeof capaUrl === "string") {
				const blob = await fetch(capaUrl).then(res => res.blob());
				formData.append("Capa", blob, "capa.jpg");
			}

			if (pdfUrl instanceof File) {
				formData.append("Arquivopdf", pdfUrl);
			} else if (typeof pdfUrl === "string") {
				const blob = await fetch(pdfUrl).then(res => res.blob());
				formData.append("Arquivopdf", blob, "revista.pdf");
			}

			// 🔹 Envia para o backend
			const response = await createRevista(formData);

			alert("✅ Revista publicada com sucesso!");
			navigate("/biblioteca");
		} catch (error) {
			console.error("❌ Erro ao publicar revista:", error);
			alert("Erro ao publicar revista. Verifique os dados e tente novamente.");
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
              onChange={(e) => setFormRevista({ ...formRevista, capaUrl: e.target.files?.[0] || null })}
            />
          </div>

          <input
            type="date"
            className="w-full border p-2 rounded"
            value={formRevista.publicacao}
            onChange={(e) => setFormRevista({ ...formRevista, publicacao: e.target.value })}
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
            onChange={(e) => setFormRevista({ ...formRevista, pdfUrl: e.target.files?.[0] || null })}
          />

          <button onClick={handleAddRevista} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Publicar Revista
          </button>
        </div>
      )}
    </div>
  );
}
