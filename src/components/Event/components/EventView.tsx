import { useEffect, useState, useCallback } from "react";
import { Plus, Trash } from "lucide-react";

import EventCarousel from "../components/EventCarousel";
import AddEventModal from "../components/AddEventModal";
import AddMediaModal from "../components/AddMediaModal";

import { Event, Midia, AddMediaPayload, CreateEventData } from "../types/index";
import { useAuth } from "../../../contexts/AuthContext";

import {
  getAllEventosRequest,
  createEventoRequest,
  deleteEventoRequest,
} from "../../../services/eventoService";

const EventView = () => {
  const { user } = useAuth();

  const [eventos, setEventos] = useState<Event[]>([]);
  const [filteredEventos, setFilteredEventos] = useState<Event[]>([]);
  const [media, setMedia] = useState<Midia[]>([]);
  const [activeCategory, setActiveCategory] = useState("em-andamento");
  const [isAddEventModalOpen, setIsAddEventModalOpen] = useState(false);
  const [isAddMediaModalOpen, setIsAddMediaModalOpen] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const canAddItems = user && ["alunoNEJUSC", "professor", "admin"].includes(user.role);

  // 🟢 Buscar eventos do backend
  const fetchEventos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllEventosRequest();
      setEventos(data);
      setFilteredEventos(data);
    } catch (err: any) {
      console.error("Erro ao buscar eventos:", err);
      setError(err.message || "Não foi possível carregar os eventos.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEventos();
  }, [fetchEventos]);

  // 🟢 Adicionar evento
  const handleAddEvent = async (eventData: CreateEventData) => {
    try {
      const newEvent = await createEventoRequest(eventData);
      const updated = [newEvent, ...eventos];
      setEventos(updated);
      setFilteredEventos(updated);
    } catch (err) {
      console.error("Erro ao adicionar evento:", err);
      alert("Falha ao adicionar evento.");
    }
  };

  // 🟢 Remover evento
  const handleRemoveEvent = async (id: string) => {
    if (!window.confirm("Tem certeza que deseja deletar este evento?")) return;

    try {
      await deleteEventoRequest(id);
      const updated = eventos.filter((e) => e.id !== id);
      setEventos(updated);
      setFilteredEventos(updated);
    } catch (err) {
      console.error("Erro ao deletar evento:", err);
      alert("Erro ao deletar evento.");
    }
  };

  // 🟢 Adicionar mídia
  const handleAddMedia = (payload: AddMediaPayload) => {
    const newMedia: Midia = {
      id: `media-${Date.now()}`,
      tipo: payload.type,
      url: payload.url,
      title: payload.title,
      uploadedBy: user?.name ?? "Desconhecido",
      date: new Date().toISOString(),
    };
    setMedia([newMedia, ...media]);
  };

  const handleRemoveMedia = (id: string) => {
    setMedia(media.filter((m) => m.id !== id));
  };

  // 🧱 Renderização
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-1 pt-16">
        {/* Botões de Ação */}
        {canAddItems && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-end gap-3">
            <button
              onClick={() => setIsAddEventModalOpen(true)}
              className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Evento
            </button>
            <button
              onClick={() => setIsAddMediaModalOpen(true)}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Mídia
            </button>
          </div>
        )}

        {/* Estado da Página */}
        {loading ? (
          <p className="text-center py-12">Carregando eventos... ⏳</p>
        ) : error ? (
          <div className="text-center py-12 text-red-500">
            <p>Erro: {error}</p>
            <button
              onClick={fetchEventos}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Tentar Novamente
            </button>
          </div>
        ) : filteredEventos.length === 0 ? (
          <p className="text-center py-12 text-gray-500">
            Nenhum evento encontrado. 🗓️
          </p>
        ) : (
          <EventCarousel
            eventos={filteredEventos}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            onRemove={handleRemoveEvent}
          />
        )}

        {/* Galeria */}
        <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">Fotos e Vídeos</h2>
          </div>

          {media.length === 0 ? (
            <div className="text-center text-gray-500">
              Ainda não há fotos ou vídeos publicados.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {media.map((m) => (
                <div key={m.id} className="bg-white rounded shadow p-2 overflow-hidden">
                  <div className="w-full h-56 bg-gray-100 rounded overflow-hidden flex items-center justify-center">
                    {m.tipo === "foto" ? (
                      <img src={m.url} alt={m.title} className="w-full h-full object-cover" />
                    ) : (
                      <video src={m.url} controls className="w-full h-full object-cover" />
                    )}
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <div>
                      <div className="font-medium text-sm text-gray-900">
                        {m.title || (m.tipo === "foto" ? "Foto" : "Vídeo")}
                      </div>
                      <div className="text-xs text-gray-500">
                        {m.uploadedBy} •{" "}
                        {m.date ? new Date(m.date).toLocaleDateString() : "Data desconhecida"}
                      </div>
                    </div>
                    {canAddItems && (
                      <button
                        onClick={() => handleRemoveMedia(m.id)}
                        className="p-2 rounded hover:bg-red-50 text-red-600"
                      >
                        <Trash className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <AddEventModal
        isOpen={isAddEventModalOpen}
        onClose={() => setIsAddEventModalOpen(false)}
        onAddEvent={handleAddEvent}
      />
      <AddMediaModal
        isOpen={isAddMediaModalOpen}
        onClose={() => setIsAddMediaModalOpen(false)}
        onAddMedia={handleAddMedia}
      />
    </div>
  );
};

export default EventView;
