import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './components/HomePage';
import EquipePage from './components/EquipePage';
import Login from './components/Login';
import Register from './components/Register';
import ProfilePage from "./components/ProfilePage";
import LibraryPage from './components/LibraryPage';
import ChatPage from './components/ChatPage';
import EventPage from './components/EventPage';
import { ForumView } from './components/Forum/components/ForumView';
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
          <Route path="/cadastro" element={<Register />} />
          <Route path="/equipe" element={<EquipePage />} />
          <Route path="/perfil" element={<ProfilePage />} />

          {/* Biblioteca com subrotas */}
          <Route path="/biblioteca" element={<LibraryPage />}>
            <Route index element={<BibliotecaView />} />
            <Route path="publicar" element={<PublicPage />} />
          </Route>
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/forum" element={<ForumView />} />
          <Route path="/eventos" element={<EventPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
