import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET() {
  try {
    console.log('🧪 Testing MongoDB connection...');
    
    // Attempt to connect to MongoDB
    const { client, db } = await connectToDatabase();
    
    // Test a simple database operation
    const collections = await db.listCollections().toArray();
    
    console.log('✅ MongoDB test successful!');
    console.log(`📚 Available collections: ${collections.map(c => c.name).join(', ') || 'None yet'}`);
    
    return NextResponse.json({
      success: true,
      message: 'MongoDB connected successfully!',
      database: db.databaseName,
      collections: collections.map(c => c.name),
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('❌ MongoDB test failed:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Failed to connect to MongoDB',
      details: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
