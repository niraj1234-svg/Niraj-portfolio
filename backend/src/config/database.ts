import mongoose from 'mongoose';
import { ENV } from './env.js';
import { seedDatabase } from '../utils/seed.js';

let mongodInstance: any = null;

export async function connectDatabase(): Promise<string> {
  let uri = ENV.MONGODB_URI;

  if (uri) {
    try {
      console.log(`Connecting to MongoDB at: ${uri.replace(/\/\/[^:]+:[^@]+@/, '//***:***@')}`);
      await mongoose.connect(uri);
      console.log('MongoDB connection established successfully.');
      await seedDatabase();
      return uri;
    } catch (err) {
      console.warn('Configured MONGODB_URI connection failed:', (err as Error).message);
      if (ENV.NODE_ENV === 'production') {
        throw err;
      }
      console.log('Falling back to embedded in-memory MongoDB for local development...');
    }
  }

  // Local development embedded fallback using mongodb-memory-server
  try {
    console.log('Starting in-memory MongoDB server for local development...');
    const { MongoMemoryServer } = await import('mongodb-memory-server');
    mongodInstance = await MongoMemoryServer.create();
    uri = mongodInstance.getUri();
    await mongoose.connect(uri);
    console.log(`Embedded MongoDB started & connected at: ${uri}`);
    await seedDatabase(true);
    return uri;
  } catch (error) {
    console.error('Fatal error connecting to MongoDB:', error);
    throw error;
  }
}

export async function disconnectDatabase(): Promise<void> {
  await mongoose.disconnect();
  if (mongodInstance) {
    await mongodInstance.stop();
  }
}
