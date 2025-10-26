export interface Postagem {
  id: string;
  titulo: string;
  conteudo: string;
  autor: string;
  dataPublicacao: string;
  status: 'Pendente' | 'Aprovado' | 'Rejeitado';
  respostas?: Resposta[];
}

export interface Resposta {
  id: string;
  postagemId: string;
  conteudo: string;
  autor: string;
  dataResposta: string;
}

export interface PublicationRequest {
  id: string;
  title: string;
  description: string;
  studentName: string;
  studentEmail: string;
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected';
  category: string;
}
