import React, { useState } from 'react';
import { RoleBanner } from './RoleBanner';
import { ForumNavigation } from './ForumNavigation';
import { ForumDiscussions } from './ForumDiscussions';
import { AdminDashboard } from './AdminDashboard';
import { PublicationRequest } from './PublicationRequest';
import { useAuth } from '../contexts/AuthContext';

export function ForumLayout() {
  const [activeTab, setActiveTab] = useState('discussions');
  const { user } = useAuth();

  const renderContent = () => {
    switch (activeTab) {
      case 'discussions':
        return <ForumDiscussions />;
      case 'manage':
        return user?.role === 'admin' ? <AdminDashboard /> : <ForumDiscussions />;
      case 'request-publication':
        return user?.role === 'student' ? 
          <PublicationRequest onBack={() => setActiveTab('discussions')} /> : 
          <ForumDiscussions />;
      default:
        return <ForumDiscussions />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ForumNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <RoleBanner />
        {renderContent()}
      </div>
    </div>
  );
}