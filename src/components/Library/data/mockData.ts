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
    titulo: "Entre a rampa e o abismo: mobilidade e inclusão em Salvador (BA)",
    descricao: "Proposta de um olhar sensível e atento às bar reiras que ainda limitam a plena inclusão das pessoas com deficiência na vida urbana da primeira capital do Brasil",
    edicao: "Vol. 1, Nº 1",
    capa: "/capas/EntreRampaEAbismo.png",
    publicacao: "2025-07-09",
    arquivopdf: "/revistas/revista1.pdf",
    autores: ["Fábio Barreto", "Vanessa Amparo", "João Nepomuceno", "Jéssica Barbosa"],
    area: "Direitos e Vulnerabilidades",
    keywords: ["Direitos sociais", "Cidadania", "PCD", "Mobilidade urbana"],
  },

  {
    id: "2",
    titulo: "Invisíveis, não mais",
    descricao: "Ela nasce da urgência de dar voz a uma realidade muitas vezes silenciada: a das mães solo e atípicas no Brasil.",
    edicao: "Vol. 1, Nº 1",
    capa: "/capas/InvisiveisNaoMais.png",
    publicacao: "2025-07-10",
    arquivopdf: "/revistas/revista2.pdf",
    autores: ["Brenda Néris", "Júlia da Cruz Rocha dos Santos", "Laércio dos Santos Oliveira","Marcos Santos do Nascimento", "Maria Cristina Oliveira dos Reis", "Wendy Santos Silva"],
    area: "Maternidade Solo",
    keywords: ["Maternidade", "Saúde mental", "Direitos"],
  },

  {
    id: "3",
    titulo: "Movimento e expressão para todos",
    descricao: "Uma jornada por projetos que unem esporte, cultura e lazer com foco na inclusão de pessoas com deficiência.",
    edicao: "Vol. 1, Nº 1",
    capa: "/revistas/revista2.jpg",
    publicacao: "2025-07-01",
    arquivopdf: "/revistas/revista2.pdf",
    autores: ["Arrany Nathália Amorim Bispo", "Diego Brito da Silva Carneiro", "Giovanna Souza de Brito","Jônatas de Jesus Costa dos Santos", "Lucas Vitório Gramosa da Silva", "Marcella Pinto Barreto"],
    area: "Pessoas com Deficiência",
    keywords: ["Esportes", "Lazer", "PCD"],
  }
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
