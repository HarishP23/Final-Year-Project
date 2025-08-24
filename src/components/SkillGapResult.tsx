import React from 'react';
import { CheckCircle, XCircle, Lightbulb } from 'lucide-react';
import { SkillGapAnalysis } from '@/lib/ai';

interface SkillGapResultProps {
  analysis: SkillGapAnalysis;
}

export default function SkillGapResult({ analysis }: SkillGapResultProps) {
  return (
    <div className="space-y-6">
      {/* Present Skills */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <div className="flex items-center mb-4">
          <CheckCircle className="w-6 h-6 text-green-600 mr-2" />
          <h3 className="text-lg font-semibold text-green-800">✅ Skills Present</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {analysis.presentSkills.map((skill, index) => (
            <div
              key={index}
              className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium"
            >
              {skill}
            </div>
          ))}
        </div>
      </div>

      {/* Missing Skills */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <div className="flex items-center mb-4">
          <XCircle className="w-6 h-6 text-red-600 mr-2" />
          <h3 className="text-lg font-semibold text-red-800">❌ Missing Skills</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {analysis.missingSkills.map((skill, index) => (
            <div
              key={index}
              className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium"
            >
              {skill}
            </div>
          ))}
        </div>
      </div>

      {/* Suggestions */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <div className="flex items-center mb-4">
          <Lightbulb className="w-6 h-6 text-yellow-600 mr-2" />
          <h3 className="text-lg font-semibold text-yellow-800">🔧 Suggestions</h3>
        </div>
        <ul className="space-y-2">
          {analysis.suggestions.map((suggestion, index) => (
            <li key={index} className="flex items-start">
              <span className="text-yellow-600 mr-2">•</span>
              <span className="text-yellow-800">{suggestion}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Action Button */}
      <div className="text-center">
        <a
          href="/generate"
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          Generate Learning Roadmap
        </a>
      </div>
    </div>
  );
} 