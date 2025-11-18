// =======================
// Tipagens
// =======================
export type UserRole =
  | "Aluno"
  | "Aluno NEJUSC"
  | "Professor"
  | "Administrador"
  | "Visitante";

export interface User {
  role: UserRole;
  name: string;
  email: string;
  password: string;
  userType:
    | "visitante"
    | "aluno-comum"
    | "aluno-nejusc"
    | "professor"
    | "administrador";
  avatar: string;
  joinDate: string;
  institution: string;
  department?: string;
  permissions: string[];
}

export interface Article {
  id: number;
  title: string;
  date: string;
  link: string;
  views?: number;
  status?: "publicado" | "em-revisao" | "rejeitado";
  accessDate?: string;
  author?: string;
}

export interface Post {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  comments: number;
  author: string;
}

export interface Comment {
  id: number;
  content: string;
  date: string;
  relatedTitle: string;
  relatedLink: string;
  author: string;
}

export interface UserManagement {
  id: number;
  name: string;
  email: string;
  userType: string;
  status: "ativo" | "inativo" | "suspenso";
  lastAccess: string;
}

// =======================
// Mock Users 
// =======================
export const mockUsers: Record<string, User> = {
  professor: {
    role: "Professor",
    name: "Profª Maria de Fátima",
    email: "maria.fatima@nejusc.unijorge.edu.br",
    password: "demo123",
    userType: "professor",
    avatar: "",
    joinDate: "Janeiro 2024",
    institution: "NEJUSC - Unijorge Salvador BA",
    department: "Departamento de Ciências Sociais",
    permissions: [
      "publish",
      "comment",
      "review",
      "moderate",
      "manage_permissions",
    ],
  },
   professor2: {
    role: "Professor",
    name: "Profª. Cínzia Barreto de Carvalho",
    email: "cinzia.barreto@unijorge.edu.br",
    password: "demo123",
    userType: "professor",
    avatar:
      "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150",
    joinDate: "Fevereiro 2025",
    institution: "Unijorge Salvador BA",
    department: "Reitoria",
    permissions: ["publish", "comment", "review", "moderate", "manage_permissions"],
  },
  "aluno-comum": {
    role: "Aluno",
    name: "Ryan Maia",
    email: "ryan.maia@estudante.unijorge.edu.br",
    password: "demo123",
    userType: "aluno-comum",
    avatar: "",
    joinDate: "Março 2025",
    institution: "Unijorge Salvador BA",
    department: "Curso de Direito",
    permissions: ["view", "comment"],
  },
  "aluno-nejusc": {
    role: "Aluno NEJUSC",
    name: "Vitória Santos da Silva",
    email: "vitoria.santos@nejusc.unijorge.edu.br",
    password: "demo123",
    userType: "aluno-nejusc",
    avatar: "",
    joinDate: "Agosto 2025",
    institution: "NEJUSC - Unijorge Salvador BA",
    department: "Núcleo de Estudos em Justiça Social",
    permissions: ["view", "comment", "publish", "participate_research"],
  },
    "aluno-nejusc2": {
    role: "Aluno NEJUSC",
    name: "Natália Amaral Cavalcante",
    email: "natalia.cavalcante@nejusc.unijorge.edu.br",
    password: "demo123",
    userType: "aluno-nejusc",
    avatar: "",
    joinDate: "Agosto 2025",
    institution: "NEJUSC - Unijorge Salvador BA",
    department: "Núcleo de Estudos em Justiça Social",
    permissions: ["view", "comment", "publish", "participate_research"],
  },
  administrador: {
    role: "Administrador",
    name: "Prof. Carlos Costa",
    email: "carlos.costa@nejusc.unijorge.edu.br",
    password: "demo123",
    userType: "administrador",
    avatar:
      "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150",
    joinDate: "Janeiro 2025",
    institution: "NEJUSC - Unijorge Salvador BA",
    department: "Coordenação Acadêmica",
    permissions: [
      "full_access",
      "user_management",
      "content_management",
      "system_config",
    ],
  },
};

// =======================
// Funções de Usuário
// =======================
export function toggleUserType(email: string): User | null {
  const key = Object.keys(mockUsers).find((k) => mockUsers[k].email === email);
  if (!key) return null;

  const user = mockUsers[key];
  if (user.userType === "aluno-comum") {
    mockUsers[key] = {
      ...user,
      userType: "aluno-nejusc",
      role: "Aluno NEJUSC",
    };
  } else if (user.userType === "aluno-nejusc") {
    mockUsers[key] = { ...user, userType: "aluno-comum", role: "Aluno" };
  }
  return mockUsers[key];
}

export function promoteToNejusc(
  actingUser: User,
  targetEmail: string
): string {
  if (!["professor", "administrador"].includes(actingUser.userType)) {
    return "Permissão negada: apenas professores ou administradores podem promover.";
  }

  const target = Object.values(mockUsers).find((u) => u.email === targetEmail);
  if (!target) return "Usuário não encontrado.";
  if (target.userType !== "aluno-comum")
    return "Só alunos comuns podem ser promovidos.";

  target.userType = "aluno-nejusc";
  target.role = "Aluno NEJUSC";
  target.permissions = [
    "view",
    "comment",
    "publish",
    "participate_research",
  ];

  return `${target.name} agora é Aluno NEJUSC!`;
}

