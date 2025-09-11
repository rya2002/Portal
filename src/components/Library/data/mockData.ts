import { Artigo, Revista } from "../types";

const STORAGE_KEY = "biblioteca_data";

// 🔹 Mock inicial de artigos
export const artigosMock: Artigo[] = [
  {
    id: "1",
    titulo: "Acesso à Justiça no Brasil",
    descricao: "Uma análise sobre os desafios do acesso à justiça no Brasil contemporâneo.",
    publicacao: "2023-08-10",
    arquivopdf: "/artigos/artigo1.pdf",
    autores: ["Dr. Maria de Fátima"],
    area: "Direito Constitucional",
    keywords: ["justiça", "constituição", "direitos humanos"],
  },
];

// 🔹 Mock inicial de revistas
export const revistasMock: Revista[] = [
  {
    id: "1",
    titulo: "Revista de Estudos Jurídicos",
    descricao: "Edição especial sobre direitos sociais.",
    edicao: "Vol. 10, Nº 2",
    capa: "/revistas/revista1.jpg",
    publicacao: "2023-06-05",
    arquivopdf: "/revistas/revista1.pdf",
    autores: ["Prof. Carlos Costa"],
    area: "Direito Social",
    keywords: ["direitos sociais", "cidadania", "constituição"],
  },
];

// 🔹 Salvar no localStorage
function saveToStorage() {
  const data = {
    artigos: artigosMock,
    revistas: revistasMock,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// 🔹 Carregar do localStorage
export function loadFromStorage() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      if (parsed.artigos) {
        artigosMock.splice(0, artigosMock.length, ...parsed.artigos);
      }
      if (parsed.revistas) {
        revistasMock.splice(0, revistasMock.length, ...parsed.revistas);
      }
    } catch (e) {
      console.error("Erro ao carregar biblioteca do localStorage:", e);
    }
  }
}

// 🔹 Adicionar artigo
export function addArticle(artigo: Artigo) {
  artigosMock.push(artigo);
  saveToStorage();
}

// 🔹 Adicionar revista
export function addRevista(revista: Revista) {
  revistasMock.push(revista);
  saveToStorage();
}

export type { Artigo, Revista };
