
import React from 'react';
import { CourseRecommendation } from '../types';

interface CourseRecommendationsProps {
  recommendations: CourseRecommendation[];
}

const CourseRecommendations: React.FC<CourseRecommendationsProps> = ({ recommendations }) => {
  // Even if no recommendations, we show the widget with a general message for the demo
  const hasRecommendations = recommendations.length > 0;

  return (
    <div className="mt-6 pt-4 border-t border-gray-700/50">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-amber-500/20 overflow-hidden shadow-sm">
        {/* Header */}
        <div className="px-4 py-3 bg-amber-500/10 border-b border-amber-500/20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🎓</span>
            <h4 className="text-sm font-bold text-amber-300 uppercase tracking-widest">PNW Academic Bridge</h4>
          </div>
          <span className="text-[10px] bg-amber-900/60 text-amber-200 px-2 py-0.5 rounded-full border border-amber-500/30 font-medium">
            Skill Gap Analysis
          </span>
        </div>
        
        {/* Content */}
        <div className="p-4">
          {hasRecommendations ? (
            <>
              <p className="text-xs text-gray-400 mb-5 leading-relaxed">
                We identified specific skills in this job description that are missing from your resume. 
                Here are <strong>Purdue Northwest</strong> courses recommended to help you bridge that gap:
              </p>
              
              <div className="space-y-6">
                {recommendations.map((rec, index) => (
                  <div key={`${rec.skill}-${index}`} className="group">
                    {/* Skill Header */}
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.5)]"></div>
                        <p className="text-xs font-bold text-gray-300 uppercase tracking-wide">
                            To learn: <span className="text-white border-b border-red-400/30 pb-0.5">{rec.skill}</span>
                        </p>
                    </div>
                    
                    {/* Course List */}
                    <div className="grid gap-3 pl-3 border-l-[1.5px] border-gray-700 group-hover:border-amber-500/30 transition-colors duration-300 ml-0.5">
                      {rec.courses.map(course => (
                        <div key={course.code} className="bg-gray-800/40 hover:bg-gray-800 p-3 rounded-md border border-gray-700/50 hover:border-amber-500/30 transition-all duration-200 relative group/card">
                          <div className="flex justify-between items-start mb-1">
                            <span className="text-xs font-extrabold text-amber-400 font-mono tracking-tight">{course.code}</span>
                          </div>
                          <div className="text-sm text-gray-200 font-semibold mb-1.5">{course.title}</div>
                          <p className="text-[11px] text-gray-500 leading-relaxed line-clamp-2 group-hover/card:line-clamp-none transition-all">
                            {course.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-4">
              <p className="text-sm text-gray-300 font-medium">Great job! You match the key skills for this role.</p>
              <p className="text-xs text-gray-500 mt-2">
                For continued growth, consider exploring PNW's <strong>advanced electives</strong> or <strong>independent study</strong> options in your major.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseRecommendations;
