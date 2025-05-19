"use client";

import React, { useEffect, useState } from "react";
import { getAllEvents, getParticipants, cancelRegistration } from "@/lib/api";
import ParticipantList from "@/components/ParticipantList";
import { Participant, Event } from "@/types";

export default function DashboardPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loadingParticipants, setLoadingParticipants] = useState(false);
  const [loadingEvents, setLoadingEvents] = useState(true);

  useEffect(() => {
    async function loadEvents() {
      setLoadingEvents(true);
      try {
        const data = await getAllEvents();
        // Ensure each event has registration_date and status, or provide defaults if missing
        setEvents(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          data.map((event: any) => ({
            registration_date: event.registration_date ?? "",
            status: event.status ?? "",
            ...event,
          }))
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingEvents(false);
      }
    }
    loadEvents();
  }, []);

 useEffect(() => {
  if (selectedEventId === null) {
    setParticipants([]);
    return;
  }
  setLoadingParticipants(true);
getParticipants(selectedEventId)
  .then(data => {
    const normalized = data.map(p => ({
      ...p,
      name: p.participant_name,
      email: p.participant_email,
      reason: p.cancellation_reason,
    }));
    setParticipants(normalized);
  })
  .catch(console.error)
  .finally(() => setLoadingParticipants(false));
}, [selectedEventId]);


  async function handleCancel(registrationId: number, reason: string) {
    try {
      await cancelRegistration(registrationId, reason);
      if (selectedEventId) {
        const updated = await getParticipants(selectedEventId);
        setParticipants(updated);
      }
    } catch (error) {
      alert("Failed to cancel registration.");
      console.error(error);
    }
  }

  // Get current event details
  const currentEvent = events.find(event => event.id === selectedEventId);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Event Management Dashboard</h1>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 rounded-md bg-blue-100 p-3">
                <span className="text-blue-600 text-2xl">📋</span>
              </div>
              <div className="ml-5">
                <h2 className="text-xl font-semibold text-gray-900">Total Events</h2>
                <div className="mt-1 text-3xl font-bold text-gray-900">
                  {loadingEvents ? "..." : events.length}
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 rounded-md bg-green-100 p-3">
                <span className="text-green-600 text-2xl">👥</span>
              </div>
              <div className="ml-5">
                <h2 className="text-xl font-semibold text-gray-900">Total Participants</h2>
                <div className="mt-1 text-3xl font-bold text-gray-900">
                  {loadingParticipants ? "..." : participants.length}
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 rounded-md bg-purple-100 p-3">
                <span className="text-purple-600 text-2xl">🔍</span>
              </div>
              <div className="ml-5">
                <h2 className="text-xl font-semibold text-gray-900">Current View</h2>
                <div className="mt-1 text-lg font-medium text-gray-900 truncate">
                  {currentEvent ? currentEvent.name : "No event selected"}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Event Selector */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Select Event</h2>
          </div>
          <div className="px-6 py-4">
            <div className="max-w-lg">
              <select
                id="eventSelect"
                className="block w-full pl-3 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm"
                value={selectedEventId ?? ""}
                onChange={(e) => setSelectedEventId(Number(e.target.value) || null)}
              >
                <option value="">-- Select an Event --</option>
                {events.map((event) => (
                  <option key={event.id} value={event.id}>
                    {event.name} ({new Date(event.date).toLocaleDateString()})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Participants List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Participants</h2>
          </div>
          <div className="px-6 py-4">
            {loadingParticipants ? (
              <div className="py-12 flex justify-center">
                <div className="text-center">
                  <div className="animate-pulse flex space-x-4 justify-center">
                    <div className="rounded-full bg-gray-200 h-10 w-10"></div>
                    <div className="rounded-full bg-gray-200 h-10 w-10"></div>
                    <div className="rounded-full bg-gray-200 h-10 w-10"></div>
                  </div>
                  <p className="mt-4 text-gray-500">Loading participants...</p>
                </div>
              </div>
            ) : selectedEventId ? (
              participants.length > 0 ? (
                <ParticipantList participants={participants} onCancel={handleCancel} />
              ) : (
                <div className="py-12 text-center text-gray-500">
                  <p>No participants found for this event.</p>
                </div>
              )
            ) : (
              <div className="py-12 text-center text-gray-500">
                <p>Please select an event to view participants.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}