// =======================
// Função para adicionar usuário comum (cadastro)
// =======================
export function addMockUser({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}): User | string {
  const exists = Object.values(mockUsers).some((u) => u.email === email);
  if (exists) return "Já existe um usuário com este e-mail.";

  const idKey = email.split("@")[0].toLowerCase();

  const newUser: User = {
    role: "Aluno",
    name,
    email,
    password,
    userType: "aluno-comum",
    avatar: "",
    joinDate: new Date().toLocaleDateString("pt-BR", {
      month: "long",
      year: "numeric",
    }),
    institution: "Unijorge Salvador BA",
    department: "Curso de Direito",
    permissions: ["view", "comment"],
  };

  mockUsers[idKey] = newUser;
  return newUser;
}

// =======================
// Mock Data Biblioteca
// =======================
export const mockPublishedArticles: Article[] = [
  {
    id: 1,
    title: "Justiça Social e Direitos Humanos na Era Digital",
    date: "15 de Janeiro de 2024",
    link: "#",
    views: 1234,
    status: "publicado",
    author: mockUsers.professor.name,
  },
  {
    id: 2,
    title: "Análise Crítica das Políticas Públicas em Salvador",
    date: "10 de Janeiro de 2024",
    link: "#",
    views: 856,
    status: "em-revisao",
    author: mockUsers["aluno-nejusc"].name,
  },
  {
    id: 3,
    title: "Movimentos Sociais e Transformação Urbana",
    date: "5 de Janeiro de 2024",
    link: "#",
    views: 643,
    status: "publicado",
    author: mockUsers.professor.name,
  },
  {
    id: 4,
    title: "Educação Popular e Emancipação Social",
    date: "2 de Janeiro de 2024",
    link: "#",
    views: 421,
    status: "rejeitado",
    author: mockUsers["aluno-comum"].name,
  },
];

export const mockAccessedArticles: Article[] = [
  {
    id: 1,
    title: "Democracia Participativa no Brasil Contemporâneo",
    date: "20 de Janeiro de 2024",
    link: "#",
    accessDate: "20 de Janeiro de 2024",
  },
  {
    id: 2,
    title: "Teorias da Justiça: Uma Perspectiva Multidisciplinar",
    date: "18 de Janeiro de 2024",
    link: "#",
    accessDate: "19 de Janeiro de 2024",
  },
  {
    id: 3,
    title: "Inclusão Social através da Educação Superior",
    date: "15 de Janeiro de 2024",
    link: "#",
    accessDate: "18 de Janeiro de 2024",
  },
];

// =======================
// Mock Data Fórum
// =======================
export const mockPosts: Post[] = [
  {
    id: 1,
    title: "Reflexões sobre o Futuro da Justiça Social",
    excerpt:
      "A justiça social na era contemporânea exige uma análise profunda dos mecanismos de exclusão e inclusão em nossa sociedade...",
    date: "18 de Janeiro de 2024",
    comments: 12,
    author: mockUsers.professor.name,
  },
  {
    id: 2,
    title: "O Papel da Universidade na Transformação Social",
    excerpt:
      "As universidades públicas têm um papel fundamental na formação de cidadãos críticos e na produção de conhecimento...",
    date: "16 de Janeiro de 2024",
    comments: 8,
    author: mockUsers["aluno-nejusc"].name,
  },
  {
    id: 3,
    title: "Direitos Humanos e Tecnologia: Desafios e Oportunidades",
    excerpt:
      "A revolução digital trouxe novas oportunidades para os direitos humanos, mas também criou desafios inéditos...",
    date: "14 de Janeiro de 2024",
    comments: 15,
    author: mockUsers.professor.name,
  },
];

export const mockComments: Comment[] = [
  {
    id: 1,
    content:
      "Excelente artigo! A abordagem multidisciplinar enriquece muito a discussão sobre justiça social.",
    date: "19 de Janeiro de 2024",
    relatedTitle: "Justiça Social e Direitos Humanos na Era Digital",
    relatedLink: "#",
    author: mockUsers.professor.name,
  },
  {
    id: 2,
    content:
      "Concordo com a análise apresentada, mas devemos considerar também os aspectos econômicos da questão.",
    date: "17 de Janeiro de 2024",
    relatedTitle: "Análise Crítica das Políticas Públicas em Salvador",
    relatedLink: "#",
    author: mockUsers["aluno-nejusc"].name,
  },
  {
    id: 3,
    content:
      "Este tema é muito relevante para minha pesquisa de mestrado. Vocês têm alguma recomendação de bibliografia?",
    date: "15 de Janeiro de 2024",
    relatedTitle: "Movimentos Sociais e Transformação Urbana",
    relatedLink: "#",
    author: mockUsers["aluno-comum"].name,
  },
];

// =======================
// Mock User Management
// =======================
export const mockUsersManagement: UserManagement[] = [
  {
    id: 1,
    name: "João Silva",
    email: "joao.silva@estudante.unijorge.edu.br",
    userType: "aluno-comum",
    status: "ativo",
    lastAccess: "20 de Janeiro de 2024",
  },
  {
    id: 2,
    name: "Ana Oliveira",
    email: "ana.oliveira@nejusc.unijorge.edu.br",
    userType: "aluno-nejusc",
    status: "ativo",
    lastAccess: "19 de Janeiro de 2024",
  },
  {
    id: 3,
    name: "Roberto Mendes",
    email: "roberto.mendes@gmail.com",
    userType: "visitante",
    status: "ativo",
    lastAccess: "18 de Janeiro de 2024",
  },
  {
    id: 4,
    name: "Dr. Pedro Lima",
    email: "pedro.lima@unijorge.edu.br",
    userType: "professor",
    status: "suspenso",
    lastAccess: "15 de Janeiro de 2024",
  },
];
