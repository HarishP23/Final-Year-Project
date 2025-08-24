'use client';

import { useEffect, useState } from 'react';
import { Calendar, CheckCircle, Flame, TrendingUp, Target, BookOpen } from 'lucide-react';
import { UserProgress, calculateProgress, updateStreak } from '@/lib/client-utils';
import { RoadmapData } from '@/lib/ai';

interface SavedRoadmap {
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

export default function DashboardPage() {
  const [savedRoadmap, setSavedRoadmap] = useState<SavedRoadmap | null>(null);
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const response = await fetch('/api/dashboard');
      if (response.ok) {
        const data = await response.json();
        setSavedRoadmap(data);
        setProgress(data.progress);
      } else {
        setError('No roadmap found. Please generate one first.');
      }
    } catch (err) {
      setError('Failed to load dashboard');
      console.error('Load dashboard error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarkComplete = async (type: 'skill' | 'habit' | 'task', item: string, week?: number) => {
    if (!progress || !savedRoadmap) return;

    let updatedProgress = { ...progress };

    switch (type) {
      case 'skill':
        if (!updatedProgress.completedSkills.includes(item)) {
          updatedProgress.completedSkills.push(item);
        }
        break;
      case 'habit':
        if (!updatedProgress.completedHabits.includes(item)) {
          updatedProgress.completedHabits.push(item);
        }
        break;
      case 'task':
        if (week !== undefined) {
          if (!updatedProgress.completedTasks[week]) {
            updatedProgress.completedTasks[week] = [];
          }
          if (!updatedProgress.completedTasks[week].includes(item)) {
            updatedProgress.completedTasks[week].push(item);
          }
        }
        break;
    }

    // Update streak
    updatedProgress = updateStreak(updatedProgress);
    updatedProgress.totalProgress = calculateProgress(savedRoadmap.roadmap, updatedProgress);

    setProgress(updatedProgress);

    // Save to backend
    try {
      await fetch('/api/dashboard/progress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProgress),
      });
    } catch (err) {
      console.error('Failed to save progress:', err);
    }
  };

  const isCompleted = (type: 'skill' | 'habit' | 'task', item: string, week?: number) => {
    if (!progress) return false;

    switch (type) {
      case 'skill':
        return progress.completedSkills.includes(item);
      case 'habit':
        return progress.completedHabits.includes(item);
      case 'task':
        return week !== undefined && progress.completedTasks[week]?.includes(item);
      default:
        return false;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error || !savedRoadmap) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No Dashboard Data</h2>
            <p className="text-gray-600 mb-6">{error || 'Please generate and save a roadmap first.'}</p>
            <a
              href="/generate"
              className="inline-flex items-center px-6 py-3 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 transition-colors duration-200"
            >
              Generate Roadmap
            </a>
          </div>
        </div>
      </div>
    );
  }

  const { roadmap } = savedRoadmap;
  const totalProgress = progress ? progress.totalProgress : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <TrendingUp className="w-8 h-8 text-orange-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">Learning Dashboard</h1>
            </div>
            <a href="/" className="text-orange-600 hover:text-orange-800 transition-colors">
              ← Back to Home
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Progress Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {/* Overall Progress */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Overall Progress</h3>
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{totalProgress}%</div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${totalProgress}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Streak */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Learning Streak</h3>
              <Flame className="w-6 h-6 text-orange-600" />
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">
                {progress?.streak || 0} days
              </div>
              <p className="text-sm text-gray-600">Keep it up!</p>
            </div>
          </div>

          {/* Skills Completed */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Skills Completed</h3>
              <Target className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {progress?.completedSkills.length || 0}/{roadmap.skillsToLearn.length}
              </div>
              <p className="text-sm text-gray-600">skills mastered</p>
            </div>
          </div>

          {/* Habits Built */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Habits Built</h3>
              <BookOpen className="w-6 h-6 text-purple-600" />
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {progress?.completedHabits.length || 0}/{roadmap.habits.length}
              </div>
              <p className="text-sm text-gray-600">habits formed</p>
            </div>
          </div>
        </div>

        {/* Skills Checklist */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">🧠 Skills to Learn</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {roadmap.skillsToLearn.map((skill, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
                  isCompleted('skill', skill)
                    ? 'bg-green-50 border-green-200'
                    : 'bg-gray-50 border-gray-200 hover:border-green-300'
                }`}
                onClick={() => handleMarkComplete('skill', skill)}
              >
                <div className="flex items-center justify-between">
                  <span className={`font-medium ${
                    isCompleted('skill', skill) ? 'text-green-800 line-through' : 'text-gray-700'
                  }`}>
                    {skill}
                  </span>
                  {isCompleted('skill', skill) && (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Habits Tracker */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">🌱 Habits to Build</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {roadmap.habits.map((habit, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
                  isCompleted('habit', habit)
                    ? 'bg-orange-50 border-orange-200'
                    : 'bg-gray-50 border-gray-200 hover:border-orange-300'
                }`}
                onClick={() => handleMarkComplete('habit', habit)}
              >
                <div className="flex items-center justify-between">
                  <span className={`font-medium ${
                    isCompleted('habit', habit) ? 'text-orange-800 line-through' : 'text-gray-700'
                  }`}>
                    {habit}
                  </span>
                  {isCompleted('habit', habit) && (
                    <CheckCircle className="w-5 h-5 text-orange-600" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline Tasks */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">📅 Weekly Tasks</h3>
          <div className="space-y-6">
            {roadmap.timeline.map((week, weekIndex) => (
              <div key={weekIndex} className="border-l-4 border-blue-500 pl-6">
                <div className="flex items-center mb-3">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    Week {week.week}
                  </span>
                  <h4 className="ml-3 text-lg font-semibold text-gray-900">{week.title}</h4>
                </div>
                <div className="space-y-2">
                  {week.tasks.map((task, taskIndex) => (
                    <div
                      key={taskIndex}
                      className={`p-3 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
                        isCompleted('task', task, week.week)
                          ? 'bg-blue-50 border-blue-200'
                          : 'bg-gray-50 border-gray-200 hover:border-blue-300'
                      }`}
                      onClick={() => handleMarkComplete('task', task, week.week)}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`${
                          isCompleted('task', task, week.week) ? 'text-blue-800 line-through' : 'text-gray-700'
                        }`}>
                          {task}
                        </span>
                        {isCompleted('task', task, week.week) && (
                          <CheckCircle className="w-5 h-5 text-blue-600" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
} 