import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Trash2, GripVertical, ChevronUp, ChevronDown } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { ActionVerbHelper } from './ActionVerbHelper';
import { applyActionVerb } from './actionVerbs';
import type { ExperienceEntry, EducationEntry, ProjectEntry } from './types';

interface RepeatableSectionControlsProps {
  type: 'experience' | 'education' | 'project';
  items: ExperienceEntry[] | EducationEntry[] | ProjectEntry[];
  onAdd: () => void;
  onUpdate: (index: number, data: any) => void;
  onRemove: (index: number) => void;
  onReorder?: (fromIndex: number, toIndex: number) => void;
}

export function RepeatableSectionControls({
  type,
  items,
  onAdd,
  onUpdate,
  onRemove,
  onReorder,
}: RepeatableSectionControlsProps) {
  const handleMoveUp = (index: number) => {
    if (index > 0 && onReorder) {
      onReorder(index, index - 1);
    }
  };

  const handleMoveDown = (index: number) => {
    if (index < items.length - 1 && onReorder) {
      onReorder(index, index + 1);
    }
  };

  return (
    <div className="space-y-4">
      {items.length === 0 && (
        <p className="text-sm text-neutral-500 dark:text-neutral-400 text-center py-4">
          No {type} entries yet. Click "Add {type}" to get started.
        </p>
      )}

      {items.map((item, index) => (
        <div key={index} className="border border-neutral-200 dark:border-neutral-700 rounded-lg p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <GripVertical className="h-5 w-5 text-neutral-400" />
              <span className="font-medium text-sm text-neutral-700 dark:text-neutral-300">
                {type === 'experience' && `Experience #${index + 1}`}
                {type === 'education' && `Education #${index + 1}`}
                {type === 'project' && `Project #${index + 1}`}
              </span>
            </div>
            <div className="flex items-center gap-1">
              {onReorder && (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleMoveUp(index)}
                    disabled={index === 0}
                    className="h-8 w-8 p-0"
                  >
                    <ChevronUp className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleMoveDown(index)}
                    disabled={index === items.length - 1}
                    className="h-8 w-8 p-0"
                  >
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </>
              )}
              <Button variant="ghost" size="sm" onClick={() => onRemove(index)} className="h-8 w-8 p-0 text-red-600">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Separator />

          {type === 'experience' && (
            <ExperienceFields item={item as ExperienceEntry} onChange={(data) => onUpdate(index, data)} />
          )}
          {type === 'education' && (
            <EducationFields item={item as EducationEntry} onChange={(data) => onUpdate(index, data)} />
          )}
          {type === 'project' && (
            <ProjectFields item={item as ProjectEntry} onChange={(data) => onUpdate(index, data)} />
          )}
        </div>
      ))}

      <Button onClick={onAdd} variant="outline" className="w-full">
        <Plus className="mr-2 h-4 w-4" />
        Add {type === 'experience' ? 'Experience' : type === 'education' ? 'Education' : 'Project'}
      </Button>
    </div>
  );
}

