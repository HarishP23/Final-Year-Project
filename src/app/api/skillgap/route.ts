import { NextRequest, NextResponse } from 'next/server';
import { analyzeSkillGap } from '@/lib/ai';

export async function POST(request: NextRequest) {
  try {
    console.log('🔍 Skill Gap API: Starting POST request');
    
    const { resumeContent, jobRole } = await request.json();
    console.log('📝 Skill Gap API: Received data:', { resumeContent: resumeContent?.substring(0, 100) + '...', jobRole });

    if (!resumeContent || !jobRole) {
      console.error('❌ Skill Gap API: Missing required fields');
      return NextResponse.json(
        { error: 'Resume content and job role are required' },
        { status: 400 }
      );
    }

    console.log('✅ Skill Gap API: Validation passed, calling analyzeSkillGap...');
    const analysis = await analyzeSkillGap(resumeContent, jobRole);
    console.log('✅ Skill Gap API: Analysis completed successfully');

    return NextResponse.json(analysis);
  } catch (error: any) {
    console.error('❌ Skill Gap API Error:', error);
    console.error('❌ Error message:', error.message);
    console.error('❌ Error stack:', error.stack);
    
    return NextResponse.json(
      { 
        error: 'Failed to analyze skill gap',
        details: error.message,
        type: error.constructor.name
      },
      { status: 500 }
    );
  }
} 