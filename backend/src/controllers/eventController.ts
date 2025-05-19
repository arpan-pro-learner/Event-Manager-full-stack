import { Request, Response } from 'express';
import * as EventModel from '../models/eventModel';

// Create a new event
export const createEvent = async (req: Request, res: Response) => {
  try {
    const { name, description, date, location } = req.body;
    
    // Validate required fields
    if (!name || !date) {
      return res.status(400).json({ error: 'Event name and date are required' });
    }
    
    const newEvent = await EventModel.createEvent({
      name: name || '',
      description: description || '',
      date: new Date(date),
      location: location || ''
    });
    
    return res.status(201).json(newEvent);
  } catch (error) {
    console.error('Error in createEvent controller:', error);
    return res.status(500).json({ error: 'Failed to create event' });
  }
};

// Get all events
export const getAllEvents = async (_req: Request, res: Response) => {
  try {
    const events = await EventModel.getAllEvents();
    return res.status(200).json(events);
  } catch (error) {
    console.error('Error in getAllEvents controller:', error);
    return res.status(500).json({ error: 'Failed to fetch events' });
  }
};

// Get event by ID
export const getEventById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid event ID' });
    }
    
    const event = await EventModel.getEventById(id);
    
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    
    return res.status(200).json(event);
  } catch (error) {
    console.error('Error in getEventById controller:', error);
    return res.status(500).json({ error: 'Failed to fetch event' });
  }
};

// Delete event by ID
export const deleteEventById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid event ID' });
    }
    
    const deletedEvent = await EventModel.deleteEventById(id);
    
    if (!deletedEvent) {
      return res.status(404).json({ error: 'Event not found' });
    }
    
    return res.status(200).json({ message: 'Event deleted successfully', event: deletedEvent });
  } catch (error) {
    console.error('Error in deleteEventById controller:', error);
    return res.status(500).json({ error: 'Failed to delete event' });
  }
};

// Register for an event
export const registerForEvent = async (req: Request, res: Response) => {
  try {
    const eventId = parseInt(req.params.id);
    const { participant_name, participant_email } = req.body;
    
    if (isNaN(eventId)) {
      return res.status(400).json({ error: 'Invalid event ID' });
    }
    
    // Check if event exists
    const event = await EventModel.getEventById(eventId);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    
    // Validate required fields
    if (!participant_name || !participant_email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }
    
    const registration = await EventModel.registerForEvent({
      event_id: eventId,
      participant_name,
      participant_email
    });
    
    return res.status(201).json(registration);
  } catch (error) {
    console.error('Error in registerForEvent controller:', error);
    return res.status(500).json({ error: 'Failed to register for event' });
  }
};

// Get registrations for an event
export const getEventRegistrations = async (req: Request, res: Response) => {
  try {
    const eventId = parseInt(req.params.id);
    
    if (isNaN(eventId)) {
      return res.status(400).json({ error: 'Invalid event ID' });
    }
    
    // Check if event exists
    const event = await EventModel.getEventById(eventId);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    
    const registrations = await EventModel.getEventRegistrations(eventId);
    return res.status(200).json(registrations);
  } catch (error) {
    console.error('Error in getEventRegistrations controller:', error);
    return res.status(500).json({ error: 'Failed to fetch event registrations' });
  }
};

// Cancel a registration
export const cancelRegistration = async (req: Request, res: Response) => {
  try {
    const registrationId = parseInt(req.params.registrationId);
    const { reason } = req.body;
    
    if (isNaN(registrationId)) {
      return res.status(400).json({ error: 'Invalid registration ID' });
    }
    
    if (!reason) {
      return res.status(400).json({ error: 'Cancellation reason is required' });
    }
    
    const cancelledRegistration = await EventModel.cancelRegistration(registrationId, reason);
    
    if (!cancelledRegistration) {
      return res.status(404).json({ error: 'Registration not found' });
    }
    
    return res.status(200).json({ 
      message: 'Registration cancelled successfully', 
      registration: cancelledRegistration 
    });
  } catch (error) {
    console.error('Error in cancelRegistration controller:', error);
    return res.status(500).json({ error: 'Failed to cancel registration' });
  }
};
