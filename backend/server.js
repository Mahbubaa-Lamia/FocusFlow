import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import taskRoutes from './routes/taskRoutes.js';
import authRoutes from './routes/authRoutes.js'; // ইম্পোর্ট সব উপরে হবে

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Connect Database
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('🚀 FocusFlow Database (MongoDB) connected seamlessly.'))
  .catch((err) => console.error('❌ Database connection failure:', err.message));

// API Routes
app.use('/api/tasks', taskRoutes);
app.use('/api/auth', authRoutes); // রাউটস নিচে বসবে

// Base Health-Check Route
app.get('/', (req, res) => {
  res.json({ status: "active", message: "FocusFlow Core API Engine is running smoothly." });
});

app.listen(PORT, () => {
  console.log(`⚡ Server architecture deployment active on port ${PORT}`);
});