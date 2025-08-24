import { NextRequest, NextResponse } from 'next/server';
import { updateProgress } from '@/lib/utils';

export async function POST(request: NextRequest) {
  try {
    const progress = await request.json();
    
    await updateProgress(progress);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Update progress error:', error);
    return NextResponse.json(
      { error: 'Failed to update progress' },
      { status: 500 }
    );
  }
} 