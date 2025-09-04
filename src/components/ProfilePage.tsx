import React, { useState } from 'react';
import Sidebar from "../components/Profile/Sidebar";
import UserProfile from "../components/Profile/UserProfile";
import ArticlesList from "../components/Profile/ArticlesList";
import PostsList from "../components/Profile/PostsList";
import CommentsList from "../components/Profile/CommentsList";
import AdminSection from "../components/Profile/AdminSection";
import UserManagement from "../components/Profile/UserManagement";
import PermissionsManagement from "../components/Profile/PermissionsManagement";
import ReviewSection from "../components/Profile/ReviewSection";

import { 
  mockUsers, 
  mockPublishedArticles, 
  mockAccessedArticles, 
  mockPosts, 
  mockComments,
  mockUsersManagement
} from "../data/mockData";

function ProfilePage() {
  // Simular usuário logado - pode ser alterado para testar diferentes tipos
  const [currentUserType] = useState<'visitante' | 'aluno-comum' | 'aluno-nejusc' | 'professor' | 'administrador'>('professor');
  const [activeSection, setActiveSection] = useState('perfil');
  
  const currentUser = mockUsers[currentUserType];

  const renderContent = () => {
    switch (activeSection) {
      case 'perfil':
        return <UserProfile user={currentUser} />;
      
      case 'artigos-publicados':
        if (!['aluno-nejusc', 'professor', 'administrador'].includes(currentUserType)) return null;
        return (
          <ArticlesList 
            articles={mockPublishedArticles} 
            type="published" 
            userType={currentUserType} 
          />
        );
      
      case 'artigos-acessados':
        return (
          <ArticlesList 
            articles={mockAccessedArticles} 
            type="accessed" 
            userType={currentUserType} 
          />
        );
      
      case 'postagens':
        if (!['aluno-nejusc', 'professor', 'administrador'].includes(currentUserType)) return null;
        return <PostsList posts={mockPosts} />;
      
      case 'comentarios':
        if (currentUserType === 'visitante') return null;
        return <CommentsList comments={mockComments} />;
      
      case 'revisoes':
        if (!['professor', 'administrador'].includes(currentUserType)) return null;
        return <ReviewSection userType={currentUserType} />;
      
      case 'gerenciar-permissoes':
        if (!['professor', 'administrador'].includes(currentUserType)) return null;
        return <PermissionsManagement currentUserType={currentUserType} />;
      
      case 'gerenciar-usuarios':
        if (currentUserType !== 'administrador') return null;
        return <UserManagement users={mockUsersManagement} currentUserType={currentUserType} />;
      
      case 'analytics':
      case 'configuracoes':
      case 'moderacao':
      case 'gerenciar-conteudo':
        if (currentUserType !== 'administrador') return null;
        return <AdminSection section={activeSection} />;
      
      default:
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Seção não encontrada</h2>
            <p className="text-gray-600">A seção solicitada não foi encontrada ou você não tem permissão para acessá-la.</p>
          </div>
        );
    }
  };

  const getUserTypeLabel = (type: string) => {
    const labels = {
      visitante: 'Visitante',
      'aluno-comum': 'Aluno',
      'aluno-nejusc': 'Aluno NEJUSC',
      professor: 'Professor',
      administrador: 'Administrador'
    };
    return labels[type as keyof typeof labels];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <Sidebar 
          userType={currentUserType} 
          activeSection={activeSection} 
          onSectionChange={setActiveSection} 
        />
        
        <div className="flex-1 lg:ml-0">
          <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="ml-12 lg:ml-0">
                <h1 className="text-2xl font-bold text-gray-800">
                  NEJUSC - Portal Universitário
                </h1>
                <p className="text-gray-600 text-sm">
                  Núcleo de Estudos em Justiça Social - Unijorge Salvador BA
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-right hidden md:block">
                  <p className="text-sm font-medium text-gray-800">{currentUser.name}</p>
                  <p className="text-xs text-gray-600">{getUserTypeLabel(currentUser.userType)}</p>
                </div>
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-blue-100"
                />
              </div>
            </div>
          </header>
          
          <main className="p-6">
            <div className="max-w-7xl mx-auto">
              {renderContent()}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;