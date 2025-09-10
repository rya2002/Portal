import React from "react";
import EventView from "./Event/teste/Eventos/components/EventView";

const EventPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header com navegação e auth */}
      <Header />

      {/* Conteúdo da Biblioteca */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <EventView />
      </main>
    </div>
  );
};

export default EventPage