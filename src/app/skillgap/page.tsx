'use client';

import { useState } from 'react';
import { Upload, Target, Loader2 } from 'lucide-react';
import FormField from '@/components/FormField';
import SkillGapResult from '@/components/SkillGapResult';
import { SkillGapAnalysis } from '@/lib/ai';
import ProfileIcon from '@/components/ProfileIcon';

export default function SkillGapPage() {
  const [resumeContent, setResumeContent] = useState('');
  const [jobRole, setJobRole] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState<SkillGapAnalysis | null>(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/skillgap', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          resumeContent: resumeContent.trim(),
          jobRole: jobRole.trim(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Skill Gap API Error Response:', errorData);
        throw new Error(errorData.details || errorData.error || 'Failed to analyze skill gap');
      }

      const result = await response.json();
      setAnalysis(result);
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to analyze skill gap. Please try again.';
      setError(errorMessage);
      console.error('Skill gap analysis error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Target className="w-8 h-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">Skill Gap Analysis</h1>
            </div>
            <div className="flex items-center gap-4">
              <a href="/" className="text-blue-600 hover:text-blue-800 transition-colors">
                ← Back to Home
              </a>
              <ProfileIcon />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!analysis ? (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center mb-8">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Analyze Your Skill Gap</h2>
              <p className="text-gray-600">
                Upload your resume and specify your target job role to identify missing skills
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Resume Content */}
              <FormField
                label="Resume Content"
                name="resumeContent"
                type="textarea"
                value={resumeContent}
                onChange={setResumeContent}
                placeholder="Paste your resume content here or describe your current skills and experience..."
                required
              />

              {/* Job Role */}
              <FormField
                label="Target Job Role"
                name="jobRole"
                type="text"
                value={jobRole}
                onChange={setJobRole}
                placeholder="e.g., Senior Software Engineer, Data Scientist, Product Manager..."
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
                  className="inline-flex items-center px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Target className="w-5 h-5 mr-2" />
                      Analyze Gaps
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Tips */}
            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">💡 Tips for Better Analysis</h3>
              <ul className="space-y-2 text-blue-800">
                <li>• Include all relevant skills, technologies, and tools you've used</li>
                <li>• Mention your experience level with each skill</li>
                <li>• Include both technical and soft skills</li>
                <li>• Be specific about your target job role and industry</li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Back Button */}
            <div className="flex justify-between items-center">
              <button
                onClick={() => {
                  setAnalysis(null);
                  setResumeContent('');
                  setJobRole('');
                }}
                className="inline-flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                ← Back to Form
              </button>
            </div>

            {/* Analysis Results */}
            <SkillGapResult analysis={analysis} />
          </div>
        )}
      </main>
    </div>
  );
} 