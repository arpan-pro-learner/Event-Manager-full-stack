"use client";
import { useEffect, useState } from "react";
import ApplyForm from "./ApplyForm";

interface Event {
  id: number;
  name: string;
  description: string;
  date: string;
  location: string;
}

export default function EventDetails({ eventId }: { eventId: string }) {
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`http://localhost:5000/events/${eventId}`);
        const data = await res.json();
        setEvent(data);
      } catch (err) {
        console.error("Failed to fetch event details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  if (loading) return <p>Loading...</p>;
  if (!event) return <p>Event not found.</p>;

  return (
    <div className="card space-y-4">
      <h1 className="text-2xl font-bold text-indigo-700">{event.name}</h1>
      <p>{event.description}</p>
      <p><strong>Location:</strong> {event.location}</p>
      <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>

      <ApplyForm eventId={event.id} />
    </div>
  );
}
