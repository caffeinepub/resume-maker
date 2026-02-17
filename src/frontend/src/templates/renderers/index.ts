import { BaseResumeTemplate } from '../BaseResumeTemplate';
import type { ResumeData } from '../../features/editor/types';

export function getTemplateRenderer(templateId: string): React.ComponentType<{ data: ResumeData }> {
  // For now, all templates use the base template
  // In a full implementation, you would map specific template IDs to their custom renderers
  return BaseResumeTemplate;
}
