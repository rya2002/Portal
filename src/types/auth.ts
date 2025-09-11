export interface User {
  id: string;
  name: string;
  email: string;
  role: 'visitante' | 'aluno' | 'aluno-nejusc' | 'professor' | 'admin';
  avatar?: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

export interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: string;
  authorRole: string;
  createdAt: string;
  likes: number;
  comments: Comment[];
  category: string;
}

export interface Comment {
  id: string;
  content: string;
  author: string;
  authorRole: string;
  createdAt: string;
  likes: number;
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