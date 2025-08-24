import React from 'react';
import { Calendar, BookOpen, Target, Youtube, Book, Wrench, CheckCircle } from 'lucide-react';
import { RoadmapData } from '@/lib/ai';

interface RoadmapDisplayProps {
  roadmap: RoadmapData;
}

export default function RoadmapDisplay({ roadmap }: RoadmapDisplayProps) {
  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'youtube':
        return <Youtube className="w-4 h-4 text-red-600" />;
      case 'course':
        return <BookOpen className="w-4 h-4 text-blue-600" />;
      case 'book':
        return <Book className="w-4 h-4 text-green-600" />;
      case 'tool':
        return <Wrench className="w-4 h-4 text-purple-600" />;
      default:
        return <BookOpen className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Timeline */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-6">
          <Calendar className="w-6 h-6 text-blue-600 mr-2" />
          <h2 className="text-2xl font-bold text-gray-900">📆 Timeline Breakdown</h2>
        </div>
        <div className="space-y-6">
          {roadmap.timeline.map((week, index) => (
            <div key={index} className="border-l-4 border-blue-500 pl-6">
              <div className="flex items-center mb-2">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  Week {week.week}
                </span>
                <h3 className="ml-3 text-lg font-semibold text-gray-900">{week.title}</h3>
              </div>
              <p className="text-gray-600 mb-3">{week.description}</p>
              <ul className="space-y-1">
                {week.tasks.map((task, taskIndex) => (
                  <li key={taskIndex} className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{task}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Skills to Learn */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-6">
          <Target className="w-6 h-6 text-green-600 mr-2" />
          <h2 className="text-2xl font-bold text-gray-900">🧠 Skills to Learn</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {roadmap.skillsToLearn.map((skill, index) => (
            <div
              key={index}
              className="bg-green-50 border border-green-200 rounded-lg p-4 hover:bg-green-100 transition-colors duration-200"
            >
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                <span className="font-medium text-green-800">{skill}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Resources */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-6">
          <BookOpen className="w-6 h-6 text-purple-600 mr-2" />
          <h2 className="text-2xl font-bold text-gray-900">🎥 Resources</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {roadmap.resources.map((resource, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-center mb-2">
                {getResourceIcon(resource.type)}
                <span className="ml-2 text-sm font-medium text-gray-600 capitalize">
                  {resource.type}
                </span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">{resource.name}</h4>
              {resource.url && (
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 text-sm underline"
                >
                  View Resource
                </a>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Habits */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-6">
          <Target className="w-6 h-6 text-orange-600 mr-2" />
          <h2 className="text-2xl font-bold text-gray-900">🌱 Habits to Build</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {roadmap.habits.map((habit, index) => (
            <div
              key={index}
              className="bg-orange-50 border border-orange-200 rounded-lg p-4 hover:bg-orange-100 transition-colors duration-200"
            >
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-orange-600 mr-2" />
                <span className="text-orange-800">{habit}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Checklists */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Daily Checklist */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">📋 Daily Checklist</h3>
          <ul className="space-y-2">
            {roadmap.checklists.daily.map((task, index) => (
              <li key={index} className="flex items-center">
                <div className="w-4 h-4 border-2 border-gray-300 rounded mr-3"></div>
                <span className="text-gray-700">{task}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Weekly Checklist */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">📋 Weekly Checklist</h3>
          <ul className="space-y-2">
            {roadmap.checklists.weekly.map((task, index) => (
              <li key={index} className="flex items-center">
                <div className="w-4 h-4 border-2 border-gray-300 rounded mr-3"></div>
                <span className="text-gray-700">{task}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
} 