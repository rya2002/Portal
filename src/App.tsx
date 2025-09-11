import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import HomePage from './components/HomePage';
import Login from './components/Login';
import ProfilePage from "./components/ProfilePage";
import LibraryPage from './components/LibraryPage';
import EventPage from './components/EventPage';
import { ForumLayout } from './components/ForumLayout';
import Header from "./components/Header";
import PublicPage from './components/Library/components/Biblioteca/PublicPage';
import BibliotecaView from './components/Library/components/Biblioteca/BibliotecaView';

function AppContent() {
  const location = useLocation();

  const hideHeaderRoutes = ["/login", "/perfil"];
  const shouldShowHeader = !hideHeaderRoutes.includes(location.pathname);

  return (
    <div className="App">
      {shouldShowHeader && <Header />} 
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/perfil" element={<ProfilePage />} />
        <Route path="/biblioteca" element={<LibraryPage />}>
          <Route index element={<BibliotecaView />} />
          <Route path="publicar" element={<PublicPage />} />
        </Route>
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
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
