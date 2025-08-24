import { NextResponse } from 'next/server';
import { loadRoadmap } from '@/lib/utils';

export async function GET() {
  try {
    const savedRoadmap = await loadRoadmap();
    
    if (!savedRoadmap) {
      return NextResponse.json(
        { error: 'No roadmap found' },
        { status: 404 }
      );
    }

    return NextResponse.json(savedRoadmap);
  } catch (error) {
    console.error('Load dashboard error:', error);
    return NextResponse.json(
      { error: 'Failed to load dashboard' },
      { status: 500 }
    );
  }
} 