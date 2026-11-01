import mongoose from 'mongoose';

/**
 * Connect to MongoDB Atlas.
 * Validates MONGODB_URI and handles connection events and errors cleanly.
 */
export async function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.error('CRITICAL ERROR: MONGODB_URI is not defined in environment variables.');
    console.error('Please configure MONGODB_URI in backend/.env before starting the server.');
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log(`MongoDB Atlas connected: ${conn.connection.host} [database: ${conn.connection.name}]`);
  } catch (error) {
    console.error(`MongoDB connection warning: ${error.message}`);
    console.warn('⚠️ Server will operate in resilient mode. Submissions will record to leads.xlsx.');
  }

  mongoose.connection.on('disconnected', () => {
    console.warn('MongoDB disconnected. Attempting reconnection...');
  });

  mongoose.connection.on('error', (err) => {
    console.error('MongoDB runtime connection error:', err.message);
  });
}
