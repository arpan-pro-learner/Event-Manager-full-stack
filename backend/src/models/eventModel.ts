import pool from '../config/db';

// Define the Event type
export interface Event {
  id?: number;
  name: string;
  description: string;
  date: Date;
  location: string;
}

// Define the Registration type
export interface Registration {
  id?: number;
  event_id: number;
  participant_name: string;
  participant_email: string;
  registration_date?: Date;
  status?: string;
  cancellation_reason?: string;
}

// Create a new event
export const createEvent = async (event: Event) => {
  const { name, description, date, location } = event;
  
  const query = `
    INSERT INTO events (name, description, date, location)
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `;
  
  const values = [name, description, date, location];
  
  try {
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error('Error creating event:', error);
    throw error;
  }
};

// Get all events
export const getAllEvents = async () => {
  const query = 'SELECT * FROM events ORDER BY date ASC';
  
  try {
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

// Get event by ID
export const getEventById = async (id: number) => {
  const query = 'SELECT * FROM events WHERE id = $1';
  
  try {
    const result = await pool.query(query, [id]);
    return result.rows[0];
  } catch (error) {
    console.error(`Error fetching event with ID ${id}:`, error);
    throw error;
  }
};

// Delete event by ID
export const deleteEventById = async (id: number) => {
  const query = 'DELETE FROM events WHERE id = $1 RETURNING *';
  
  try {
    const result = await pool.query(query, [id]);
    return result.rows[0];
  } catch (error) {
    console.error(`Error deleting event with ID ${id}:`, error);
    throw error;
  }
};

// Register for an event
export const registerForEvent = async (registration: Registration) => {
  const { event_id, participant_name, participant_email } = registration;
  
  const query = `
    INSERT INTO registrations (event_id, participant_name, participant_email)
    VALUES ($1, $2, $3)
    RETURNING *
  `;
  
  const values = [event_id, participant_name, participant_email];
  
  try {
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error('Error registering for event:', error);
    throw error;
  }
};

// Get all registrations for an event
export const getEventRegistrations = async (eventId: number) => {
  const query = 'SELECT * FROM registrations WHERE event_id = $1';
  
  try {
    const result = await pool.query(query, [eventId]);
    return result.rows;
  } catch (error) {
    console.error(`Error fetching registrations for event ID ${eventId}:`, error);
    throw error;
  }
};

// Cancel a registration
export const cancelRegistration = async (registrationId: number, reason: string) => {
  const query = `
    UPDATE registrations
    SET status = 'cancelled', cancellation_reason = $1
    WHERE id = $2
    RETURNING *
  `;
  
  try {
    const result = await pool.query(query, [reason, registrationId]);
    return result.rows[0];
  } catch (error) {
    console.error(`Error cancelling registration with ID ${registrationId}:`, error);
    throw error;
  }
};