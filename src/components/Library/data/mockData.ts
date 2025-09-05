import { Artigo, Revista } from '../types';

export const artigosMock: Artigo[] = [
  {
    id: '1',
    titulo: 'Direitos Humanos e Justiça Social no Século XXI',
    descricao: 'Uma análise abrangente dos desafios contemporâneos para a garantia dos direitos humanos fundamentais na sociedade moderna.',
    publicacao: '2024-03-15',
    arquivopdf: '/pdfs/artigo1.pdf',
    autores: ['Dr. Maria Santos', 'Prof. João Silva'],
    area: 'Direitos Humanos',
    keywords: ['justiça', 'direitos sociais', 'século XXI', 'garantias fundamentais']
  },
  {
    id: '2',
    titulo: 'Movimentos Sociais e Transformação Política',
    descricao: 'Estudo sobre o impacto dos movimentos sociais na construção de políticas públicas inclusivas.',
    publicacao: '2024-08-22',
    arquivopdf: '/pdfs/artigo2.pdf',
    autores: ['Profa. Ana Costa', 'Dr. Pedro Oliveira'],
    area: 'Movimentos Sociais',
    keywords: ['movimentos sociais', 'políticas públicas', 'transformação', 'inclusão']
  },
  {
    id: '3',
    titulo: 'Acesso à Justiça: Desafios e Perspectivas',
    descricao: 'Investigação sobre as barreiras existentes no acesso à justiça e propostas de melhoria.',
    publicacao: '2023-11-10',
    arquivopdf: '/pdfs/artigo3.pdf',
    autores: ['Dr. Carlos Mendes', 'Profa. Lucia Rocha'],
    area: 'Acesso à Justiça',
    keywords: ['acesso à justiça', 'barreiras', 'sistema judicial', 'democracia']
  },
  {
    id: '4',
    titulo: 'Educação em Direitos Humanos: Práticas Pedagógicas',
    descricao: 'Metodologias inovadoras para o ensino de direitos humanos no contexto universitário.',
    publicacao: '2023-05-18',
    arquivopdf: '/pdfs/artigo4.pdf',
    autores: ['Profa. Regina Torres', 'Dr. Miguel Ferreira'],
    area: 'Educação',
    keywords: ['educação', 'direitos humanos', 'pedagogia', 'universidade']
  },
  {
    id: '5',
    titulo: 'Políticas de Igualdade de Gênero no Trabalho',
    descricao: 'Análise das políticas públicas voltadas para a igualdade de gênero no mercado de trabalho.',
    publicacao: '2024-01-30',
    arquivopdf: '/pdfs/artigo5.pdf',
    autores: ['Dra. Fernanda Lima', 'Prof. Roberto Alves'],
    area: 'Igualdade de Gênero',
    keywords: ['gênero', 'trabalho', 'políticas públicas', 'igualdade']
  }
];

export const revistasMock: Revista[] = [
  {
    id: '1',
    titulo: 'Revista NEJUSC - Justiça e Sociedade',
    descricao: 'Edição especial sobre direitos humanos e transformação social no contexto brasileiro.',
    edicao: 'Volume 12, Nº 1',
    capa: 'https://images.pexels.com/photos/267507/pexels-photo-267507.jpeg?auto=compress&cs=tinysrgb&w=200',
    publicacao: '2024-06-15',
    arquivopdf: '/pdfs/revista1.pdf',
    autores: ['Editor Chefe: Dr. Antonio Marcos', 'Editora Adjunta: Profa. Clara Santos'],
    area: 'Multidisciplinar',
    keywords: ['direitos humanos', 'transformação social', 'Brasil', 'justiça social']
  },
  {
    id: '2',
    titulo: 'Cadernos de Pesquisa em Direitos Sociais',
    descricao: 'Publicação trimestral dedicada à pesquisa em direitos sociais e políticas públicas.',
    edicao: 'Volume 8, Nº 3',
    capa: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=200',
    publicacao: '2024-09-01',
    arquivopdf: '/pdfs/revista2.pdf',
    autores: ['Editor: Prof. Marcos Vieira', 'Co-editor: Dra. Isabel Martins'],
    area: 'Direitos Sociais',
    keywords: ['direitos sociais', 'políticas públicas', 'pesquisa', 'sociedade']
  },
  {
    id: '3',
    titulo: 'Anuário de Estudos Jurídico-Sociais',
    descricao: 'Compilação anual dos principais estudos na interseção entre direito e sociedade.',
    edicao: 'Ano 2023',
    capa: 'https://images.pexels.com/photos/207662/pexels-photo-207662.jpeg?auto=compress&cs=tinysrgb&w=200',
    publicacao: '2023-12-20',
    arquivopdf: '/pdfs/revista3.pdf',
    autores: ['Organizador: Dr. Paulo Henrique', 'Co-organizadora: Profa. Marina Silva'],
    area: 'Estudos Jurídico-Sociais',
    keywords: ['direito', 'sociedade', 'estudos jurídicos', 'anuário']
  }
];