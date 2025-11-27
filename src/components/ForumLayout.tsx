import { useMemo, useState } from 'react';

import ForumNavigation from './ForumNavigation'; 
import { ForumDiscussions } from './ForumDiscussions';
import { AdminDashboard } from './AdminDashboard';
import { PublicationRequest } from './PublicationRequest';
import { useAuth } from '../contexts/AuthContext';

export function ForumLayout() {
  const { user } = useAuth();

  const [activeTab, setActiveTab] = useState<
    'discussions' | 'manage' | 'request-publication'
  >('discussions');

  const role = user?.userType?.toLowerCase() || "visitante";
  const isAdmin = ["administrador", "professor"].includes(role);
  const isAuthenticated = role !== "visitante";

  const content = useMemo(() => {
    switch (activeTab) {
      case "discussions":
        return <ForumDiscussions />;

      case "manage":
        return isAdmin ? <AdminDashboard /> : <ForumDiscussions />;

      case "request-publication":
        return isAuthenticated
          ? (
              <PublicationRequest
                onBack={() => setActiveTab("discussions")}
                onSubmitPost={() => setActiveTab("discussions")}
              />
            )
          : <ForumDiscussions />;

      default:
        return <ForumDiscussions />;
    }
  }, [activeTab, isAdmin, isAuthenticated]);

  return (
    <div className="min-h-screen flex flex-col">
      <ForumNavigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isAdmin={isAdmin}
        isAuthenticated={isAuthenticated}
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {content}
      </main>
    </div>
  );
}
