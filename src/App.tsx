import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import HomePage from './components/HomePage';
import Login  from './components/Login';
import ProfilePage from "./components/ProfilePage";
import LibraryPage from './components/LibraryPage';
import EventPage  from './components/EventPage';
import { ForumLayout } from './components/ForumLayout';
import Header from "./components/Header";
import PublicPage from './components/Library/components/Biblioteca/PublicPage';

function AppContent() {
  const { user } = useAuth();
  const location = useLocation();

  const hideHeaderRoutes = ["/login"]; // rota que NÃO terá header
  const shouldShowHeader = user && !hideHeaderRoutes.includes(location.pathname);

  return (
    <div className="App">
      {shouldShowHeader && <Header />} {/* só aparece quando logado */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/perfil" element={<ProfilePage />} />
        <Route path="/biblioteca" element={<LibraryPage />} />
        <Route path="/forum" element={<ForumLayout />} />
        <Route path="/evento" element={<EventPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/perfil" element={<ProfilePage />} />
          
          {/* Biblioteca com subrotas */}
          <Route path="/biblioteca" element={<LibraryPage />}>
            <Route path="publicar" element={<PublicPage />} />
          </Route>

          <Route path="/forum" element={<ForumLayout />} />
          <Route path="/eventos" element={<EventPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;