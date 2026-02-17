import { useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronUp, Lightbulb } from 'lucide-react';
import type { TipContent } from './tipContent';

interface InlineTipProps {
  content: TipContent;
}

export function InlineTip({ content }: InlineTipProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Alert className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
        <Lightbulb className="h-4 w-4 text-blue-600 dark:text-blue-400" />
        <div className="flex items-start justify-between">
          <AlertTitle className="text-blue-900 dark:text-blue-100">{content.title}</AlertTitle>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0 ml-2">
              {isOpen ? (
                <ChevronUp className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              ) : (
                <ChevronDown className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              )}
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent>
          <AlertDescription className="text-blue-800 dark:text-blue-200 mt-2">
            <ul className="list-disc list-inside space-y-1 text-sm">
              {content.points.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </AlertDescription>
        </CollapsibleContent>
      </Alert>
    </Collapsible>
  );
}
