import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lightbulb } from 'lucide-react';
import { useResumeStore } from '../../state/resumeStore';
import { generateHeadlineSuggestions } from './headlineSuggestionEngine';

export function HeadlineSuggestionsPanel() {
  const { draftResumeData, updateHeadline } = useResumeStore();
  const suggestions = generateHeadlineSuggestions(draftResumeData);

  if (suggestions.length === 0) {
    return null;
  }

  return (
    <Card className="bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-amber-600 dark:text-amber-400" />
          <CardTitle className="text-base">Headline Suggestions</CardTitle>
        </div>
        <CardDescription>Click any suggestion to use it as your headline</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {suggestions.map((suggestion, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="cursor-pointer hover:bg-amber-200 dark:hover:bg-amber-900 transition-colors px-3 py-1.5"
              onClick={() => updateHeadline(suggestion)}
            >
              {suggestion}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
