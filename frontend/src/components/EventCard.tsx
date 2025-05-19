"use client";

import Link from "next/link";

interface EventCardProps {
  id: number;
  name: string;
  description: string;
  date: string;
  location: string;
  onDelete: (id: number) => void;
}

export default function EventCard({
  id,
  name,
  description,
  date,
  location,
  onDelete,
}: EventCardProps) {
  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this event?")) return;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/events/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        onDelete(id);
      } else {
        alert("Failed to delete event.");
      }
    } catch (err) {
      alert("Error deleting event.");
      console.error(err);
    }
  };

  // No need for additional date formatting

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-100">
      {/* Card Header with gradient background */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-400 p-4 text-white">
        <h3 className="font-bold text-xl truncate">{name}</h3>
      </div>

      {/* Card Content */}
      <div className="p-5">
        {/* Description */}
        <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>

        {/* Details section with icons */}
        <div className="space-y-2">
          <div className="flex items-center text-gray-700">
            <span className="mr-2">📅</span>
            <span className="text-sm">
              {new Date(date).toLocaleDateString()}
            </span>
          </div>

          <div className="flex items-center text-gray-700">
            <span className="mr-2">📍</span>
            <span className="text-sm truncate">{location}</span>
          </div>

          <div className="flex items-center text-gray-500 text-sm">
            <span>ID: {id}</span>
          </div>
        </div>
      </div>

      {/* Card Footer with action buttons */}

      <div className="px-5 py-3 bg-gray-50 flex justify-end gap-3">
        <Link
          href={`/events/${id}`}
          className="flex items-center px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-md hover:bg-indigo-100 transition-colors duration-200 text-sm font-medium"
        >
          <span className="mr-1">🔍</span>
          View Details
        </Link>

        <button
          onClick={handleDelete}
          className="flex items-center px-3 py-1.5 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors duration-200 text-sm font-medium"
        >
          <span className="mr-1">🗑️</span>
          Delete
        </button>
      </div>
    </div>
  );
}
