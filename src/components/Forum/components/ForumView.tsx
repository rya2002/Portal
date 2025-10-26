// src/views/Forum/ForumView.tsx
import { useState, useMemo } from 'react';
import { MessageSquare, PlusCircle, Shield } from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';
import { ForumDiscussions } from './ForumDiscussions';
import { ForumPostEditor } from './ForumPostEditor';
import { AdminDashboard } from './AdminDashboard';

export function ForumView() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'discussions' | 'create' | 'admin'>('discussions');

  const tabs = useMemo(() => {
    const base = [{ id: 'discussions', label: 'Postagens', icon: MessageSquare }];
    if (user) base.push({ id: 'create', label: 'Nova Postagem', icon: PlusCircle });
    if (user && ['admin', 'professor'].includes(user.role))
      base.push({ id: 'admin', label: 'Painel Administrativo', icon: Shield });
    return base;
  }, [user]);

  const content = useMemo(() => {
    switch (activeTab) {
      case 'discussions':
        return <ForumDiscussions />;
      case 'create':
        return <ForumPostEditor onBack={() => setActiveTab('discussions')} />;
      case 'admin':
        return ['admin', 'professor'].includes(user?.role || '')
          ? <AdminDashboard />
          : <ForumDiscussions />;
      default:
        return <ForumDiscussions />;
    }
  }, [activeTab, user]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Barra de navegação */}
      <nav className="flex space-x-6 border-b border-gray-200 bg-white px-6 py-3">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id as any)}
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

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        {content}
      </main>
    </div>
  );
}
