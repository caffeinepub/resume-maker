import type { ResumeData } from '../editor/types';

export function generateHeadlineSuggestions(resumeData: ResumeData): string[] {
  const suggestions: string[] = [];
  const skills = resumeData.skills.slice(0, 3);
  const experience = resumeData.experience[0];

  // Role-based suggestions
  if (experience?.position) {
    suggestions.push(experience.position);
    suggestions.push(`${experience.position} | ${skills[0] || 'Technology'} Specialist`);
  }

  // Skill-based suggestions
  if (skills.length >= 2) {
    suggestions.push(`${skills[0]} & ${skills[1]} Expert`);
    suggestions.push(`${skills[0]} Developer | ${skills[1]} Enthusiast`);
  }

  // Experience level suggestions
  const yearsOfExperience = resumeData.experience.length;
  if (yearsOfExperience > 0) {
    const level = yearsOfExperience >= 5 ? 'Senior' : yearsOfExperience >= 2 ? 'Mid-Level' : 'Junior';
    if (skills[0]) {
      suggestions.push(`${level} ${skills[0]} Developer`);
    }
  }

  // Generic professional suggestions
  suggestions.push('Results-Driven Professional | Problem Solver');
  suggestions.push('Innovative Technologist | Team Leader');
  suggestions.push('Strategic Thinker | Technical Expert');

  // Industry-specific suggestions
  if (skills.some((s) => s.toLowerCase().includes('data'))) {
    suggestions.push('Data-Driven Analyst | Insights Specialist');
  }
  if (skills.some((s) => s.toLowerCase().includes('design'))) {
    suggestions.push('Creative Designer | User Experience Advocate');
  }
  if (skills.some((s) => s.toLowerCase().includes('manage'))) {
    suggestions.push('Project Manager | Agile Leader');
  }

  // Remove duplicates and return top 8
  return [...new Set(suggestions)].slice(0, 8);
}
