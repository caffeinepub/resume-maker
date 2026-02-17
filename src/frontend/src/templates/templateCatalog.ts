export type TemplateCategory = 'Reverse-Chronological' | 'Functional (Skills-Based)' | 'Hybrid (Combination)';

export interface TemplateMetadata {
  id: string;
  name: string;
  description: string;
  category: TemplateCategory;
  features: string[];
}

export const templateCatalog: Record<TemplateCategory, TemplateMetadata[]> = {
  'Reverse-Chronological': [
    {
      id: 'rc-classic',
      name: 'Classic Professional',
      description: 'Traditional format with clean lines and professional spacing',
      category: 'Reverse-Chronological',
      features: ['Clean', 'Traditional', 'ATS-Friendly'],
    },
    {
      id: 'rc-modern',
      name: 'Modern Minimalist',
      description: 'Contemporary design with subtle accents',
      category: 'Reverse-Chronological',
      features: ['Modern', 'Minimalist', 'Clean'],
    },
    {
      id: 'rc-executive',
      name: 'Executive',
      description: 'Sophisticated layout for senior positions',
      category: 'Reverse-Chronological',
      features: ['Professional', 'Executive', 'Elegant'],
    },
    {
      id: 'rc-compact',
      name: 'Compact',
      description: 'Space-efficient design for extensive experience',
      category: 'Reverse-Chronological',
      features: ['Compact', 'Efficient', 'Dense'],
    },
    {
      id: 'rc-bold',
      name: 'Bold Headers',
      description: 'Strong section headers for easy scanning',
      category: 'Reverse-Chronological',
      features: ['Bold', 'Scannable', 'Clear'],
    },
    {
      id: 'rc-timeline',
      name: 'Timeline',
      description: 'Visual timeline emphasizing career progression',
      category: 'Reverse-Chronological',
      features: ['Visual', 'Timeline', 'Progressive'],
    },
    {
      id: 'rc-simple',
      name: 'Simple & Clean',
      description: 'No-frills design focusing on content',
      category: 'Reverse-Chronological',
      features: ['Simple', 'Content-First', 'Basic'],
    },
    {
      id: 'rc-academic',
      name: 'Academic',
      description: 'Formal layout suitable for academic positions',
      category: 'Reverse-Chronological',
      features: ['Academic', 'Formal', 'Detailed'],
    },
  ],
  'Functional (Skills-Based)': [
    {
      id: 'fs-skills-first',
      name: 'Skills First',
      description: 'Prominent skills section at the top',
      category: 'Functional (Skills-Based)',
      features: ['Skills-Focused', 'Modern', 'Flexible'],
    },
    {
      id: 'fs-competency',
      name: 'Competency Based',
      description: 'Organized by core competencies',
      category: 'Functional (Skills-Based)',
      features: ['Competency', 'Organized', 'Clear'],
    },
    {
      id: 'fs-achievement',
      name: 'Achievement Focused',
      description: 'Highlights key achievements and skills',
      category: 'Functional (Skills-Based)',
      features: ['Achievement', 'Impact', 'Results'],
    },
    {
      id: 'fs-career-change',
      name: 'Career Changer',
      description: 'Ideal for transitioning to new industries',
      category: 'Functional (Skills-Based)',
      features: ['Flexible', 'Transferable', 'Adaptive'],
    },
    {
      id: 'fs-project',
      name: 'Project Showcase',
      description: 'Emphasizes projects and portfolio work',
      category: 'Functional (Skills-Based)',
      features: ['Project-Based', 'Portfolio', 'Creative'],
    },
    {
      id: 'fs-technical',
      name: 'Technical Skills',
      description: 'Detailed technical skills breakdown',
      category: 'Functional (Skills-Based)',
      features: ['Technical', 'Detailed', 'Comprehensive'],
    },
    {
      id: 'fs-consultant',
      name: 'Consultant',
      description: 'Highlights diverse skill sets and expertise',
      category: 'Functional (Skills-Based)',
      features: ['Versatile', 'Expert', 'Diverse'],
    },
  ],
  'Hybrid (Combination)': [
    {
      id: 'hc-balanced',
      name: 'Balanced',
      description: 'Equal emphasis on skills and experience',
      category: 'Hybrid (Combination)',
      features: ['Balanced', 'Comprehensive', 'Complete'],
    },
    {
      id: 'hc-professional',
      name: 'Professional Hybrid',
      description: 'Professional layout combining best of both formats',
      category: 'Hybrid (Combination)',
      features: ['Professional', 'Versatile', 'Complete'],
    },
    {
      id: 'hc-tech',
      name: 'Tech Professional',
      description: 'Optimized for technology roles',
      category: 'Hybrid (Combination)',
      features: ['Tech', 'Modern', 'Detailed'],
    },
    {
      id: 'hc-manager',
      name: 'Manager',
      description: 'Highlights leadership and technical skills',
      category: 'Hybrid (Combination)',
      features: ['Leadership', 'Management', 'Strategic'],
    },
    {
      id: 'hc-creative',
      name: 'Creative Professional',
      description: 'Balances creativity with professionalism',
      category: 'Hybrid (Combination)',
      features: ['Creative', 'Unique', 'Professional'],
    },
    {
      id: 'hc-senior',
      name: 'Senior Professional',
      description: 'For experienced professionals with diverse backgrounds',
      category: 'Hybrid (Combination)',
      features: ['Senior', 'Experienced', 'Comprehensive'],
    },
    {
      id: 'hc-startup',
      name: 'Startup Ready',
      description: 'Dynamic format for fast-paced environments',
      category: 'Hybrid (Combination)',
      features: ['Dynamic', 'Agile', 'Versatile'],
    },
  ],
};
