import { Participant } from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

export interface Event {
  id: number;
  name: string;
  description?: string;
  date: string;
  location?: string;
}

// Fetch all events
export async function getAllEvents(): Promise<Event[]> {
  const res = await fetch(`${API_BASE_URL}/api/events`);
  if (!res.ok) throw new Error("Failed to fetch events");
  return res.json();
}

// Fetch participants for a given event ID
export async function getParticipants(eventId: number): Promise<Participant[]> {
  const res = await fetch(`${API_BASE_URL}/api/events/${eventId}/registrations`);
  if (!res.ok) throw new Error("Failed to fetch participants");
  return res.json();
}

// Cancel a registration with reason
export async function cancelRegistration(registrationId: number, reason: string) {
  const res = await fetch(`${API_BASE_URL}/api/registrations/${registrationId}/cancel`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ reason }),
  });
  if (!res.ok) throw new Error("Failed to cancel registration");
  return res.json();
}

// Fetch event by ID
export async function getEventById(id: number) {
  const res = await fetch(`${API_BASE_URL}/api/events/${id}`);
  if (!res.ok) throw new Error("Failed to fetch event details");
  return res.json();
}


