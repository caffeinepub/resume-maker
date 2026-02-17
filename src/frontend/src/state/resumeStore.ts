import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ResumeData, ExperienceEntry, EducationEntry, ProjectEntry } from '../features/editor/types';
import type { TemplateCategory } from '../templates/templateCatalog';
import { normalizeSkills } from '../features/editor/skills';

type SectionId = 'summary' | 'skills' | 'experience' | 'projects' | 'education' | 'certifications';
type ResumeFont = 'Arial' | 'Calibri' | 'Times New Roman';

interface ResumeStore {
  selectedTemplateId: string | null;
  selectedCategory: TemplateCategory | null;
  draftResumeData: ResumeData;
  resumeFont: ResumeFont;
  sectionOrder: SectionId[];
  setSelectedTemplate: (templateId: string, category: TemplateCategory) => void;
  updatePersonalInfo: (info: Partial<ResumeData['personalInfo']>) => void;
  updateHeadline: (headline: string) => void;
  updateSummary: (summary: string) => void;
  updateSkills: (skills: string[]) => void;
  addExperience: () => void;
  updateExperience: (index: number, experience: Partial<ExperienceEntry>) => void;
  removeExperience: (index: number) => void;
  reorderExperience: (fromIndex: number, toIndex: number) => void;
  addEducation: () => void;
  updateEducation: (index: number, education: Partial<EducationEntry>) => void;
  removeEducation: (index: number) => void;
  addProject: () => void;
  updateProject: (index: number, project: Partial<ProjectEntry>) => void;
  removeProject: (index: number) => void;
  updateCertifications: (certifications: string[]) => void;
  updateLinks: (links: ResumeData['links']) => void;
  setResumeFont: (font: ResumeFont) => void;
  moveSectionUp: (sectionId: SectionId) => void;
  moveSectionDown: (sectionId: SectionId) => void;
}

const initialResumeData: ResumeData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
  },
  headline: '',
  summary: '',
  experience: [],
  education: [],
  skills: [],
  projects: [],
  certifications: [],
  links: {
    linkedin: '',
    portfolio: '',
    github: '',
  },
};

const defaultSectionOrder: SectionId[] = ['summary', 'skills', 'experience', 'projects', 'education', 'certifications'];

/**
 * Normalize certifications to ensure it's always a clean string array.
 * Handles legacy data (missing field, single string, or array with blank items).
 */
function normalizeCertifications(certifications: unknown): string[] {
  if (Array.isArray(certifications)) {
    return certifications
      .filter((c) => typeof c === 'string' && c.trim().length > 0)
      .map((c) => c.trim());
  }
  if (typeof certifications === 'string' && certifications.trim().length > 0) {
    return certifications
      .split(/\r?\n/)
      .map((c) => c.trim())
      .filter((c) => c.length > 0);
  }
  return [];
}

/**
 * Auto-heal section order by merging in any missing built-in sections
 * while preserving existing user-defined ordering.
 */
function healSectionOrder(persistedOrder: unknown): SectionId[] {
  const builtInSections = new Set<SectionId>(defaultSectionOrder);
  
  if (!Array.isArray(persistedOrder)) {
    return defaultSectionOrder;
  }

  // Start with persisted order (filtering out invalid entries)
  const validPersistedSections = persistedOrder.filter(
    (id): id is SectionId => typeof id === 'string' && builtInSections.has(id as SectionId)
  );

  // Find missing built-in sections
  const presentSections = new Set(validPersistedSections);
  const missingSections = defaultSectionOrder.filter((id) => !presentSections.has(id));

  // Append missing sections at the end
  return [...validPersistedSections, ...missingSections];
}

/**
 * Remove GPA field from education entries (legacy data cleanup)
 */
