import express from 'express';
import {
  createEvent,
  getAllEvents,
  getEventById,
  deleteEventById,
  registerForEvent,
  getEventRegistrations
} from '../controllers/eventController';
import { cancelRegistrationController } from '../controllers/registrationController'; 

const router = express.Router();

// Event routes
router.post('/events', createEvent);
router.get('/events', getAllEvents);
router.get('/events/:id', getEventById);
router.delete('/events/:id', deleteEventById);

// Registration routes
router.post('/events/:id/register', registerForEvent);
router.get('/events/:id/registrations', getEventRegistrations);

// ✅ Added cancel endpoint and pointed to separate controller
router.put('/registrations/:registrationId/cancel', cancelRegistrationController);

export default router;
