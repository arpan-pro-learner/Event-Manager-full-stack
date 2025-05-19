"use client";

import { useEffect, useState } from "react";
import EventCard from "./EventCard";

interface Event {
  id: number;
  name: string;
  description: string;
  date: string;
  location: string;
}

export default function EventList() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/events");
      const data = await res.json();
      setEvents(data);
    } catch (error) {
      console.error("Failed to fetch events:", error);
    } finally {
      setLoading(false);
    }
  };

const handleDelete = (id: number) => {
  setEvents(events.filter((event) => event.id !== id));
};


  useEffect(() => {
    fetchEvents();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading events...</p>;
  if (events.length === 0) return <p className="text-center mt-10">No events found.</p>;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 p-4">
      {events.map((event) => (
        <EventCard key={event.id} {...event} onDelete={handleDelete} />
      ))}
    </div>
  );
}
