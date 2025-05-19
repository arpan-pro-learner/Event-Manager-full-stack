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



// Allow CORS from localhost:3000
app.use(cors({
  origin: 'https://event-manager-full-stack.vercel.app/', // 👈 Use your actual frontend domain
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
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
