import { useState } from 'react';
import { actions } from '@/data/mock';
import { RiskBadge } from '@/components/shared/RiskBadge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  ClipboardList, CheckSquare, Square, Clock, Users,
  AlertCircle, CheckCircle2, Plus, ChevronDown, ChevronUp,
} from 'lucide-react';
import type { ActionStatus } from '@/data/mock';

const columns: { status: ActionStatus; label: string; color: string }[] = [
  { status: 'planned', label: 'Planned', color: 'text-[hsl(var(--status-planned))]' },
  { status: 'active', label: 'Active', color: 'text-[hsl(var(--status-active))]' },
  { status: 'blocked', label: 'Blocked', color: 'text-[hsl(var(--risk-moderate))]' },
  { status: 'completed', label: 'Completed', color: 'text-[hsl(var(--status-complete))]' },
];

const statusDot: Record<ActionStatus, string> = {
  planned: 'bg-[hsl(var(--status-planned))]',
  active: 'bg-[hsl(var(--status-active))]',
  blocked: 'bg-[hsl(var(--risk-moderate))]',
  completed: 'bg-[hsl(var(--status-complete))]',
};

function ActionCard({ action }: { action: typeof actions[0] }) {
  const [expanded, setExpanded] = useState(false);
  const pct = Math.round((action.completedSteps.length / action.playbook.length) * 100);

  return (
    <div className="bg-card border border-border rounded-md overflow-hidden">
      <div className="p-3 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <p className="text-xs font-semibold text-foreground leading-snug">{action.title}</p>
          <RiskBadge level={action.priority} />
        </div>

        <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-mono">
          <span className="flex items-center gap-1"><Users className="w-2.5 h-2.5" />{action.assignedTeam}</span>
        </div>

        <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-mono">
          <Clock className="w-2.5 h-2.5" />
          Due {new Date(action.dueDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
        </div>

        {/* Progress */}
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <span className="text-[10px] text-muted-foreground">
              {action.completedSteps.length}/{action.playbook.length} steps
            </span>
            <span className="font-mono text-[10px] text-foreground">{pct}%</span>
          </div>
          <div className="h-1 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full rounded-full transition-all"
              style={{
                width: `${pct}%`,
                background: action.status === 'blocked'
                  ? 'hsl(var(--risk-moderate))'
                  : action.status === 'completed'
                  ? 'hsl(var(--status-complete))'
                  : 'hsl(var(--primary))'
              }}
            />
          </div>
        </div>
      </div>

      {/* Expand toggle */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-3 py-2 border-t border-border text-[10px] text-muted-foreground hover:text-foreground hover:bg-muted/20 transition-colors"
      >
        <span>Playbook checklist</span>
        {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
      </button>

      {expanded && (
        <div className="px-3 pb-3 space-y-1.5 border-t border-border bg-muted/10">
          <div className="pt-2" />
          {action.playbook.map((step, i) => {
            const done = action.completedSteps.includes(i);
            return (
              <div key={i} className="flex items-start gap-2">
                {done ? (
                  <CheckSquare className="w-3 h-3 text-primary mt-0.5 shrink-0" />
                ) : (
                  <Square className="w-3 h-3 text-muted-foreground mt-0.5 shrink-0" />
                )}
                <span className={cn('text-[11px] leading-snug', done ? 'text-muted-foreground line-through' : 'text-foreground')}>
                  {step}
                </span>
              </div>
            );
          })}

          {action.resourceRequests.length > 0 && (
            <div className="pt-2 border-t border-border mt-2">
              <p className="data-label mb-1.5">Resources requested</p>
              {action.resourceRequests.map((r) => (
                <div key={r} className={cn('flex items-center gap-1.5 text-[11px]', r.includes('BLOCKED') ? 'text-[hsl(var(--risk-moderate))]' : 'text-muted-foreground')}>
                  {r.includes('BLOCKED') ? (
                    <AlertCircle className="w-3 h-3 shrink-0" />
                  ) : (
                    <CheckCircle2 className="w-3 h-3 shrink-0 text-muted-foreground/50" />
                  )}
                  {r}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function Actions() {
  const total = actions.length;
  const active = actions.filter(a => a.status === 'active').length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border px-6 py-4 flex items-center justify-between sticky top-0 z-10 bg-background/95 backdrop-blur-sm">
        <div>
          <h1 className="text-base font-semibold text-foreground flex items-center gap-2">
            <ClipboardList className="w-4 h-4 text-primary" />
            Actions
          </h1>
          <p className="text-[11px] font-mono text-muted-foreground mt-0.5">
            {active} active · {total} total
          </p>
        </div>
        <Button size="sm" className="gap-1.5 text-xs">
          <Plus className="w-3.5 h-3.5" /> Create action
        </Button>
      </header>

      <div className="p-6">
        {/* Kanban */}
        <div className="grid grid-cols-4 gap-4">
          {columns.map((col) => {
            const colActions = actions.filter((a) => a.status === col.status);
            return (
              <div key={col.status} className="space-y-3">
                {/* Column header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={cn('w-1.5 h-1.5 rounded-full', statusDot[col.status])} />
                    <span className={cn('text-xs font-semibold', col.color)}>{col.label}</span>
                  </div>
                  <span className="font-mono text-[10px] text-muted-foreground bg-muted/50 border border-border px-1.5 py-0.5 rounded">
                    {colActions.length}
                  </span>
                </div>

                {/* Drop zone */}
                <div className="space-y-2 min-h-32">
                  {colActions.map((action) => (
                    <ActionCard key={action.id} action={action} />
                  ))}
                  {colActions.length === 0 && (
                    <div className="border border-dashed border-border rounded-md p-4 flex items-center justify-center">
                      <span className="text-[11px] text-muted-foreground">No actions</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
