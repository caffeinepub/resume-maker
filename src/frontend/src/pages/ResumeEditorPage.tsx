import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Eye } from 'lucide-react';
import { ResumeEditorForm } from '../features/editor/ResumeEditorForm';
import { useResumeStore } from '../state/resumeStore';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { getTemplateRenderer } from '../templates/renderers';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';

export function ResumeEditorPage() {
  const navigate = useNavigate();
  const { selectedTemplateId, draftResumeData, resumeFont } = useResumeStore();

  if (!selectedTemplateId) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert>
          <AlertDescription>
            Please select a template first.{' '}
            <Button variant="link" className="p-0 h-auto" onClick={() => navigate({ to: '/' })}>
              Go to template selection
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const TemplateComponent = getTemplateRenderer(selectedTemplateId);

  return (
    <div className="h-[calc(100vh-8rem)]">
      <div className="container mx-auto px-4 py-4 h-full">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-amber-900 dark:text-amber-100">Build Your Resume</h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Fill in your details and see the live preview update automatically
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => navigate({ to: '/' })}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Change Template
            </Button>
            <Button size="sm" onClick={() => navigate({ to: '/preview' })} variant="outline">
              <Eye className="mr-2 h-4 w-4" />
              Full Preview & Download
            </Button>
          </div>
        </div>

        <ResizablePanelGroup direction="horizontal" className="h-[calc(100%-5rem)] rounded-lg border">
          <ResizablePanel defaultSize={50} minSize={30}>
            <div className="h-full overflow-y-auto p-6 bg-white dark:bg-neutral-900">
              <ResumeEditorForm />
            </div>
          </ResizablePanel>
          
          <ResizableHandle withHandle />
          
          <ResizablePanel defaultSize={50} minSize={30}>
            <div className="h-full overflow-y-auto p-6 bg-neutral-50 dark:bg-neutral-800">
              <div className="max-w-[8.5in] mx-auto bg-white shadow-lg">
                <div style={{ fontFamily: resumeFont }}>
                  <TemplateComponent data={draftResumeData} />
                </div>
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}
