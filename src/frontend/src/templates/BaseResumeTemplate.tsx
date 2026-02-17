import type { ResumeData } from '../features/editor/types';
import { useResumeStore } from '../state/resumeStore';
import { normalizeSkills } from '../features/editor/skills';
import { normalizeCertifications } from '../features/editor/certifications';

interface BaseResumeTemplateProps {
  data: ResumeData;
}

export function BaseResumeTemplate({ data }: BaseResumeTemplateProps) {
  const { sectionOrder } = useResumeStore();

  const renderSection = (sectionId: string) => {
    switch (sectionId) {
      case 'summary':
        return data.summary ? (
          <section className="mb-6" key="summary">
            <h2 className="text-xl font-bold mb-2 pb-1 border-b-2 border-black">PROFESSIONAL SUMMARY</h2>
            <p className="text-sm">{data.summary}</p>
          </section>
        ) : null;

      case 'skills':
        const normalizedSkills = normalizeSkills(data.skills);
        return normalizedSkills.length > 0 ? (
          <section className="mb-6" key="skills">
            <h2 className="text-xl font-bold mb-2 pb-1 border-b-2 border-black">SKILLS</h2>
            <p className="text-sm">{normalizedSkills.join(', ')}</p>
          </section>
        ) : null;

      case 'experience':
        return data.experience.length > 0 ? (
          <section className="mb-6" key="experience">
            <h2 className="text-xl font-bold mb-2 pb-1 border-b-2 border-black">PROFESSIONAL EXPERIENCE</h2>
            <div className="space-y-4">
              {data.experience.map((exp, index) => (
                <div key={index}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-base">{exp.position}</h3>
                    <span className="text-sm" style={{ color: '#666' }}>
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline mb-2">
                    <p className="text-sm font-semibold" style={{ color: '#4a4a4a' }}>
                      {exp.company}
                    </p>
                    <span className="text-sm" style={{ color: '#666' }}>
                      {exp.location}
                    </span>
                  </div>
                  {exp.bullets.length > 0 && (
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      {exp.bullets.map(
                        (bullet, bulletIndex) =>
                          bullet.trim() && <li key={bulletIndex}>{bullet}</li>
                      )}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        ) : null;

      case 'projects':
        return data.projects.length > 0 ? (
          <section className="mb-6" key="projects">
            <h2 className="text-xl font-bold mb-2 pb-1 border-b-2 border-black">PROJECTS</h2>
            <div className="space-y-3">
              {data.projects.map((project, index) => (
                <div key={index}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-base">{project.name}</h3>
                    {project.link && (
                      <span className="text-sm" style={{ color: '#666' }}>
                        {project.link}
                      </span>
                    )}
                  </div>
                  <p className="text-sm mb-1">{project.description}</p>
                  {project.technologies.length > 0 && (
                    <p className="text-sm" style={{ color: '#666' }}>
                      <span className="font-semibold">Technologies:</span> {project.technologies.join(', ')}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        ) : null;

      case 'education':
        return data.education.length > 0 ? (
          <section className="mb-6" key="education">
            <h2 className="text-xl font-bold mb-2 pb-1 border-b-2 border-black">EDUCATION</h2>
            <div className="space-y-3">
              {data.education.map((edu, index) => (
                <div key={index}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-base">{edu.institution}</h3>
                    <span className="text-sm" style={{ color: '#666' }}>
                      {edu.graduationDate}
                    </span>
                  </div>
                  <p className="text-sm">
                    {edu.degree} {edu.field && `in ${edu.field}`}
                  </p>
                  {edu.location && (
                    <p className="text-sm" style={{ color: '#666' }}>
                      {edu.location}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        ) : null;

      case 'certifications':
        const normalizedCertifications = normalizeCertifications(data.certifications);
        return normalizedCertifications.length > 0 ? (
          <section className="mb-6" key="certifications">
            <h2 className="text-xl font-bold mb-2 pb-1 border-b-2 border-black">CERTIFICATIONS</h2>
            <ul className="list-disc list-inside space-y-1 text-sm">
              {normalizedCertifications.map((cert, index) => (
                <li key={index}>{cert}</li>
              ))}
            </ul>
          </section>
        ) : null;

      default:
        return null;
    }
  };

  return (
    <div className="max-w-[8.5in] mx-auto bg-white text-black p-12" style={{ fontSize: '11pt', lineHeight: '1.5' }}>
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-3xl font-bold mb-2" style={{ color: '#1a1a1a' }}>
          {data.personalInfo.fullName || 'Your Name'}
        </h1>
        {data.headline && (
          <p className="text-lg mb-3" style={{ color: '#4a4a4a' }}>
            {data.headline}
          </p>
        )}
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm" style={{ color: '#666' }}>
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
          {data.links.linkedin && <span>{data.links.linkedin}</span>}
          {data.links.portfolio && <span>{data.links.portfolio}</span>}
          {data.links.github && <span>{data.links.github}</span>}
        </div>
      </header>

      {/* Render sections in user-defined order */}
      {sectionOrder.map((sectionId) => renderSection(sectionId))}
    </div>
  );
}
