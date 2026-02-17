export const tipContent = {
  headline: {
    title: 'Headline Tips',
    points: [
      'Keep it concise (under 100 characters)',
      'Include your role and key skills or specializations',
      'Use industry-standard job titles for ATS compatibility',
      'Avoid special characters or emojis',
    ],
  },
  summary: {
    title: 'Summary Tips',
    points: [
      'Start with your years of experience and key expertise',
      'Highlight 2-3 major achievements with quantifiable results',
      'Keep it to 3-5 sentences (50-150 words)',
      'Use active voice and action verbs',
      'Tailor it to the job you\'re applying for',
    ],
  },
  experience: {
    title: 'Experience Tips',
    points: [
      'Start each bullet with a strong action verb (Led, Developed, Increased, etc.)',
      'Quantify achievements with numbers, percentages, or metrics',
      'Focus on impact and results, not just responsibilities',
      'Use past tense for previous roles, present tense for current role',
      'Keep bullets concise (1-2 lines each)',
      'List experiences in reverse chronological order',
    ],
  },
  skills: {
    title: 'Skills Tips',
    points: [
      'List skills relevant to your target role',
      'Include both technical and soft skills',
      'Use industry-standard terminology',
      'Prioritize skills mentioned in job descriptions',
      'Group similar skills together (e.g., "JavaScript, TypeScript, React")',
    ],
  },
  projects: {
    title: 'Projects Tips',
    points: [
      'Choose projects that demonstrate relevant skills',
      'Describe your specific role and contributions',
      'Highlight technologies and tools used',
      'Include links to live demos or GitHub repositories',
      'Quantify impact where possible (users, performance improvements, etc.)',
    ],
  },
  education: {
    title: 'Education Tips',
    points: [
      'List degrees in reverse chronological order',
      'Include GPA only if it\'s 3.5 or higher',
      'Mention relevant coursework, honors, or awards',
      'Include graduation date (or expected date)',
    ],
  },
  certifications: {
    title: 'Certifications Tips',
    points: [
      'List industry-recognized certifications',
      'Include issuing organization and date',
      'Prioritize certifications relevant to your target role',
      'Include certification IDs or verification links if available',
      'Keep the list current (remove expired certifications)',
    ],
  },
};

export type TipContent = typeof tipContent[keyof typeof tipContent];
