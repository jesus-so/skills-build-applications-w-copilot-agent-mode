import mongoose from 'mongoose';

// Database connection configuration
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

export async function connectDatabase(): Promise<typeof mongoose> {
  return mongoose.connect(MONGODB_URI);
}

export { mongoose };
