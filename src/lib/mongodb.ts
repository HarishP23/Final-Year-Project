import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();
// Debug: Check environment variables
console.log('🔍 Environment Variables Check:', {
  MONGODB_URI: process.env.MONGODB_URI ? '✅ Set' : '❌ Not set',
  MONGODB_DB_NAME: process.env.MONGODB_DB_NAME ? '✅ Set' : '❌ Not set',
  MONGODB_URI_VALUE: process.env.MONGODB_URI ? process.env.MONGODB_URI.substring(0, 20) + '...' : 'Not set',
  MONGODB_DB_NAME_VALUE: process.env.MONGODB_DB_NAME || 'Not set'
});

// MongoDB connection configuration
const MONGODB_URI = process.env.MONGODB_URI || "No URI";
const MONGODB_DB = process.env.MONGODB_DB_NAME || 'finalYearProject';

// Validate environment variables
if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

if (!MONGODB_DB) {
  throw new Error('Please define the MONGODB_DB environment variable');
}

// Global variables for connection caching
let cachedClient: MongoClient | null = null;
let cachedDb: any = null;

export async function connectToDatabase() {
  // If we have cached connection, return it
  if (cachedClient && cachedDb) {
    console.log('✅ Using cached MongoDB connection');
    return { client: cachedClient, db: cachedDb };
  }

  try {
    console.log('🔄 Connecting to MongoDB...');
    
    // Create new connection
    const client = await MongoClient.connect(MONGODB_URI, {
      maxPoolSize: 10, // Maximum number of connections in the pool
      serverSelectionTimeoutMS: 5000, // Timeout for server selection
      socketTimeoutMS: 45000, // Timeout for socket operations
    });

    // Test the connection
    await client.db('admin').command({ ping: 1 });
    console.log('✅ MongoDB connected successfully!');
    console.log(`📊 Database: ${MONGODB_DB}`);
    console.log(`🔗 Connection string: ${MONGODB_URI.replace(/\/\/.*@/, '//***:***@')}`);

    // Get the database
    const db = client.db(MONGODB_DB);

    // Cache the connection
    cachedClient = client;
    cachedDb = db;

    return { client, db };
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    throw new Error(`Failed to connect to MongoDB: ${error}`);
  }
}

export async function closeConnection() {
  if (cachedClient) {
    await cachedClient.close();
    cachedClient = null;
    cachedDb = null;
    console.log('🔌 MongoDB connection closed');
  }
}

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Received SIGINT, closing MongoDB connection...');
  await closeConnection();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n🛑 Received SIGTERM, closing MongoDB connection...');
  await closeConnection();
  process.exit(0);
});
