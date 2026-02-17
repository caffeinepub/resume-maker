import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { useResumeStore } from '../../state/resumeStore';
import { RepeatableSectionControls } from './RepeatableSectionControls';
import { HeadlineSuggestionsPanel } from '../headline/HeadlineSuggestionsPanel';
import { KeywordSuggestionsPanel } from '../keywords/KeywordSuggestionsPanel';
import { InlineTip } from '../tips/InlineTip';
import { tipContent } from '../tips/tipContent';
import { insertKeyword } from '../keywords/keywordSuggestionEngine';
import { parseSkills, formatSkills } from './skills';
import { parseCertifications, formatCertifications } from './certifications';
import { useState, useEffect } from 'react';

export function ResumeEditorForm() {
  const {
    draftResumeData,
    resumeFont,
    sectionOrder,
    updatePersonalInfo,
    updateHeadline,
    updateSummary,
    updateSkills,
    addExperience,
    updateExperience,
    removeExperience,
    reorderExperience,
    addEducation,
    updateEducation,
    removeEducation,
    addProject,
    updateProject,
    removeProject,
    updateCertifications,
    updateLinks,
    setResumeFont,
    moveSectionUp,
    moveSectionDown,
  } = useResumeStore();

  // Local state for skills textarea to preserve user input during typing
  const [skillsText, setSkillsText] = useState(formatSkills(draftResumeData.skills));

  // Local state for certifications textarea to preserve user input during typing
  const [certificationsText, setCertificationsText] = useState(
    formatCertifications(draftResumeData.certifications)
  );

  // Sync local state when store skills change (e.g., from rehydration or keyword insertion)
  useEffect(() => {
    setSkillsText(formatSkills(draftResumeData.skills));
  }, [draftResumeData.skills]);

  // Sync local state when store certifications change (e.g., from rehydration)
  useEffect(() => {
    setCertificationsText(formatCertifications(draftResumeData.certifications));
  }, [draftResumeData.certifications]);

  const handleInsertSummaryKeyword = (keyword: string) => {
    const newSummary = insertKeyword(draftResumeData.summary, keyword);
    updateSummary(newSummary);
  };

  const handleInsertSkillKeyword = (keyword: string) => {
    if (!draftResumeData.skills.includes(keyword)) {
      updateSkills([...draftResumeData.skills, keyword]);
    }
  };

  const handleSkillsChange = (value: string) => {
    setSkillsText(value);
  };

  const handleSkillsBlur = () => {
    // Parse and normalize skills when user finishes editing
    const parsed = parseSkills(skillsText);
    updateSkills(parsed);
    // Format back to canonical comma-and-space representation
    setSkillsText(formatSkills(parsed));
  };

  const handleCertificationsChange = (value: string) => {
    setCertificationsText(value);
  };

  const handleCertificationsBlur = () => {
    // Parse and normalize certifications when user finishes editing
    const parsed = parseCertifications(certificationsText);
    updateCertifications(parsed);
    // Format back to canonical one-per-line representation
    setCertificationsText(formatCertifications(parsed));
  };

  const sectionLabels: Record<string, string> = {
    summary: 'Professional Summary',
    skills: 'Skills',
    experience: 'Work Experience',
    projects: 'Projects',
    education: 'Education',
    certifications: 'Certifications',
  };

  const renderSection = (sectionId: string) => {
    switch (sectionId) {
      case 'summary':
        return (
          <Card key="summary">
            <CardHeader>
              <CardTitle>Professional Summary</CardTitle>
              <CardDescription>A brief overview of your experience and qualifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <InlineTip content={tipContent.summary} />
              <div className="space-y-2">
                <Label htmlFor="summary">Summary</Label>
                <Textarea
                  id="summary"
                  value={draftResumeData.summary}
                  onChange={(e) => updateSummary(e.target.value)}
                  placeholder="Experienced software engineer with 5+ years of expertise in building scalable web applications..."
                  rows={5}
                  spellCheck
                />
              </div>
              <KeywordSuggestionsPanel
                inputValue={draftResumeData.summary}
                onInsert={handleInsertSummaryKeyword}
                placeholder="Suggested keywords for your summary"
              />
            </CardContent>
          </Card>
        );

      case 'skills':
        return (
          <Card key="skills">
            <CardHeader>
              <CardTitle>Skills</CardTitle>
              <CardDescription>Your technical and professional skills</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <InlineTip content={tipContent.skills} />
              <div className="space-y-2">
                <Label htmlFor="skills">Skills (comma-separated)</Label>
                <Textarea
                  id="skills"
                  value={skillsText}
                  onChange={(e) => handleSkillsChange(e.target.value)}
                  onBlur={handleSkillsBlur}
                  placeholder="JavaScript, React, Node.js, Python, SQL"
                  rows={3}
                  spellCheck
                />
              </div>
              <KeywordSuggestionsPanel
                inputValue={draftResumeData.skills.join(' ')}
                onInsert={handleInsertSkillKeyword}
                placeholder="Suggested skills"
              />
            </CardContent>
          </Card>
        );

      case 'experience':
        return (
          <Card key="experience">
            <CardHeader>
              <CardTitle>Work Experience</CardTitle>
              <CardDescription>Your professional work history</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <InlineTip content={tipContent.experience} />
              <RepeatableSectionControls
                type="experience"
                items={draftResumeData.experience}
                onAdd={addExperience}
                onUpdate={updateExperience}
                onRemove={removeExperience}
                onReorder={reorderExperience}
              />
            </CardContent>
          </Card>
        );

      case 'projects':
        return (
          <Card key="projects">
            <CardHeader>
              <CardTitle>Projects</CardTitle>
              <CardDescription>Notable projects you've worked on</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <InlineTip content={tipContent.projects} />
              <RepeatableSectionControls
                type="project"
                items={draftResumeData.projects}
                onAdd={addProject}
                onUpdate={updateProject}
                onRemove={removeProject}
              />
            </CardContent>
          </Card>
        );

      case 'education':
        return (
          <Card key="education">
            <CardHeader>
              <CardTitle>Education</CardTitle>
              <CardDescription>Your academic background</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <InlineTip content={tipContent.education} />
              <RepeatableSectionControls
                type="education"
                items={draftResumeData.education}
                onAdd={addEducation}
                onUpdate={updateEducation}
                onRemove={removeEducation}
              />
            </CardContent>
          </Card>
        );

      case 'certifications':
        return (
          <Card key="certifications">
            <CardHeader>
              <CardTitle>Certifications</CardTitle>
              <CardDescription>Professional certifications and licenses</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <InlineTip content={tipContent.certifications} />
              <div className="space-y-2">
                <Label htmlFor="certifications">Certifications (one per line)</Label>
                <Textarea
                  id="certifications"
                  value={certificationsText}
                  onChange={(e) => handleCertificationsChange(e.target.value)}
                  onBlur={handleCertificationsBlur}
                  placeholder="AWS Certified Solutions Architect&#10;PMP Certification&#10;Google Analytics Certified"
                  rows={4}
                  spellCheck
                />
              </div>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Your contact details and basic information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                value={draftResumeData.personalInfo.fullName}
                onChange={(e) => updatePersonalInfo({ fullName: e.target.value })}
                placeholder="John Doe"
                spellCheck
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={draftResumeData.personalInfo.email}
                onChange={(e) => updatePersonalInfo({ email: e.target.value })}
                placeholder="john.doe@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                value={draftResumeData.personalInfo.phone}
                onChange={(e) => updatePersonalInfo({ phone: e.target.value })}
                placeholder="+1 (555) 123-4567"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={draftResumeData.personalInfo.location}
                onChange={(e) => updatePersonalInfo({ location: e.target.value })}
                placeholder="San Francisco, CA"
                spellCheck
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Professional Headline *</CardTitle>
          <CardDescription>A brief title that summarizes your professional identity</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <InlineTip content={tipContent.headline} />
          <div className="space-y-2">
            <Label htmlFor="headline">Headline</Label>
            <Input
              id="headline"
              value={draftResumeData.headline}
              onChange={(e) => updateHeadline(e.target.value)}
              placeholder="Senior Software Engineer | Full-Stack Developer"
              spellCheck
            />
          </div>
          <HeadlineSuggestionsPanel />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Links</CardTitle>
          <CardDescription>Your professional online presence</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="linkedin">LinkedIn</Label>
              <Input
                id="linkedin"
                value={draftResumeData.links.linkedin}
                onChange={(e) => updateLinks({ ...draftResumeData.links, linkedin: e.target.value })}
                placeholder="linkedin.com/in/yourprofile"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="portfolio">Portfolio</Label>
              <Input
                id="portfolio"
                value={draftResumeData.links.portfolio}
                onChange={(e) => updateLinks({ ...draftResumeData.links, portfolio: e.target.value })}
                placeholder="yourportfolio.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="github">GitHub</Label>
              <Input
                id="github"
                value={draftResumeData.links.github}
                onChange={(e) => updateLinks({ ...draftResumeData.links, github: e.target.value })}
                placeholder="github.com/yourusername"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Resume Font</CardTitle>
          <CardDescription>Choose an ATS-friendly font for your resume</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="font">Font</Label>
            <Select value={resumeFont} onValueChange={(value) => setResumeFont(value as typeof resumeFont)}>
              <SelectTrigger id="font">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Arial">Arial</SelectItem>
                <SelectItem value="Calibri">Calibri</SelectItem>
                <SelectItem value="Times New Roman">Times New Roman</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Section Order</CardTitle>
          <CardDescription>Customize the order of sections in your resume</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {sectionOrder.map((sectionId, index) => (
              <div key={sectionId} className="flex items-center justify-between p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                <span className="font-medium">{sectionLabels[sectionId]}</span>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => moveSectionUp(sectionId)}
                    disabled={index === 0}
                  >
                    <ChevronUp className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => moveSectionDown(sectionId)}
                    disabled={index === sectionOrder.length - 1}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Render sections in user-defined order */}
      {sectionOrder.map((sectionId) => renderSection(sectionId))}
    </div>
  );
}
