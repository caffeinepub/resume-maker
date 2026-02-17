import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lightbulb } from 'lucide-react';
import { getSuggestions } from './keywordSuggestionEngine';

interface KeywordSuggestionsPanelProps {
  inputValue: string;
  onInsert: (keyword: string) => void;
  placeholder?: string;
}

export function KeywordSuggestionsPanel({ inputValue, onInsert, placeholder }: KeywordSuggestionsPanelProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const suggestions = useMemo(() => {
    return getSuggestions(inputValue);
  }, [inputValue]);

  if (suggestions.length === 0) return null;

  return (
    <div className="border border-amber-200 dark:border-amber-800 rounded-lg p-3 bg-amber-50/50 dark:bg-amber-950/20">
      <div className="flex items-start gap-2">
        <Lightbulb className="h-4 w-4 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-amber-900 dark:text-amber-100">
              {placeholder || 'Suggested Keywords'}
            </p>
            {suggestions.length > 4 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
                className="h-auto py-0 px-2 text-xs"
              >
                {isExpanded ? 'Show Less' : `Show All (${suggestions.length})`}
              </Button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {(isExpanded ? suggestions : suggestions.slice(0, 4)).map((keyword) => (
              <Badge
                key={keyword}
                variant="outline"
                className="cursor-pointer hover:bg-amber-100 dark:hover:bg-amber-900 transition-colors"
                onClick={() => onInsert(keyword)}
              >
                {keyword}
              </Badge>
            ))}
          </div>
          <p className="text-xs text-amber-700 dark:text-amber-300">
            Click a keyword to add it to your {placeholder?.toLowerCase() || 'text'}
          </p>
        </div>
      </div>
    </div>
  );
}
