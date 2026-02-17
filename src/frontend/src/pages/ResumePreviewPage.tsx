import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download } from 'lucide-react';
import { useResumeStore } from '../state/resumeStore';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { getTemplateRenderer } from '../templates/renderers';
import { downloadPDF } from '../features/export/pdfExport';

export function ResumePreviewPage() {
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

  const handleDownload = () => {
    const fileName = draftResumeData.personalInfo.fullName
      ? `${draftResumeData.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.pdf`
      : 'Resume.pdf';
    
    const element = document.getElementById('resume-preview');
    if (element) {
      downloadPDF(element, fileName);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-amber-900 dark:text-amber-100">Resume Preview</h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Review your resume and download as PDF
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate({ to: '/editor' })}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Editor
            </Button>
            <Button onClick={handleDownload} className="bg-amber-600 hover:bg-amber-700">
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
          </div>
        </div>

        <div className="max-w-[8.5in] mx-auto bg-white shadow-2xl" id="resume-preview">
          <div style={{ fontFamily: resumeFont }}>
            <TemplateComponent data={draftResumeData} />
          </div>
        </div>
      </div>
    </div>
  );
}
