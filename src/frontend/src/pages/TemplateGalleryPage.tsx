import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { templateCatalog, type TemplateCategory } from '../templates/templateCatalog';
import { useResumeStore } from '../state/resumeStore';

export function TemplateGalleryPage() {
  const navigate = useNavigate();
  const { selectedTemplateId, setSelectedTemplate } = useResumeStore();
  const [activeCategory, setActiveCategory] = useState<TemplateCategory>('Reverse-Chronological');

  const handleTemplateSelect = (templateId: string, category: TemplateCategory) => {
    setSelectedTemplate(templateId, category);
  };

  const handleContinue = () => {
    if (selectedTemplateId) {
      navigate({ to: '/editor' });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <img
            src="/assets/generated/resume-maker-hero.dim_1600x400.png"
            alt="Resume Maker Hero"
            className="w-full h-48 object-cover rounded-2xl shadow-lg mb-6"
          />
          <h2 className="text-4xl font-bold text-amber-900 dark:text-amber-100 mb-2">
            Choose Your Resume Template
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400">
            Select from over 20 ATS-friendly templates designed to help you land your dream job
          </p>
        </div>

        <Tabs value={activeCategory} onValueChange={(v) => setActiveCategory(v as TemplateCategory)}>
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="Reverse-Chronological">Reverse-Chronological</TabsTrigger>
            <TabsTrigger value="Functional (Skills-Based)">Functional (Skills-Based)</TabsTrigger>
            <TabsTrigger value="Hybrid (Combination)">Hybrid (Combination)</TabsTrigger>
          </TabsList>

          {(['Reverse-Chronological', 'Functional (Skills-Based)', 'Hybrid (Combination)'] as TemplateCategory[]).map(
            (category) => (
              <TabsContent key={category} value={category} className="space-y-4">
                <div className="mb-4">
                  <h3 className="text-2xl font-semibold text-amber-900 dark:text-amber-100 mb-2">{category}</h3>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    {category === 'Reverse-Chronological' &&
                      'Traditional format listing work experience from most recent to oldest. Best for consistent career progression.'}
                    {category === 'Functional (Skills-Based)' &&
                      'Emphasizes skills and abilities over chronological work history. Ideal for career changers or gaps in employment.'}
                    {category === 'Hybrid (Combination)' &&
                      'Combines skills-based and chronological formats. Perfect for highlighting both expertise and experience.'}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {templateCatalog[category].map((template) => (
                    <Card
                      key={template.id}
                      className={`cursor-pointer transition-all hover:shadow-lg ${
                        selectedTemplateId === template.id
                          ? 'ring-2 ring-amber-600 shadow-xl'
                          : 'hover:ring-1 hover:ring-amber-300'
                      }`}
                      onClick={() => handleTemplateSelect(template.id, category)}
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-lg">{template.name}</CardTitle>
                            <CardDescription className="mt-1">{template.description}</CardDescription>
                          </div>
                          {selectedTemplateId === template.id && (
                            <CheckCircle2 className="h-6 w-6 text-amber-600 flex-shrink-0 ml-2" />
                          )}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {template.features.map((feature) => (
                            <Badge key={feature} variant="secondary" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                        <div className="mt-4 h-32 bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-700 dark:to-neutral-800 rounded-lg flex items-center justify-center">
                          <span className="text-neutral-400 dark:text-neutral-500 text-sm">Template Preview</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            )
          )}
        </Tabs>

        {selectedTemplateId && (
          <div className="fixed bottom-8 right-8 z-40">
            <Button
              size="lg"
              onClick={handleContinue}
              className="bg-amber-600 hover:bg-amber-700 text-white shadow-2xl"
            >
              Continue to Editor
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
