import fs from 'fs/promises';
import path from 'path';
import { RoadmapData } from './ai';

// Ensure this only runs on server side
if (typeof window !== 'undefined') {
  throw new Error('This module can only be used on the server side');
}

const ROADMAP_FILE = path.join(process.cwd(), 'roadmaps', 'user_roadmap.json');

export interface UserProgress {
  completedSkills: string[];
  completedHabits: string[];
  completedTasks: { [week: number]: string[] };
  streak: number;
  lastCompletedDate: string;
  totalProgress: number;
}

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

export function calculateProgress(roadmap: RoadmapData, progress: UserProgress): number {
  const totalSkills = roadmap.skillsToLearn.length;
  const totalHabits = roadmap.habits.length;
  const totalTasks = roadmap.timeline.reduce((acc, week) => acc + week.tasks.length, 0);

  const completedSkills = progress.completedSkills.length;
  const completedHabits = progress.completedHabits.length;
  const completedTasks = Object.values(progress.completedTasks).reduce((acc, tasks) => acc + tasks.length, 0);

  const totalItems = totalSkills + totalHabits + totalTasks;
  const completedItems = completedSkills + completedHabits + completedTasks;

  return totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;
}

export function updateStreak(progress: UserProgress): UserProgress {
  const today = new Date().toISOString().split('T')[0];
  const lastDate = progress.lastCompletedDate;

  if (lastDate === today) {
    // Already completed today
    return progress;
  }

  if (lastDate && isConsecutiveDay(lastDate, today)) {
    // Consecutive day
    return {
      ...progress,
      streak: progress.streak + 1,
      lastCompletedDate: today,
    };
  } else {
    // New streak or break in streak
    return {
      ...progress,
      streak: 1,
      lastCompletedDate: today,
    };
  }
}

function isConsecutiveDay(lastDate: string, today: string): boolean {
  const last = new Date(lastDate);
  const current = new Date(today);
  const diffTime = current.getTime() - last.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays === 1;
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
} 