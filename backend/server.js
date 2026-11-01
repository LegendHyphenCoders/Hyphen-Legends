import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { connectDB } from './config/db.js';
import admissionRoutes from './routes/admissionRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import leadRoutes from './routes/leadRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';
import { ensureExcelFileExists } from './utils/excelService.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize leads.xlsx if it does not exist yet
ensureExcelFileExists().catch((err) => console.error('Failed to initialize leads.xlsx:', err.message));

// Connect to MongoDB Atlas
await connectDB();

// CORS Configuration
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map((origin) => origin.trim())
  : ['http://localhost:3000', 'http://localhost:5173'];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, Postman)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1 || allowedOrigins.includes('*')) {
        return callback(null, true);
      }
      return callback(new Error(`CORS blocked request from origin: ${origin}`));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  res.status(200).json({
    status: 'ok',
    db: dbStatus,
    timestamp: new Date().toISOString(),
    uptime: `${Math.floor(process.uptime())}s`,
  });
});

// API Routes
app.use('/api/admissions', admissionRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/leads', leadRoutes);

// Undefined API route handler
app.use('/api/*', (req, res) => {
  res.status(404).json({
    error: 'Endpoint not found',
    details: [`Route ${req.method} ${req.originalUrl} does not exist.`],
  });
});

// Centralized Error Handler
app.use(errorHandler);

// Start HTTP Listener
app.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`🚀 HL Stack Backend listening on port: ${PORT}`);
  console.log(`🌐 Allowed Origins: ${allowedOrigins.join(', ')}`);
  console.log(`🩺 Health check: http://localhost:${PORT}/api/health`);
  console.log(`======================================================\n`);
});
