// Local keyword suggestion engine with curated mappings
const keywordMappings: Record<string, string[]> = {
  'digital marketing': ['SEO', 'SEM', 'ROAS', 'PPC', 'Content Marketing', 'Social Media Marketing', 'Email Marketing', 'Analytics'],
  'software engineer': ['JavaScript', 'Python', 'React', 'Node.js', 'API', 'Database', 'Git', 'Agile'],
  'data science': ['Python', 'Machine Learning', 'SQL', 'Statistics', 'Data Visualization', 'TensorFlow', 'Pandas', 'NumPy'],
  'project management': ['Agile', 'Scrum', 'Stakeholder Management', 'Risk Management', 'Budget Planning', 'JIRA', 'Gantt Charts'],
  'sales': ['Lead Generation', 'CRM', 'Negotiation', 'Pipeline Management', 'Salesforce', 'B2B', 'B2C', 'Account Management'],
  'marketing': ['Brand Strategy', 'Campaign Management', 'Market Research', 'Content Creation', 'Analytics', 'Social Media'],
  'web development': ['HTML', 'CSS', 'JavaScript', 'React', 'Vue', 'Angular', 'Responsive Design', 'REST API'],
  'frontend': ['React', 'Vue', 'Angular', 'TypeScript', 'CSS', 'HTML', 'Responsive Design', 'UI/UX'],
  'backend': ['Node.js', 'Python', 'Java', 'SQL', 'MongoDB', 'REST API', 'GraphQL', 'Microservices'],
  'devops': ['Docker', 'Kubernetes', 'CI/CD', 'AWS', 'Azure', 'Jenkins', 'Terraform', 'Monitoring'],
  'design': ['Figma', 'Adobe XD', 'Sketch', 'Prototyping', 'User Research', 'Wireframing', 'UI/UX', 'Design Systems'],
  'finance': ['Financial Analysis', 'Budgeting', 'Forecasting', 'Excel', 'Financial Modeling', 'Reporting', 'Compliance'],
  'hr': ['Recruitment', 'Onboarding', 'Performance Management', 'Employee Relations', 'HRIS', 'Training', 'Compliance'],
  'customer service': ['Communication', 'Problem Solving', 'CRM', 'Zendesk', 'Customer Satisfaction', 'Conflict Resolution'],
};

export function getSuggestions(input: string): string[] {
  if (!input || input.length < 3) return [];

  const normalizedInput = input.toLowerCase().trim();
  const suggestions = new Set<string>();

  // Direct match
  if (keywordMappings[normalizedInput]) {
    keywordMappings[normalizedInput].forEach(kw => suggestions.add(kw));
  }

  // Partial match
  Object.entries(keywordMappings).forEach(([key, keywords]) => {
    if (key.includes(normalizedInput) || normalizedInput.includes(key)) {
      keywords.forEach(kw => suggestions.add(kw));
    }
  });

  return Array.from(suggestions).slice(0, 8);
}

export function insertKeyword(currentText: string, keyword: string, cursorPosition?: number): string {
  if (!currentText) return keyword;
  
  // If cursor position is provided, insert at that position
  if (cursorPosition !== undefined) {
    const before = currentText.slice(0, cursorPosition);
    const after = currentText.slice(cursorPosition);
    return `${before}${keyword}${after}`;
  }
  
  // Otherwise append with appropriate separator
  const separator = currentText.trim().endsWith(',') ? ' ' : ', ';
  return `${currentText.trim()}${separator}${keyword}`;
}