function cleanEducationData(education: EducationEntry[]): EducationEntry[] {
  return education.map(({ institution, degree, field, location, graduationDate }) => ({
    institution,
    degree,
    field,
    location,
    graduationDate,
  }));
}

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set) => ({
      selectedTemplateId: null,
      selectedCategory: null,
      draftResumeData: initialResumeData,
      resumeFont: 'Arial',
      sectionOrder: defaultSectionOrder,

      setSelectedTemplate: (templateId, category) =>
        set({ selectedTemplateId: templateId, selectedCategory: category }),

      updatePersonalInfo: (info) =>
        set((state) => ({
          draftResumeData: {
            ...state.draftResumeData,
            personalInfo: { ...state.draftResumeData.personalInfo, ...info },
          },
        })),

      updateHeadline: (headline) =>
        set((state) => ({
          draftResumeData: { ...state.draftResumeData, headline },
        })),

      updateSummary: (summary) =>
        set((state) => ({
          draftResumeData: { ...state.draftResumeData, summary },
        })),

      updateSkills: (skills) =>
        set((state) => ({
          draftResumeData: { 
            ...state.draftResumeData, 
            skills: normalizeSkills(skills)
          },
        })),

      addExperience: () =>
        set((state) => ({
          draftResumeData: {
            ...state.draftResumeData,
            experience: [
              ...state.draftResumeData.experience,
              {
                company: '',
                position: '',
                location: '',
                startDate: '',
                endDate: '',
                current: false,
                bullets: [''],
              },
            ],
          },
        })),

      updateExperience: (index, experience) =>
        set((state) => ({
          draftResumeData: {
            ...state.draftResumeData,
            experience: state.draftResumeData.experience.map((exp, i) =>
              i === index ? { ...exp, ...experience } : exp
            ),
          },
        })),

      removeExperience: (index) =>
        set((state) => ({
          draftResumeData: {
            ...state.draftResumeData,
            experience: state.draftResumeData.experience.filter((_, i) => i !== index),
          },
        })),

      reorderExperience: (fromIndex, toIndex) =>
        set((state) => {
          const newExperience = [...state.draftResumeData.experience];
          const [removed] = newExperience.splice(fromIndex, 1);
          newExperience.splice(toIndex, 0, removed);
          return {
            draftResumeData: { ...state.draftResumeData, experience: newExperience },
          };
        }),

      addEducation: () =>
        set((state) => ({
          draftResumeData: {
            ...state.draftResumeData,
            education: [
              ...state.draftResumeData.education,
              {
                institution: '',
                degree: '',
                field: '',
                location: '',
                graduationDate: '',
              },
            ],
          },
        })),

      updateEducation: (index, education) =>
        set((state) => ({
          draftResumeData: {
            ...state.draftResumeData,
            education: state.draftResumeData.education.map((edu, i) => (i === index ? { ...edu, ...education } : edu)),
          },
        })),

      removeEducation: (index) =>
        set((state) => ({
          draftResumeData: {
            ...state.draftResumeData,
            education: state.draftResumeData.education.filter((_, i) => i !== index),
          },
        })),

      addProject: () =>
        set((state) => ({
          draftResumeData: {
            ...state.draftResumeData,
            projects: [
              ...state.draftResumeData.projects,
              {
                name: '',
                description: '',
                technologies: [],
                link: '',
              },
            ],
          },
        })),

      updateProject: (index, project) =>
        set((state) => ({
          draftResumeData: {
            ...state.draftResumeData,
            projects: state.draftResumeData.projects.map((proj, i) => (i === index ? { ...proj, ...project } : proj)),
          },
        })),

      removeProject: (index) =>
        set((state) => ({
          draftResumeData: {
            ...state.draftResumeData,
            projects: state.draftResumeData.projects.filter((_, i) => i !== index),
          },
        })),

      updateCertifications: (certifications) =>
        set((state) => ({
          draftResumeData: { 
            ...state.draftResumeData, 
            certifications: normalizeCertifications(certifications)
          },
        })),

      updateLinks: (links) =>
        set((state) => ({
          draftResumeData: { ...state.draftResumeData, links },
        })),

      setResumeFont: (font) => set({ resumeFont: font }),

      moveSectionUp: (sectionId) =>
        set((state) => {
          const currentIndex = state.sectionOrder.indexOf(sectionId);
          if (currentIndex > 0) {
            const newOrder = [...state.sectionOrder];
            [newOrder[currentIndex - 1], newOrder[currentIndex]] = [newOrder[currentIndex], newOrder[currentIndex - 1]];
            return { sectionOrder: newOrder };
          }
          return state;
        }),

      moveSectionDown: (sectionId) =>
        set((state) => {
          const currentIndex = state.sectionOrder.indexOf(sectionId);
          if (currentIndex < state.sectionOrder.length - 1) {
            const newOrder = [...state.sectionOrder];
            [newOrder[currentIndex], newOrder[currentIndex + 1]] = [newOrder[currentIndex + 1], newOrder[currentIndex]];
            return { sectionOrder: newOrder };
          }
          return state;
        }),
    }),
    {
      name: 'resume-maker-storage',
      onRehydrateStorage: () => (state) => {
        if (!state) return;

        // Normalize skills on rehydration to handle legacy data
        if (state.draftResumeData?.skills) {
          state.draftResumeData.skills = normalizeSkills(state.draftResumeData.skills);
        }

        // Normalize certifications on rehydration to handle legacy data
        if (state.draftResumeData) {
          state.draftResumeData.certifications = normalizeCertifications(
            state.draftResumeData.certifications
          );
        }

        // Clean education data to remove GPA field
        if (state.draftResumeData?.education) {
          state.draftResumeData.education = cleanEducationData(state.draftResumeData.education);
        }

        // Auto-heal section order to include any missing built-in sections
        if (state.sectionOrder) {
          state.sectionOrder = healSectionOrder(state.sectionOrder);
        } else {
          state.sectionOrder = defaultSectionOrder;
        }
      },
    }
  )
);
