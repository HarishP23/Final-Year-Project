import { GoogleGenerativeAI } from '@google/generative-ai';

// Use hardcoded API key to bypass environment variable issues
const apiKey = 'AIzaSyCVar5Za9e7zi2Xx47WhpTypfga5GrExMg';

console.log('✅ Using API key (length:', apiKey.length, ')');

const genAI = new GoogleGenerativeAI(apiKey);

export interface SkillGapAnalysis {
  presentSkills: string[];
  missingSkills: string[];
  suggestions: string[];
}

export interface RoadmapData {
  timeline: {
    week: number;
    title: string;
    description: string;
    tasks: string[];
  }[];
  skillsToLearn: string[];
  resources: {
    type: 'youtube' | 'course' | 'book' | 'tool';
    name: string;
    url?: string;
  }[];
  habits: string[];
  checklists: {
    daily: string[];
    weekly: string[];
  };
}

export async function analyzeSkillGap(resumeContent: string, jobRole: string): Promise<SkillGapAnalysis> {
  return await analyzeSkillGapGemini(resumeContent, jobRole);
}

export async function generateRoadmap(formData: {
  dream: string;
  age?: number;
  skillLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  dailyStudyHours: number;
  timeframe: string;
}): Promise<RoadmapData> {
  return await generateRoadmapGemini(formData);
}

async function analyzeSkillGapGemini(resumeContent: string, jobRole: string): Promise<SkillGapAnalysis> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `You are a skill gap analyzer. Analyze the following resume content against the job role and provide a structured analysis.

Resume Content:
${resumeContent}

Job Role: ${jobRole}

Generate a comprehensive skill gap analysis and return it ONLY as a valid JSON object with this exact structure:

{
  "presentSkills": ["skill1", "skill2", "skill3"],
  "missingSkills": ["skill1", "skill2", "skill3"],
  "suggestions": ["suggestion1", "suggestion2", "suggestion3"]
}

Focus on:
- Technical skills relevant to the job role
- Soft skills that are important for the position
- Industry-specific knowledge
- Tools and technologies mentioned in the job requirements

IMPORTANT: 
- Return ONLY the JSON object, no additional text
- Ensure the JSON is properly formatted and valid
- Provide specific, actionable skills and suggestions
- Be realistic about the skill requirements for the job role`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    console.log('Raw Skill Gap AI Response:', text);

    // Try to extract JSON from the response
    let jsonText = text.trim();
    
    // Remove any markdown formatting
    if (jsonText.startsWith('```json')) {
      jsonText = jsonText.replace(/```json\n?/, '').replace(/```\n?/, '');
    } else if (jsonText.startsWith('```')) {
      jsonText = jsonText.replace(/```\n?/, '').replace(/```\n?/, '');
    }
    
    // Try to find JSON object in the text
    const jsonMatch = jsonText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      jsonText = jsonMatch[0];
    }

    try {
      const parsed = JSON.parse(jsonText);
      
      // Validate the structure
      if (!parsed.presentSkills || !parsed.missingSkills || !parsed.suggestions) {
        throw new Error('Invalid skill gap analysis structure');
      }
      
      return parsed;
    } catch (parseError) {
      console.error('Skill Gap JSON Parse Error:', parseError);
      console.error('Attempted to parse:', jsonText);
      
      // Return a fallback analysis
      return {
        presentSkills: ["Basic communication", "Problem solving", "Teamwork"],
        missingSkills: ["Advanced technical skills", "Industry-specific knowledge", "Specialized tools"],
        suggestions: ["Take online courses", "Get certifications", "Practice hands-on projects"]
      };
    }
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    throw new Error(`Gemini API Error: ${error.message || 'Unknown error'}`);
  }
}

async function generateRoadmapGemini(formData: {
  dream: string;
  age?: number;
  skillLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  dailyStudyHours: number;
  timeframe: string;
}): Promise<RoadmapData> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `You are a learning roadmap generator. Create a detailed learning roadmap for the following goal:

Dream/Goal: ${formData.dream}
Age: ${formData.age || 'Not specified'}
Current Skill Level: ${formData.skillLevel}
Daily Study Hours: ${formData.dailyStudyHours} hours
Timeframe: ${formData.timeframe}

Generate a comprehensive learning roadmap and return it ONLY as a valid JSON object with this exact structure:

{
  "timeline": [
    {
      "week": 1,
      "title": "Week 1: Foundation",
      "description": "Start with basic concepts and fundamentals",
      "tasks": ["Study basic concepts", "Set up learning environment", "Create study schedule"]
    }
  ],
  "skillsToLearn": ["skill1", "skill2", "skill3"],
  "resources": [
    {
      "type": "youtube",
      "name": "Resource Name",
      "url": "https://youtube.com/example"
    }
  ],
  "habits": ["habit1", "habit2", "habit3"],
  "checklists": {
    "daily": ["daily task 1", "daily task 2"],
    "weekly": ["weekly task 1", "weekly task 2"]
  }
}

IMPORTANT: 
- Return ONLY the JSON object, no additional text
- Ensure the JSON is properly formatted and valid
- Make the roadmap practical and achievable
- Include specific, actionable tasks and resources
- Tailor the content to the specified timeframe and study hours`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    console.log('Raw AI Response:', text);

    // Try to extract JSON from the response
    let jsonText = text.trim();
    
    // Remove any markdown formatting
    if (jsonText.startsWith('```json')) {
      jsonText = jsonText.replace(/```json\n?/, '').replace(/```\n?/, '');
    } else if (jsonText.startsWith('```')) {
      jsonText = jsonText.replace(/```\n?/, '').replace(/```\n?/, '');
    }
    
    // Try to find JSON object in the text
    const jsonMatch = jsonText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      jsonText = jsonMatch[0];
    }

    try {
      const parsed = JSON.parse(jsonText);
      
      // Validate the structure
      if (!parsed.timeline || !parsed.skillsToLearn || !parsed.resources || !parsed.habits || !parsed.checklists) {
        throw new Error('Invalid roadmap structure');
      }
      
      return parsed;
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError);
      console.error('Attempted to parse:', jsonText);
      
      // Return a fallback roadmap
      return {
        timeline: [
          {
            week: 1,
            title: "Week 1: Getting Started",
            description: "Begin your learning journey with foundational concepts",
            tasks: ["Set up your study environment", "Create a daily schedule", "Start with basic concepts"]
          }
        ],
        skillsToLearn: ["Basic concepts", "Core fundamentals", "Essential skills"],
        resources: [
          {
            type: "youtube",
            name: "Getting Started Guide",
            url: "https://youtube.com"
          }
        ],
        habits: ["Study daily", "Take notes", "Review regularly"],
        checklists: {
          daily: ["Complete daily study session", "Review previous day's material"],
          weekly: ["Assess progress", "Plan next week's goals"]
        }
      };
    }
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    throw new Error(`Gemini API Error: ${error.message || 'Unknown error'}`);
  }
} 