import { Request, Response } from 'express';
import { cancelRegistration } from '../models/eventModel';

export const cancelRegistrationController = async (req: Request, res: Response) => {
  const registrationId = parseInt(req.params.registrationId);
  const { reason } = req.body;

  if (!reason || !reason.trim()) {
    return res.status(400).json({ error: 'Cancellation reason is required' });
  }

  try {
    const cancelled = await cancelRegistration(registrationId, reason);
    if (!cancelled) {
      return res.status(404).json({ error: 'Registration not found' });
    }
    return res.json(cancelled);
  } catch (error) {
    console.error('Error cancelling registration:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
