import React from "react";
import Header from "./Header";
import BibliotecaView from "./Library/components/Biblioteca/BibliotecaView";
import { Outlet } from "react-router-dom";

const LibraryPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header com navegação e auth */}
      <Header />

      {/* Conteúdo da Biblioteca */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <BibliotecaView />
        <Outlet />
      </main>
    </div>
  );
};

export default LibraryPage