export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
}

export interface ExperienceEntry {
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  bullets: string[];
}

export interface EducationEntry {
  institution: string;
  degree: string;
  field: string;
  location: string;
  graduationDate: string;
}

export interface ProjectEntry {
  name: string;
  description: string;
  technologies: string[];
  link?: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  headline: string;
  summary: string;
  experience: ExperienceEntry[];
  education: EducationEntry[];
  skills: string[];
  projects: ProjectEntry[];
  certifications: string[];
  links: {
    linkedin?: string;
    portfolio?: string;
    github?: string;
  };
}
