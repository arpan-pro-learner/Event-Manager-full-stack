-- Create database
CREATE DATABASE event_manager;

-- Connect to the database
\c event_manager;

-- Create events table
CREATE TABLE events (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  location TEXT
);

-- Create registrations table
CREATE TABLE registrations (
  id SERIAL PRIMARY KEY,
  event_id INTEGER REFERENCES events(id) ON DELETE CASCADE,
  participant_name TEXT NOT NULL,
  participant_email TEXT NOT NULL,
  registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status TEXT DEFAULT 'active', -- 'active' or 'cancelled'
  cancellation_reason TEXT
);

-- Insert sample data (optional)
INSERT INTO events (name, description, date, location)
VALUES 
  ('Tech Conference 2025', 'Annual technology conference', '2025-09-15', 'Convention Center'),
  ('Web Development Workshop', 'Learn the latest in web development', '2025-06-10', 'Tech Hub'),
  ('Startup Meetup', 'Networking event for startups', '2025-07-25', 'Innovation Center');