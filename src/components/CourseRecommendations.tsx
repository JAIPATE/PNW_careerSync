
import React from 'react';
import { CourseRecommendation } from '../types';

interface CourseRecommendationsProps {
  recommendations: CourseRecommendation[];
}

const CourseRecommendations: React.FC<CourseRecommendationsProps> = ({ recommendations }) => {
  if (recommendations.length === 0) return null;

  return (
    <div className="mt-4 bg-gray-900/80 border border-amber-500/30 rounded-lg p-4 animate-fade-in">
      <div className="flex items-center gap-2 mb-3">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2 .712V17a1 1 0 001 1z" />
        </svg>
        <h4 className="text-sm font-bold text-amber-300 uppercase tracking-wider">PNW Academic Bridge</h4>
      </div>
      <p className="text-xs text-gray-400 mb-4">
        Based on your missing skills, we recommend the following Purdue Northwest courses to bridge the gap:
      </p>
      
      <div className="space-y-4">
        {recommendations.map((rec, index) => (
          <div key={index} className="border-l-2 border-gray-700 pl-3 ml-1">
            <p className="text-xs font-semibold text-red-300 mb-1">To learn: <span className="text-red-200">{rec.skill}</span></p>
            <div className="flex flex-col gap-2">
              {rec.courses.map(course => (
                <div key={course.code} className="bg-gray-800 p-2 rounded border border-gray-700 hover:border-amber-500/50 transition-colors">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-white">{course.code}</span>
                    <span className="text-[10px] px-1.5 py-0.5 bg-amber-900/30 text-amber-400 rounded border border-amber-500/20">Recommended</span>
                  </div>
                  <div className="text-xs text-gray-300 font-medium mt-1">{course.title}</div>
                  <div className="text-[10px] text-gray-500 mt-0.5 line-clamp-2">{course.description}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseRecommendations;
