"use client";

import React, { useState } from "react";
import { Participant } from "../types";

interface ParticipantListProps {
  participants: Participant[];
  onCancel: (id: number, reason: string) => Promise<void>;
}

export default function ParticipantList({ participants, onCancel }: ParticipantListProps) {
  const [cancellingId, setCancellingId] = useState<number | null>(null);
  const [reason, setReason] = useState("");

  async function handleCancel(id: number) {
    if (!reason.trim()) {
      alert("Please provide a reason to cancel.");
      return;
    }
    await onCancel(id, reason);
    setCancellingId(null);
    setReason("");
  }

  return (
    <div className="space-y-4">
      {participants.length === 0 && <p>No participants registered.</p>}
      {participants.map((p) => (
        <div key={p.id} className="p-4 border rounded-md shadow-sm">
          <p><strong>Name:</strong> {p.participant_name}</p>
          <p><strong>Email:</strong> {p.participant_email}</p>
          <p><strong>Status:</strong> {p.status}</p>
          {p.status === "cancelled" && <p><strong>Reason:</strong> {p.cancellation_reason}</p>}
          {p.status === "active" && (
            <>
              {cancellingId === p.id ? (
                <>
                  <textarea
                    className="border p-2 w-full mt-2"
                    placeholder="Reason for cancellation"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    rows={3}
                  />
                  <button
                    onClick={() => handleCancel(p.id)}
                    className="mt-2 px-4 py-2 bg-red-600 text-white rounded"
                  >
                    Confirm Cancel
                  </button>
                  <button
                    onClick={() => {
                      setCancellingId(null);
                      setReason("");
                    }}
                    className="mt-2 ml-2 px-4 py-2 border rounded"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setCancellingId(p.id)}
                  className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
                >
                  Cancel Registration
                </button>
              )}
            </>
          )}
        </div>
      ))}
    </div>
  );
}
