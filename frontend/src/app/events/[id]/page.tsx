// app/events/[id]/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ApplyForm from "@/components/ApplyForm";

interface Event {
  id: number;
  name: string;
  description: string;
  date: string;
  location: string;
}

export default function EventDetailPage() {
  const { id } = useParams();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchEvent = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/events/${id}`);
        const data = await res.json();
        setEvent(data);
      } catch (error) {
        console.error("Failed to fetch event:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-64 bg-gray-200 rounded-md mb-4"></div>
          <div className="h-4 w-48 bg-gray-200 rounded-md mb-2"></div>
          <div className="h-4 w-32 bg-gray-200 rounded-md"></div>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">Event Not Found</h2>
          <p className="text-gray-500">The event you&apos;re looking for doesn&apos;t exist or has been removed.</p>
        </div>
      </div>
    );
  }

  // Format date to be more readable
  const formattedDate = new Date(event.date).toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero section with gradient background */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-12 mb-8">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold font-serif mb-2">{event.name}</h1>
          <div className="flex flex-wrap items-center text-sm md:text-base opacity-90">
            <div className="flex items-center mr-6 mb-2">
              <span className="mr-2">📅</span>
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center mb-2">
              <span className="mr-2">📍</span>
              <span>{event.location}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 pb-16">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
          <div className="p-6 md:p-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">About This Event</h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {event.description}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-6 md:p-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Register for This Event</h2>
            <ApplyForm eventId={Number(id)} />
          </div>
        </div>
      </div>
    </div>
  );
}