import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { Sparkles } from 'lucide-react';
import { actionVerbs } from './actionVerbs';

interface ActionVerbHelperProps {
  onApply: (verb: string) => void;
}

export function ActionVerbHelper({ onApply }: ActionVerbHelperProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-8 gap-1 text-xs"
          type="button"
        >
          <Sparkles className="h-3 w-3" />
          Action Verbs
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-48 max-h-80 overflow-y-auto">
        <DropdownMenuLabel className="text-xs">Strong Action Verbs</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {actionVerbs.map((verb) => (
          <DropdownMenuItem
            key={verb}
            onClick={() => onApply(verb)}
            className="cursor-pointer text-sm"
          >
            {verb}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
