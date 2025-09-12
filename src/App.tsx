import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './components/HomePage';
import Login from './components/Login';
import ProfilePage from "./components/ProfilePage";
import LibraryPage from './components/LibraryPage';
import EventPage from './components/EventPage';
import { ForumLayout } from './components/ForumLayout';
import Header from "./components/Header";
import PublicPage from './components/Library/components/Biblioteca/PublicPage';
import BibliotecaView from './components/Library/components/Biblioteca/BibliotecaView';

function App() {
  return (
    <Router>
      <Header /> {/* Header global agora sempre visível (inclusive visitante) */}
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/perfil" element={<ProfilePage />} />

          {/* Biblioteca com subrotas */}
          <Route path="/biblioteca" element={<LibraryPage />}>
            <Route index element={<BibliotecaView />} />
            <Route path="publicar" element={<PublicPage />} />
          </Route>

          <Route path="/forum" element={<ForumLayout />} />
          <Route path="/eventos" element={<EventPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
