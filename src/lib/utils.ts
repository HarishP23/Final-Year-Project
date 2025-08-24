import fs from 'fs/promises';
import path from 'path';
import { RoadmapData } from './ai';
import { UserProgress } from './client-utils';

// Ensure this only runs on server side
if (typeof window !== 'undefined') {
  throw new Error('This module can only be used on the server side');
}

const ROADMAP_FILE = path.join(process.cwd(), 'roadmaps', 'user_roadmap.json');



export interface SavedRoadmap {
  roadmap: RoadmapData;
  progress: UserProgress;
  createdAt: string;
  formData: {
    dream: string;
    age?: number;
    skillLevel: 'Beginner' | 'Intermediate' | 'Advanced';
    dailyStudyHours: number;
    timeframe: string;
  };
}

export async function saveRoadmap(roadmap: RoadmapData, formData: any): Promise<void> {
  try {
    // Ensure the roadmaps directory exists
    const roadmapsDir = path.dirname(ROADMAP_FILE);
    await fs.mkdir(roadmapsDir, { recursive: true });

    const savedRoadmap: SavedRoadmap = {
      roadmap,
      progress: {
        completedSkills: [],
        completedHabits: [],
        completedTasks: {},
        streak: 0,
        lastCompletedDate: '',
        totalProgress: 0,
      },
      createdAt: new Date().toISOString(),
      formData,
    };

    await fs.writeFile(ROADMAP_FILE, JSON.stringify(savedRoadmap, null, 2));
  } catch (error) {
    console.error('Error saving roadmap:', error);
    throw new Error('Failed to save roadmap');
  }
}

export async function loadRoadmap(): Promise<SavedRoadmap | null> {
  try {
    const data = await fs.readFile(ROADMAP_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // File doesn't exist or is invalid
    return null;
  }
}

export async function updateProgress(progress: UserProgress): Promise<void> {
  try {
    const savedRoadmap = await loadRoadmap();
    if (!savedRoadmap) {
      throw new Error('No roadmap found');
    }

    savedRoadmap.progress = progress;
    await fs.writeFile(ROADMAP_FILE, JSON.stringify(savedRoadmap, null, 2));
  } catch (error) {
    console.error('Error updating progress:', error);
    throw new Error('Failed to update progress');
  }
}

 