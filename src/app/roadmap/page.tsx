'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, RotateCcw, Edit, Save } from 'lucide-react';
import RoadmapDisplay from '@/components/RoadmapDisplay';
import { RoadmapData } from '@/lib/ai';

interface SavedRoadmap {
  roadmap: RoadmapData;
  progress: {
    completedSkills: string[];
    completedHabits: string[];
    completedTasks: { [week: number]: string[] };
    streak: number;
    lastCompletedDate: string;
    totalProgress: number;
  };
  createdAt: string;
  formData: {
    dream: string;
    age?: number;
    skillLevel: 'Beginner' | 'Intermediate' | 'Advanced';
    dailyStudyHours: number;
    timeframe: string;
  };
}

export default function RoadmapPage() {
  const router = useRouter();
  const [roadmap, setRoadmap] = useState<RoadmapData | null>(null);
  const [savedRoadmap, setSavedRoadmap] = useState<SavedRoadmap | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadRoadmap();
  }, []);

  const loadRoadmap = async () => {
    try {
      const response = await fetch('/api/roadmap');
      if (response.ok) {
        const data = await response.json();
        setRoadmap(data);
        setSavedRoadmap(data);
      } else {
        setError('No roadmap found. Please generate one first.');
      }
    } catch (err) {
      setError('Failed to load roadmap');
      console.error('Load roadmap error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveToDashboard = async () => {
    // The roadmap is already saved when generated, just redirect to dashboard
    setIsSaving(true);
    try {
      // Check if roadmap exists in dashboard
      const response = await fetch('/api/dashboard');
      if (response.ok) {
        router.push('/dashboard');
      } else {
        setError('No roadmap found in dashboard. Please generate one first.');
      }
    } catch (err) {
      setError('Failed to access dashboard');
      console.error('Dashboard access error:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleRegenerate = () => {
    router.push('/generate');
  };

  const handleModifyGoal = () => {
    if (savedRoadmap?.formData) {
      // Pre-fill the form with existing data
      router.push('/generate');
    } else {
      router.push('/generate');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your roadmap...</p>
        </div>
      </div>
    );
  }

  if (error || !roadmap) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No Roadmap Found</h2>
            <p className="text-gray-600 mb-6">{error || 'Please generate a roadmap first.'}</p>
            <button
              onClick={() => router.push('/generate')}
              className="inline-flex items-center px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors duration-200"
            >
              Generate Roadmap
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <CheckCircle className="w-8 h-8 text-purple-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">Your Learning Roadmap</h1>
            </div>
            <a href="/" className="text-purple-600 hover:text-purple-800 transition-colors">
              ← Back to Home
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Action Buttons */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleSaveToDashboard}
              disabled={isSaving}
              className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors duration-200"
            >
              <Save className="w-5 h-5 mr-2" />
              {isSaving ? 'Saving...' : '✅ Save to Dashboard'}
            </button>
            
            <button
              onClick={handleRegenerate}
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              ♻️ Regenerate Plan
            </button>
            
            <button
              onClick={handleModifyGoal}
              className="inline-flex items-center px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors duration-200"
            >
              <Edit className="w-5 h-5 mr-2" />
              ✏️ Modify Goal
            </button>
          </div>
        </div>

        {/* Roadmap Content */}
        <RoadmapDisplay roadmap={roadmap} />

        {/* Additional Actions */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Next Steps</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">📅 Start Today</h4>
              <p className="text-blue-700 text-sm">Begin with the first week's tasks</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-2">📊 Track Progress</h4>
              <p className="text-green-700 text-sm">Monitor your learning journey</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <h4 className="font-semibold text-purple-900 mb-2">🎯 Stay Focused</h4>
              <p className="text-purple-700 text-sm">Follow the daily checklists</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 