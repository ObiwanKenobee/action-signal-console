import { Shield } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface PrivacyBadgeProps {
  aggregationLevel?: string;
  className?: string;
}

export function PrivacyBadge({ aggregationLevel = 'county', className }: PrivacyBadgeProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span
          className={cn(
            'inline-flex items-center gap-1 px-1.5 py-0.5 rounded-sm border text-[10px] font-mono cursor-help',
            'text-primary/70 border-primary/20 bg-primary/5',
            className
          )}
        >
          <Shield className="w-2.5 h-2.5" />
          <span>PRIV</span>
        </span>
      </TooltipTrigger>
      <TooltipContent className="max-w-56 text-xs" side="top">
        <p className="font-medium mb-1">Privacy applied</p>
        <p className="text-muted-foreground">
          Differential privacy applied. Data aggregated at{' '}
          <span className="text-foreground font-medium">{aggregationLevel}</span> level.
          No individual records accessible through this interface.
        </p>
      </TooltipContent>
    </Tooltip>
  );
}
