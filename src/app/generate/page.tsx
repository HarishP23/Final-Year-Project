'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BookOpen, Loader2, Target } from 'lucide-react';
import FormField from '@/components/FormField';
import ProfileIcon from '@/components/ProfileIcon';

export default function GeneratePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    dream: '',
    age: '',
    skillLevel: '',
    dailyStudyHours: '',
    timeframe: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const skillLevelOptions = [
    { value: 'Beginner', label: 'Beginner' },
    { value: 'Intermediate', label: 'Intermediate' },
    { value: 'Advanced', label: 'Advanced' },
  ];

  const timeframeOptions = [
    { value: '1 month', label: '1 Month' },
    { value: '3 months', label: '3 Months' },
    { value: '6 months', label: '6 Months' },
    { value: '1 year', label: '1 Year' },
  ];

  const dailyStudyHoursOptions = [
    { value: '1', label: '1 hour' },
    { value: '2', label: '2 hours' },
    { value: '3', label: '3 hours' },
    { value: '4', label: '4 hours' },
    { value: '5', label: '5 hours' },
    { value: '6', label: '6+ hours' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/roadmap', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          dream: formData.dream.trim(),
          age: formData.age ? parseInt(formData.age) : undefined,
          skillLevel: formData.skillLevel as 'Beginner' | 'Intermediate' | 'Advanced',
          dailyStudyHours: parseInt(formData.dailyStudyHours),
          timeframe: formData.timeframe,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('API Error Response:', errorData);
        throw new Error(errorData.details || errorData.error || 'Failed to generate roadmap');
      }

      // Redirect to roadmap page
      router.push('/roadmap');
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to generate roadmap. Please try again.';
      setError(errorMessage);
      console.error('Roadmap generation error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <BookOpen className="w-8 h-8 text-green-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">Generate Learning Roadmap</h1>
            </div>
            <div className="flex items-center gap-4">
              <a href="/" className="text-green-600 hover:text-green-800 transition-colors">
                ← Back to Home
              </a>
              <ProfileIcon />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Your Learning Roadmap</h2>
            <p className="text-gray-600">
              Tell us about your goals and we'll create a personalized learning plan
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Dream/Goal */}
            <FormField
              label="What is your dream?"
              name="dream"
              type="textarea"
              value={formData.dream}
              onChange={(value) => updateFormData('dream', value)}
              placeholder="Describe your career goal, dream job, or what you want to achieve..."
              required
            />

            {/* Age */}
            <FormField
              label="Age (optional)"
              name="age"
              type="number"
              value={formData.age}
              onChange={(value) => updateFormData('age', value)}
              placeholder="Your age"
            />

            {/* Skill Level */}
            <FormField
              label="Current Skill Level"
              name="skillLevel"
              type="select"
              value={formData.skillLevel}
              onChange={(value) => updateFormData('skillLevel', value)}
              options={skillLevelOptions}
              required
            />

            {/* Daily Study Hours */}
            <FormField
              label="Daily Study Hours"
              name="dailyStudyHours"
              type="select"
              value={formData.dailyStudyHours}
              onChange={(value) => updateFormData('dailyStudyHours', value)}
              options={dailyStudyHoursOptions}
              required
            />

            {/* Timeframe */}
            <FormField
              label="Timeframe"
              name="timeframe"
              type="select"
              value={formData.timeframe}
              onChange={(value) => updateFormData('timeframe', value)}
              options={timeframeOptions}
              required
            />

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-800">{error}</p>
              </div>
            )}

            <div className="text-center">
              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex items-center px-8 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    <span className="flex items-center">
                      Generating your roadmap
                      <span className="ml-1 animate-pulse">...</span>
                    </span>
                  </>
                ) : (
                  <>
                    <BookOpen className="w-5 h-5 mr-2" />
                    Generate My Roadmap
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Tips */}
          <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-green-900 mb-3">💡 Tips for Better Results</h3>
            <ul className="space-y-2 text-green-800">
              <li>• Be specific about your career goals and desired outcomes</li>
              <li>• Be realistic about your daily study time commitment</li>
              <li>• Choose a timeframe that matches your urgency and complexity</li>
              <li>• Consider your current skill level honestly</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
} 