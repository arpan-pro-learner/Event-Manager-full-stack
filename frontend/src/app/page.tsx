"use client";
import { useState } from "react";
import EventList from "@/components/EventList";
import CreateEventForm from "@/components/CreateEventForm";
import Link from "next/link";

export default function HomePage() {
  const [showForm, setShowForm] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  
  const onEventCreated = () => {
    setShowForm(false);
    setRefreshKey((prev) => prev + 1);
  };
  
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero section */}
      <div className="bg-gradient-to-r from-indigo-900 to-purple-800 text-white">
        <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-tight mb-3">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-purple-200">
                Event Manager
              </span>
            </h1>
            <p className="mt-4 text-xl md:text-2xl font-serif text-indigo-100">
              Plan, organize, and manage your events with elegance
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/dashboard">
                <button className="px-6 py-3 bg-white text-indigo-800 rounded-md shadow-md hover:shadow-lg transition duration-300 font-medium">
                  View Dashboard
                </button>
              </Link>
              {!showForm && (
                <button
                  onClick={() => setShowForm(true)}
                  className="px-6 py-3 bg-indigo-600 border border-indigo-400 text-white rounded-md shadow-md hover:bg-indigo-700 transition duration-300 font-medium"
                >
                  + Create New Event
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Form section */}
        {showForm && (
          <div className="max-w-2xl mx-auto mb-16 relative">
            <div className="absolute -top-6 right-6 z-10">
              <button
                onClick={() => setShowForm(false)}
                className="h-12 w-12 flex items-center justify-center rounded-full bg-white shadow-lg hover:bg-gray-50 transition-colors"
              >
                <span className="text-gray-500 text-xl">✕</span>
              </button>
            </div>
            <div className="bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden">
              <div className="p-1">
                <div className="py-4 px-6 border-b border-gray-100">
                  <h2 className="text-2xl font-serif text-gray-800 font-semibold">Create New Event</h2>
                </div>
                <div className="p-6">
                  <CreateEventForm onEventCreated={onEventCreated} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Section title */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-serif font-bold text-gray-800">Upcoming Events</h2>
          <div className="w-24 h-1 bg-indigo-600 mx-auto mt-2 rounded-full"></div>
          <p className="text-gray-600 mt-4 font-serif">Browse and manage your scheduled events</p>
        </div>

        {/* Event grid */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden">
          <div className="p-6">
            <EventList key={refreshKey} />
          </div>
        </div>

        {/* Additional call to action */}
        {!showForm && (
          <div className="mt-12 text-center">
            <button
              onClick={() => setShowForm(true)}
              className="group relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium bg-indigo-50 border-2 border-indigo-300 rounded-md text-indigo-800 hover:text-white"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-300 ease-out opacity-0 group-hover:opacity-100"></span>
              <span className="relative flex items-center font-serif">
                <span className="mr-2 text-lg">+</span> Add Another Event
              </span>
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-16">
        <div className="container mx-auto py-8 px-4 text-center">
          <p className="text-gray-600 font-serif">
            Event Manager — Organize with elegance
          </p>
        </div>
      </footer>
    </main>
  );
}