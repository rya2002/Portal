import React, { useMemo, useState } from 'react';
import Header from '../components/Header';
import ForumHeader from './ForumHeader';
import { Import } from 'lucide-react';
import ForumNavigation from './ForumNavigation'; 
import { ForumDiscussions } from './ForumDiscussions';
import { AdminDashboard } from './AdminDashboard';
import { PublicationRequest } from './PublicationRequest';
import { useAuth } from '../contexts/AuthContext';

export function ForumLayout() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'discussions' | 'manage' | 'request-publication'>('discussions');

  const content = useMemo(() => {
    const isAdmin = ['administrador', 'professor'].includes(user?.userType || '');
    const isAuthenticated    = user?.userType && user?.userType !== 'visitante';

    switch (activeTab) {
      case 'discussions':
        return <ForumDiscussions />;

      case 'manage':
        return isAdmin ? <AdminDashboard /> : <ForumDiscussions />;

      case 'request-publication':
        return isAuthenticated
          ? <PublicationRequest onBack={() => setActiveTab('discussions')} />
          : <ForumDiscussions />;

      default:
        return <ForumDiscussions />;
    }
  }, [activeTab, user]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <ForumNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {content}
      </main>
    </div>
  );
}