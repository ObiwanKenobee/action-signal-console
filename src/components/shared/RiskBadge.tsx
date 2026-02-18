import { cn } from '@/lib/utils';
import type { RiskLevel } from '@/data/mock';

interface RiskBadgeProps {
  level: RiskLevel;
  className?: string;
  size?: 'sm' | 'md';
}

const config: Record<RiskLevel, { label: string; className: string }> = {
  critical: { label: 'CRITICAL', className: 'text-[hsl(var(--risk-critical))] border-[hsl(var(--risk-critical)/0.35)] bg-[hsl(var(--risk-critical)/0.1)]' },
  high: { label: 'HIGH', className: 'text-[hsl(var(--risk-high))] border-[hsl(var(--risk-high)/0.35)] bg-[hsl(var(--risk-high)/0.1)]' },
  moderate: { label: 'MODERATE', className: 'text-[hsl(var(--risk-moderate))] border-[hsl(var(--risk-moderate)/0.35)] bg-[hsl(var(--risk-moderate)/0.1)]' },
  low: { label: 'LOW', className: 'text-primary border-primary/30 bg-primary/10' },
};

export function RiskBadge({ level, className, size = 'sm' }: RiskBadgeProps) {
  const { label, className: levelClass } = config[level];
  return (
    <span
      className={cn(
        'inline-flex items-center border rounded-sm font-mono font-medium tracking-wide',
        size === 'sm' ? 'px-1.5 py-0.5 text-[10px]' : 'px-2 py-1 text-xs',
        levelClass,
        className
      )}
    >
      {label}
    </span>
  );
}
