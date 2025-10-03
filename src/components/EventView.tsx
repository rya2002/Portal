import { useState } from "react";
import { Plus, Trash } from "lucide-react";
import EventCarousel from "./Event/teste/Eventos/components/EventCarousel";
import AddEventModal from "./Event/teste/Eventos/components/AddEventModal";
import AddMediaModal from "./Event/teste/Eventos/components/AddMediaModal";
import { Event, Midia, AddMediaPayload } from "./Event/teste/Eventos/types";
import { useAuth } from "../contexts/AuthContext";
import { useLocalStorage } from "../components/Event/teste/Eventos/hooks/useLocalStorage";

function EventView() {
  const { user } = useAuth();

  // LocalStorage para eventos e mídias
  const [events, setEvents] = useLocalStorage<Event[]>("nejusc-events", []);
  const [media, setMedia] = useLocalStorage<Midia[]>("nejusc-media", []);

  const [filteredEvents, setFilteredEvents] = useState<Event[]>(events);
  const [activeCategory, setActiveCategory] = useState("em-andamento");
  const [isAddEventModalOpen, setIsAddEventModalOpen] = useState(false);
  const [isAddMediaModalOpen, setIsAddMediaModalOpen] = useState(false);

  const canAddItems = ["professor", "administrador", "aluno-nejusc"].includes(
    user?.userType || ""
  );

  // Adicionar evento
  const handleAddEvent = (eventData: Omit<Event, "id">) => {
    const newEvent: Event = { ...eventData, id: `event-${Date.now()}` };
    const updated = [newEvent, ...events];
    setEvents(updated);
    setFilteredEvents(updated);
  };

  // Adicionar mídia (agora tipado corretamente como AddMediaPayload)
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

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-1 pt-16">
        {/* Botões de Adição */}
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

        {/* Carrossel */}
        <EventCarousel
          events={filteredEvents}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        {/* Galeria de Fotos e Vídeos */}
        <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              Fotos e Vídeos
            </h2>
          </div>

          {media.length === 0 ? (
            <div className="text-center text-gray-500">
              Ainda não há fotos ou vídeos publicados.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {media.map((m) => (
                <div
                  key={m.id}
                  className="bg-white rounded shadow p-2 overflow-hidden"
                >
                  <div className="w-full h-56 bg-gray-100 rounded overflow-hidden flex items-center justify-center">
                    {m.tipo === "foto" ? (
                      <img
                        src={m.url}
                        alt={m.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <video
                        src={m.url}
                        controls
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>

                  <div className="mt-2 flex items-center justify-between">
                    <div>
                      <div className="font-medium text-sm text-gray-900">
                        {m.title || (m.tipo === "foto" ? "Foto" : "Vídeo")}
                      </div>
                      <div className="text-xs text-gray-500">
                        {m.uploadedBy} •{" "}
                        {m.date
                          ? new Date(m.date).toLocaleDateString()
                          : "Data desconhecida"}
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

      {/* Modais */}
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
}

export default EventView;