function ExperienceFields({ item, onChange }: { item: ExperienceEntry; onChange: (data: Partial<ExperienceEntry>) => void }) {
  const addBullet = () => {
    onChange({ bullets: [...item.bullets, ''] });
  };

  const updateBullet = (bulletIndex: number, value: string) => {
    const newBullets = [...item.bullets];
    newBullets[bulletIndex] = value;
    onChange({ bullets: newBullets });
  };

  const removeBullet = (bulletIndex: number) => {
    onChange({ bullets: item.bullets.filter((_, i) => i !== bulletIndex) });
  };

  const handleApplyVerb = (bulletIndex: number, verb: string) => {
    const currentBullet = item.bullets[bulletIndex];
    const newBullet = applyActionVerb(currentBullet, verb);
    updateBullet(bulletIndex, newBullet);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Company</Label>
          <Input value={item.company} onChange={(e) => onChange({ company: e.target.value })} placeholder="Company Name" spellCheck />
        </div>
        <div className="space-y-2">
          <Label>Position</Label>
          <Input value={item.position} onChange={(e) => onChange({ position: e.target.value })} placeholder="Job Title" spellCheck />
        </div>
        <div className="space-y-2">
          <Label>Location</Label>
          <Input value={item.location} onChange={(e) => onChange({ location: e.target.value })} placeholder="City, State" spellCheck />
        </div>
        <div className="space-y-2">
          <Label>Start Date</Label>
          <Input value={item.startDate} onChange={(e) => onChange({ startDate: e.target.value })} placeholder="Jan 2020" />
        </div>
        <div className="space-y-2">
          <Label>End Date</Label>
          <Input
            value={item.endDate}
            onChange={(e) => onChange({ endDate: e.target.value })}
            placeholder="Dec 2022"
            disabled={item.current}
          />
        </div>
        <div className="flex items-center space-x-2 pt-8">
          <Checkbox id={`current-${item.company}`} checked={item.current} onCheckedChange={(checked) => onChange({ current: checked as boolean })} />
          <Label htmlFor={`current-${item.company}`} className="cursor-pointer">
            Currently working here
          </Label>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Key Achievements & Responsibilities</Label>
        {item.bullets.map((bullet, bulletIndex) => (
          <div key={bulletIndex} className="space-y-2">
            <div className="flex gap-2 items-start">
              <Textarea
                value={bullet}
                onChange={(e) => updateBullet(bulletIndex, e.target.value)}
                placeholder="• Achieved X by doing Y, resulting in Z..."
                rows={2}
                className="flex-1"
                spellCheck
              />
              <Button variant="ghost" size="sm" onClick={() => removeBullet(bulletIndex)} className="text-red-600 mt-1">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <ActionVerbHelper onApply={(verb) => handleApplyVerb(bulletIndex, verb)} />
          </div>
        ))}
        <Button onClick={addBullet} variant="outline" size="sm" className="w-full">
          <Plus className="mr-2 h-4 w-4" />
          Add Bullet Point
        </Button>
      </div>
    </div>
  );
}

function EducationFields({ item, onChange }: { item: EducationEntry; onChange: (data: Partial<EducationEntry>) => void }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label>Institution</Label>
        <Input value={item.institution} onChange={(e) => onChange({ institution: e.target.value })} placeholder="University Name" spellCheck />
      </div>
      <div className="space-y-2">
        <Label>Degree</Label>
        <Input value={item.degree} onChange={(e) => onChange({ degree: e.target.value })} placeholder="Bachelor of Science" spellCheck />
      </div>
      <div className="space-y-2">
        <Label>Field of Study</Label>
        <Input value={item.field} onChange={(e) => onChange({ field: e.target.value })} placeholder="Computer Science" spellCheck />
      </div>
      <div className="space-y-2">
        <Label>Location</Label>
        <Input value={item.location} onChange={(e) => onChange({ location: e.target.value })} placeholder="City, State" spellCheck />
      </div>
      <div className="space-y-2">
        <Label>Graduation Date</Label>
        <Input value={item.graduationDate} onChange={(e) => onChange({ graduationDate: e.target.value })} placeholder="May 2020" />
      </div>
    </div>
  );
}

function ProjectFields({ item, onChange }: { item: ProjectEntry; onChange: (data: Partial<ProjectEntry>) => void }) {
  const addTechnology = () => {
    onChange({ technologies: [...item.technologies, ''] });
  };

  const updateTechnology = (techIndex: number, value: string) => {
    const newTechnologies = [...item.technologies];
    newTechnologies[techIndex] = value;
    onChange({ technologies: newTechnologies });
  };

  const removeTechnology = (techIndex: number) => {
    onChange({ technologies: item.technologies.filter((_, i) => i !== techIndex) });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Project Name</Label>
        <Input value={item.name} onChange={(e) => onChange({ name: e.target.value })} placeholder="Project Name" spellCheck />
      </div>
      <div className="space-y-2">
        <Label>Description</Label>
        <Textarea
          value={item.description}
          onChange={(e) => onChange({ description: e.target.value })}
          placeholder="Brief description of the project and your role..."
          rows={3}
          spellCheck
        />
      </div>
      <div className="space-y-2">
        <Label>Link (optional)</Label>
        <Input value={item.link} onChange={(e) => onChange({ link: e.target.value })} placeholder="https://github.com/username/project" />
      </div>
      <div className="space-y-2">
        <Label>Technologies</Label>
        {item.technologies.map((tech, techIndex) => (
          <div key={techIndex} className="flex gap-2">
            <Input
              value={tech}
              onChange={(e) => updateTechnology(techIndex, e.target.value)}
              placeholder="Technology name"
              spellCheck
            />
            <Button variant="ghost" size="sm" onClick={() => removeTechnology(techIndex)} className="text-red-600">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button onClick={addTechnology} variant="outline" size="sm" className="w-full">
          <Plus className="mr-2 h-4 w-4" />
          Add Technology
        </Button>
      </div>
    </div>
  );
}
