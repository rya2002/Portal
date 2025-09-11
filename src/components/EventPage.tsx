import React from "react";
import EventView from "./EventView";
import Header from "./Header";
import Footer from "./Footer";
import EventHeader from "./EventHeader";


const EventPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <EventView />
      </main>
      <Footer />
    </div>
  );
};

export default EventPage