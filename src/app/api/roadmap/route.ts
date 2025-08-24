import { NextRequest, NextResponse } from 'next/server';
import { generateRoadmap } from '@/lib/ai';
import { saveRoadmap, loadRoadmap } from '@/lib/utils';

export async function POST(request: NextRequest) {
  try {
    console.log('🚀 Roadmap API: Starting POST request');
    
    const formData = await request.json();
    console.log('📝 Roadmap API: Received form data:', formData);

    // Validate required fields
    const requiredFields = ['dream', 'skillLevel', 'dailyStudyHours', 'timeframe'];
    for (const field of requiredFields) {
      if (!formData[field]) {
        console.error('❌ Roadmap API: Missing required field:', field);
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    console.log('✅ Roadmap API: Form validation passed, calling generateRoadmap...');
    const roadmap = await generateRoadmap(formData);
    console.log('✅ Roadmap API: Roadmap generated successfully');

    // Save the roadmap to local storage
    console.log('💾 Roadmap API: Saving roadmap to local storage...');
    await saveRoadmap(roadmap, formData);
    console.log('✅ Roadmap API: Roadmap saved successfully');

    return NextResponse.json(roadmap);
  } catch (error: any) {
    console.error('❌ Roadmap API Error:', error);
    console.error('❌ Error message:', error.message);
    console.error('❌ Error stack:', error.stack);
    
    return NextResponse.json(
      { 
        error: 'Failed to generate roadmap',
        details: error.message,
        type: error.constructor.name
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    console.log('📖 Roadmap API: Starting GET request');
    const savedRoadmap = await loadRoadmap();
    
    if (!savedRoadmap) {
      console.log('❌ Roadmap API: No roadmap found');
      return NextResponse.json(
        { error: 'No roadmap found' },
        { status: 404 }
      );
    }

    console.log('✅ Roadmap API: Roadmap loaded successfully');
    return NextResponse.json(savedRoadmap.roadmap);
  } catch (error: any) {
    console.error('❌ Load roadmap error:', error);
    return NextResponse.json(
      { error: 'Failed to load roadmap' },
      { status: 500 }
    );
  }
} 