import { cn } from '@/lib/utils';

interface ConfidencePillProps {
  value: number;
  className?: string;
  size?: 'sm' | 'md';
}

export function ConfidencePill({ value, className, size = 'sm' }: ConfidencePillProps) {
  const level = value >= 80 ? 'high' : value >= 60 ? 'medium' : 'low';

  const colors = {
    high: 'text-primary border-primary/30 bg-primary/10',
    medium: 'text-[hsl(var(--risk-moderate))] border-[hsl(var(--risk-moderate))/30] bg-[hsl(var(--risk-moderate))/10]',
    low: 'text-muted-foreground border-border bg-muted/50',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 border rounded-sm font-mono',
        size === 'sm' ? 'px-1.5 py-0.5 text-[10px]' : 'px-2 py-1 text-xs',
        colors[level],
        className
      )}
    >
      <span className="opacity-60">CONF</span>
      <span className="font-medium">{value}%</span>
    </span>
  );
}
