import { useState, useMemo } from 'react';
import { MessageSquare, PlusCircle, Shield } from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';
import { useForum } from '../hooks/useForum';
import { ForumDiscussions } from './ForumDiscussions';
import { ForumPostEditor } from './ForumPostEditor';
import { AdminDashboard } from './AdminDashboard';

export function ForumView() {
  const { user } = useAuth();
  const { posts, loading } = useForum();
  const [activeTab, setActiveTab] = useState<'discussions' | 'admin'>('discussions');
  const [showEditor, setShowEditor] = useState(false);

  const canViewTabs =
    user && ['admin', 'professor', 'alunoNEJUSC'].includes(user.role);

  const tabs = useMemo(() => {
    const base = [{ id: 'discussions', label: 'Postagens', icon: MessageSquare }];
    if (user && ['admin', 'professor', 'alunoNEJUSC'].includes(user.role))
      base.push({ id: 'admin', label: 'Painel Administrativo', icon: Shield });
    return base;
  }, [user]);

  const content = useMemo(() => {
    if (showEditor) {
      return <ForumPostEditor onBack={() => setShowEditor(false)} />;
    }

    switch (activeTab) {
      case 'discussions':
        return <ForumDiscussions />;
      case 'admin':
        return ['admin', 'professor', 'alunoNEJUSC'].includes(user?.role || '')
          ? <AdminDashboard />
          : <ForumDiscussions />;
      default:
        return <ForumDiscussions />;
    }
  }, [activeTab, showEditor, user, posts, loading]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Cabeçalho de Navegação */}
      {canViewTabs && (
        <nav className="flex justify-center space-x-6 border-b border-gray-200 bg-white px-6 py-3">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => {
                setShowEditor(false);
                setActiveTab(id as any);
              }}
              className={`flex items-center space-x-2 pb-1 border-b-2 text-sm font-medium transition-colors ${
                activeTab === id
                  ? 'text-blue-600 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700 border-transparent'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{label}</span>
            </button>
          ))}
        </nav>
      )}

      {/* Botão Nova Postagem */}
      {user && (
        <div className="flex justify-end bg-white border-b px-6 py-3">
          <button
            onClick={() => setShowEditor(true)}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Nova Postagem</span>
          </button>
        </div>
      )}

      {/* Conteúdo principal */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        {content}
      </main>
    </div>
  );
}
