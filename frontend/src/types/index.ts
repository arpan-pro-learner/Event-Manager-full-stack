export interface Participant {
  id: number;
  event_id: number;
  participant_name: string;
  participant_email: string;
  registration_date?: string;
  created_at?: string;
  status: 'active' | 'cancelled';
  cancellation_reason?: string | null;
}

export interface RegistrationCancelPayload {
  registrationId: number;
  reason: string;
}

export interface Event {
  date: string | number | Date;
  id: number;
  name: string;
  description?: string;
  registration_date: string;
  status: string;
  cancellation_reason?: string | null;
}
