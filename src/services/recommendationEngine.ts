
import { pnwCourseCatalog } from '../data/courseCatalog';
import { CourseRecommendation } from '../types';

/**
 * LOCAL ALGORITHM: The "Academic Bridge" Engine.
 * This does NOT use Gemini. It uses deterministic logic to map
 * industry skills to university resources.
 */

export function findCourseRecommendations(missingSkills: string[]): CourseRecommendation[] {
  const recommendations: CourseRecommendation[] = [];

  // Use a Set to avoid duplicate suggestions if multiple skills map to the same course
  const processedSkills = new Set<string>();

  missingSkills.forEach(skill => {
    if (processedSkills.has(skill)) return;
    
    const normalizedSkill = skill.toLowerCase().trim();
    // Escape special characters for Regex (e.g., C++, C#)
    const escapedSkill = normalizedSkill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    
    // Helper to check word boundaries for short skills (e.g., "C", "R", "Go", "SQL")
    // For longer skills, we allow partial matches (e.g. "communication" matches "communications")
    const isShortSkill = normalizedSkill.length <= 3;
    const skillRegex = new RegExp(isShortSkill ? `\\b${escapedSkill}\\b` : escapedSkill, 'i');

    const matchingCourses = pnwCourseCatalog.filter(course => {
      // Create a searchable text blob from title, description, and keywords
      const searchableText = `${course.title} ${course.description} ${course.keywords.join(' ')}`.toLowerCase();

      return skillRegex.test(searchableText);
    });

    // Sort by relevance (exact matches in title first, then code matches, then description)
    matchingCourses.sort((a, b) => {
        const aTitleMatch = a.title.toLowerCase().includes(normalizedSkill);
        const bTitleMatch = b.title.toLowerCase().includes(normalizedSkill);
        if (aTitleMatch && !bTitleMatch) return -1;
        if (!aTitleMatch && bTitleMatch) return 1;
        return 0;
    });

    // Limit to top 3 most relevant courses per skill to avoid UI clutter
    const topCourses = matchingCourses.slice(0, 3);

    if (topCourses.length > 0) {
      recommendations.push({
        skill: skill,
        courses: topCourses
      });
      processedSkills.add(skill);
    }
  });

  return recommendations;
}
