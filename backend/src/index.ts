import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import eventRoutes from './routes/eventRoutes';

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  // origin: 'http://localhost:3000', // Update with your frontend URL
  origin: 'https://event-manager-backend-qqs5.onrender.com', // Update with your frontend URL
  methods: ['GET', 'POST', 'DELETE', 'PUT'],
  credentials: true, 
}));

app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', eventRoutes);

// Root route
app.get('/', (_req, res) => {
  res.send('Event Manager API is running');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
