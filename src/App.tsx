import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import HomePage from './components/HomePage';
import Login  from './components/Login';
import { ForumLayout } from './components/ForumLayout';
import { ProtectedRoute } from './components/ProtectedRoute';
import ProfilePage from "./components/ProfilePage";
import Header from "./components/Header";
import LibraryPage from './components/LibraryPage';

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
        <Route path="/biblioteca" element={<LibraryPage />} />
        <Route path="/forum" element={<ForumLayout />} />
        <Route path="/perfil" element={<ProfilePage />} />
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
            <Route path="/biblioteca" element={<LibraryPage />} />
            <Route path="/forum" element={<ForumLayout />} />
            <Route path="/perfil" element={<ProfilePage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;