export interface User {
  name: string;
  email: string;
  password: string;
  userType: 'visitante' | 'aluno-comum' | 'aluno-nejusc' | 'professor' | 'administrador';
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
  status?: 'publicado' | 'em-revisao' | 'rejeitado';
  accessDate?: string;
  author?: string;
}

export interface Post {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  comments: number;
  author?: string;
}

export interface Comment {
  id: number;
  content: string;
  date: string;
  relatedTitle: string;
  relatedLink: string;
  author?: string;
}

export interface UserManagement {
  id: number;
  name: string;
  email: string;
  userType: string;
  status: 'ativo' | 'inativo' | 'suspenso';
  lastAccess: string;
}

// Dados mockados para diferentes tipos de usuário
export const mockUsers: Record<string, User> = {
  professor: {
    name: 'Dr. Maria de Fátima',
    email: 'maria.fatima@nejusc.unijorge.edu.br',
    password: 'demo123',
    userType: 'professor',
    avatar: '',
    joinDate: 'Janeiro 2022',
    institution: 'NEJUSC - Unijorge Salvador BA',
    department: 'Departamento de Ciências Sociais',
    permissions: ['publish', 'comment', 'review', 'moderate', 'manage_permissions']
  },
  'aluno-comum': {
    name: 'Ryan Maia',
    email: 'ryan.maia@estudante.unijorge.edu.br',
    password: 'demo123',
    userType: 'aluno-comum',
    avatar: '',
    joinDate: 'Março 2023',
    institution: 'Unijorge Salvador BA',
    department: 'Curso de Direito',
    permissions: ['view', 'comment']
  },
  'aluno-nejusc': {
    name: 'Ana Oliveira',
    email: 'ana.oliveira@nejusc.unijorge.edu.br',
    password:'demo123',
    userType: 'aluno-nejusc',
    avatar: '',
    joinDate: 'Agosto 2023',
    institution: 'NEJUSC - Unijorge Salvador BA',
    department: 'Núcleo de Estudos em Justiça Social',
    permissions: ['view', 'comment', 'publish', 'participate_research']
  },
  administrador: {
    name: 'Prof. Carlos Costa',
    email: 'carlos.costa@nejusc.unijorge.edu.br',
    password: 'demo123',
    userType: 'administrador',
    avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150',
    joinDate: 'Janeiro 2021',
    institution: 'NEJUSC - Unijorge Salvador BA',
    department: 'Coordenação Acadêmica',
    permissions: ['full_access', 'user_management', 'content_management', 'system_config']
  },
};

export const mockPublishedArticles: Article[] = [
  {
    id: 1,
    title: 'Justiça Social e Direitos Humanos na Era Digital',
    date: '15 de Janeiro de 2024',
    link: '#',
    views: 1234,
    status: 'publicado',
    author: 'Dr. Maria Santos'
  },
  {
    id: 2,
    title: 'Análise Crítica das Políticas Públicas em Salvador',
    date: '10 de Janeiro de 2024',
    link: '#',
    views: 856,
    status: 'em-revisao',
    author: 'Ana Oliveira'
  },
  {
    id: 3,
    title: 'Movimentos Sociais e Transformação Urbana',
    date: '5 de Janeiro de 2024',
    link: '#',
    views: 643,
    status: 'publicado',
    author: 'Dr. Maria Santos'
  },
  {
    id: 4,
    title: 'Educação Popular e Emancipação Social',
    date: '2 de Janeiro de 2024',
    link: '#',
    views: 421,
    status: 'rejeitado',
    author: 'João Silva'
  }
];

export const mockAccessedArticles: Article[] = [
  {
    id: 1,
    title: 'Democracia Participativa no Brasil Contemporâneo',
    date: '20 de Janeiro de 2024',
    link: '#',
    accessDate: '20 de Janeiro de 2024'
  },
  {
    id: 2,
    title: 'Teorias da Justiça: Uma Perspectiva Multidisciplinar',
    date: '18 de Janeiro de 2024',
    link: '#',
    accessDate: '19 de Janeiro de 2024'
  },
  {
    id: 3,
    title: 'Inclusão Social através da Educação Superior',
    date: '15 de Janeiro de 2024',
    link: '#',
    accessDate: '18 de Janeiro de 2024'
  }
];

export const mockPosts: Post[] = [
  {
    id: 1,
    title: 'Reflexões sobre o Futuro da Justiça Social',
    excerpt: 'A justiça social na era contemporânea exige uma análise profunda dos mecanismos de exclusão e inclusão em nossa sociedade. Este post explora os principais desafios...',
    date: '18 de Janeiro de 2024',
    comments: 12,
    author: 'Dr. Maria Santos'
  },
  {
    id: 2,
    title: 'O Papel da Universidade na Transformação Social',
    excerpt: 'As universidades públicas têm um papel fundamental na formação de cidadãos críticos e na produção de conhecimento que pode transformar a realidade social...',
    date: '16 de Janeiro de 2024',
    comments: 8,
    author: 'Ana Oliveira'
  },
  {
    id: 3,
    title: 'Direitos Humanos e Tecnologia: Desafios e Oportunidades',
    excerpt: 'A revolução digital trouxe novas oportunidades para a promoção dos direitos humanos, mas também criou desafios inéditos que precisamos enfrentar...',
    date: '14 de Janeiro de 2024',
    comments: 15,
    author: 'Dr. Maria Santos'
  }
];

export const mockComments: Comment[] = [
  {
    id: 1,
    content: 'Excelente artigo! A abordagem multidisciplinar enriquece muito a discussão sobre justiça social. Seria interessante ver mais estudos empíricos na região nordeste.',
    date: '19 de Janeiro de 2024',
    relatedTitle: 'Justiça Social e Direitos Humanos na Era Digital',
    relatedLink: '#',
    author: 'Dr. Maria de Fátima'
  },
  {
    id: 2,
    content: 'Concordo com a análise apresentada, mas acredito que devemos considerar também os aspectos econômicos da questão. A desigualdade é um fator central.',
    date: '17 de Janeiro de 2024',
    relatedTitle: 'Análise Crítica das Políticas Públicas em Salvador',
    relatedLink: '#',
    author: 'Ana Oliveira'
  },
  {
    id: 3,
    content: 'Este tema é muito relevante para minha pesquisa de mestrado. Vocês têm alguma recomendação de bibliografia complementar?',
    date: '15 de Janeiro de 2024',
    relatedTitle: 'Movimentos Sociais e Transformação Urbana',
    relatedLink: '#',
    author: 'João Silva'
  }
];

export const mockUsersManagement: UserManagement[] = [
  {
    id: 1,
    name: 'João Silva',
    email: 'joao.silva@estudante.unijorge.edu.br',
    userType: 'aluno-comum',
    status: 'ativo',
    lastAccess: '20 de Janeiro de 2024'
  },
  {
    id: 2,
    name: 'Ana Oliveira',
    email: 'ana.oliveira@nejusc.unijorge.edu.br',
    userType: 'aluno-nejusc',
    status: 'ativo',
    lastAccess: '19 de Janeiro de 2024'
  },
  {
    id: 3,
    name: 'Roberto Mendes',
    email: 'roberto.mendes@gmail.com',
    userType: 'visitante',
    status: 'ativo',
    lastAccess: '18 de Janeiro de 2024'
  },
  {
    id: 4,
    name: 'Dr. Pedro Lima',
    email: 'pedro.lima@unijorge.edu.br',
    userType: 'professor',
    status: 'suspenso',
    lastAccess: '15 de Janeiro de 2024'
  }
];
