import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.GEMINI_API_KEY;
  const aiProvider = process.env.AI_PROVIDER;
  
  // Get all environment variables that might be relevant
  const allEnvVars = Object.keys(process.env)
    .filter(key => key.includes('GEMINI') || key.includes('AI') || key.includes('NODE'))
    .reduce((acc, key) => {
      acc[key] = process.env[key];
      return acc;
    }, {} as Record<string, string | undefined>);
  
  return NextResponse.json({
    success: true,
    timestamp: new Date().toISOString(),
    environment: {
      apiKeyExists: !!apiKey,
      apiKeyLength: apiKey ? apiKey.length : 0,
      apiKeyPreview: apiKey ? apiKey.substring(0, 10) + '...' : 'None',
      aiProvider: aiProvider,
      nodeEnv: process.env.NODE_ENV,
    },
    allRelevantEnvVars: allEnvVars,
    debug: {
      processEnvKeys: Object.keys(process.env).length,
      geminiKeys: Object.keys(process.env).filter(key => key.includes('GEMINI')).length,
      aiKeys: Object.keys(process.env).filter(key => key.includes('AI')).length,
    }
  });
} 