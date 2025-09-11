import React from "react";
import { Outlet } from "react-router-dom";

const LibraryPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Outlet />
      </main>
    </div>
  );
};

export default LibraryPage;
