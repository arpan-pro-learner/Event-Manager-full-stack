"use client";
import { useState } from "react";

export default function ApplyForm({ eventId }: { eventId: number }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

 const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/events/${eventId}/register`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    participant_name: name,
    participant_email: email,
  }),
});


    if (res.ok) {
      setStatus("Applied successfully!");
      setName("");
      setEmail("");
      setMessage("");
    } else {
      setStatus("Failed to apply.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-700">
        Apply to this Event
      </h2>

      <input
        className="w-full border rounded p-2"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        className="w-full border rounded p-2"
        placeholder="Your Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <textarea
        className="w-full border rounded p-2"
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={3}
      />
      <button
        type="submit"
        className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
      >
        Submit
      </button>

      {status && <p className="text-sm text-green-600">{status}</p>}
    </form>
  );
}
