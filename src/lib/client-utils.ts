import { type ClassValue, clsx } from 'clsx';
import { RoadmapData } from './ai';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export interface UserProgress {
  completedSkills: string[];
  completedHabits: string[];
  completedTasks: { [week: number]: string[] };
  streak: number;
  lastCompletedDate: string;
  totalProgress: number;
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