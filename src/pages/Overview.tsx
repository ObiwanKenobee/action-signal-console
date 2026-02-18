import { alerts, actions, coverageMetrics } from '@/data/mock';
import { RiskBadge } from '@/components/shared/RiskBadge';
import { ConfidencePill } from '@/components/shared/ConfidencePill';
import { PrivacyBadge } from '@/components/shared/PrivacyBadge';
import { MiniSparkline } from '@/components/shared/MiniSparkline';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  TrendingUp,
  Clock,
  Activity,
  Shield,
  AlertTriangle,
  CheckCircle2,
  Zap,
  Users,
  Database,
} from 'lucide-react';
import { cn } from '@/lib/utils';

function CoverageBar({ value, label }: { value: number; label: string }) {
  const color = value >= 80 ? 'bg-primary' : value >= 60 ? 'bg-[hsl(var(--risk-moderate))]' : 'bg-[hsl(var(--risk-high))]';
  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <span className="text-[11px] text-muted-foreground">{label}</span>
        <span className="font-mono text-[11px] text-foreground">{value}%</span>
      </div>
      <div className="h-1 rounded-full bg-muted overflow-hidden">
        <div className={cn('h-full rounded-full transition-all', color)} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

export default function Overview() {
  const navigate = useNavigate();
  const openAlerts = alerts.filter((a) => a.status === 'open' || a.status === 'acknowledged');
  const rising = openAlerts.slice(0, 5);
  const actionWindows = alerts.filter((a) => a.riskLevel === 'critical' || a.riskLevel === 'high').slice(0, 4);
  const activeActions = actions.filter((a) => a.status === 'active');

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border px-6 py-4 flex items-center justify-between sticky top-0 z-10 bg-background/95 backdrop-blur-sm">
        <div>
          <h1 className="text-base font-semibold text-foreground">Command Brief</h1>
          <p className="text-[11px] font-mono text-muted-foreground mt-0.5">
            Week of 17 Feb 2026 · <span className="text-primary pulse-dot">Live</span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded border border-border bg-muted/30 text-[11px] font-mono">
            <Shield className="w-3 h-3 text-primary" />
            <span className="text-muted-foreground">Privacy active</span>
          </div>
          <Button size="sm" variant="outline" className="text-xs gap-1.5">
            <FileText className="w-3.5 h-3.5" />
            Export brief
          </Button>
        </div>
      </header>

      <div className="p-6 space-y-6">
        {/* Coverage strip */}
        <div className="grid grid-cols-5 gap-3">
          {[
            { label: 'Regions monitored', value: coverageMetrics.regionsMonitored, icon: Database, unit: '' },
            { label: 'Active signals', value: coverageMetrics.signalsActive, icon: Activity, unit: '' },
            { label: 'Open alerts', value: coverageMetrics.alertsOpen, icon: AlertTriangle, unit: '' },
            { label: 'Actions in progress', value: coverageMetrics.actionsInProgress, icon: Zap, unit: '' },
            { label: 'Model confidence', value: coverageMetrics.modelConfidence, icon: CheckCircle2, unit: '%' },
          ].map((m) => (
            <div key={m.label} className="bg-card border border-border rounded-md p-3 space-y-1">
              <div className="flex items-center justify-between">
                <span className="data-label">{m.label}</span>
                <m.icon className="w-3.5 h-3.5 text-muted-foreground" />
              </div>
              <div className="font-mono text-2xl font-medium text-foreground">
                {m.value}{m.unit}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Rising risks — col 8 */}
          <section className="col-span-8 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-[hsl(var(--risk-high))]" />
                Top rising risks
              </h2>
              <button
                onClick={() => navigate('/alerts')}
                className="text-[11px] text-primary hover:text-primary/80 flex items-center gap-1"
              >
                All alerts <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="space-y-2">
              {rising.map((alert) => (
                <div
                  key={alert.id}
                  onClick={() => navigate(`/alerts/${alert.id}`)}
                  className="bg-card border border-border rounded-md p-4 cursor-pointer card-hover group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-2">
                        <RiskBadge level={alert.riskLevel} />
                        <span className="text-[11px] font-mono text-muted-foreground">{alert.regionName}</span>
                        <ConfidencePill value={alert.confidence} />
                        <PrivacyBadge aggregationLevel={alert.aggregationLevel} />
                      </div>
                      <p className="text-sm font-medium text-foreground mb-1">{alert.type}</p>
                      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-1">{alert.summary}</p>
                    </div>

                    <div className="shrink-0 text-right space-y-1">
                      <div className="font-mono text-2xl font-medium" style={{
                        color: alert.riskLevel === 'critical' ? 'hsl(var(--risk-critical))' :
                               alert.riskLevel === 'high' ? 'hsl(var(--risk-high))' :
                               'hsl(var(--risk-moderate))'
                      }}>
                        {alert.probability}%
                      </div>
                      <div className="data-label">probability</div>
                      <div className="text-[10px] font-mono text-muted-foreground flex items-center gap-1 justify-end">
                        <Clock className="w-2.5 h-2.5" />
                        {alert.timeWindow}
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex gap-3">
                      {alert.drivers.slice(0, 2).map((d) => (
                        <div key={d.signal} className="w-20 h-8">
                          <MiniSparkline data={d.sparkData} anomaly={d.anomaly} />
                        </div>
                      ))}
                    </div>
                    <Button
                      size="sm"
                      className="text-xs h-7 opacity-0 group-hover:opacity-100 transition-opacity gap-1"
                      onClick={(e) => { e.stopPropagation(); navigate(`/alerts/${alert.id}`); }}
                    >
                      Take action <ArrowRight className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Right column — col 4 */}
          <div className="col-span-4 space-y-4">
            {/* Actionable windows */}
            <section className="space-y-3">
              <h2 className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-primary" />
                Actionable windows
              </h2>
              <div className="space-y-2">
                {actionWindows.map((a) => (
                  <div
                    key={a.id}
                    onClick={() => navigate(`/alerts/${a.id}`)}
                    className="bg-card border border-border rounded-md p-3 cursor-pointer card-hover"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-foreground truncate">{a.type}</span>
                      <RiskBadge level={a.riskLevel} />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-muted-foreground">{a.regionName}</span>
                      <span className="text-[11px] font-mono text-primary">{a.timeWindow}</span>
                    </div>
                    <div className="mt-2 flex items-center gap-1">
                      <Users className="w-3 h-3 text-muted-foreground" />
                      <span className="text-[10px] font-mono text-muted-foreground">
                        ~{(a.affectedPopulation / 1000).toFixed(0)}k people
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Active actions */}
            <section className="space-y-3">
              <h2 className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-[hsl(var(--status-active))]" />
                Actions in progress
              </h2>
              <div className="space-y-2">
                {activeActions.map((action) => {
                  const pct = Math.round((action.completedSteps.length / action.playbook.length) * 100);
                  return (
                    <div
                      key={action.id}
                      onClick={() => navigate('/actions')}
                      className="bg-card border border-border rounded-md p-3 cursor-pointer card-hover"
                    >
                      <p className="text-xs font-medium text-foreground mb-1 line-clamp-1">{action.title}</p>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] text-muted-foreground">{action.assignedTeam}</span>
                        <span className="font-mono text-[10px] text-foreground">{pct}% done</span>
                      </div>
                      <div className="h-1 rounded-full bg-muted overflow-hidden">
                        <div className="h-full rounded-full bg-primary confidence-fill" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
              <button
                onClick={() => navigate('/actions')}
                className="w-full text-center text-xs text-primary hover:text-primary/80 py-1"
              >
                View all actions →
              </button>
            </section>

            {/* Coverage quality */}
            <section className="space-y-3">
              <h2 className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                <Database className="w-4 h-4 text-muted-foreground" />
                Signal coverage
              </h2>
              <div className="bg-card border border-border rounded-md p-3 space-y-3">
                <CoverageBar value={coverageMetrics.signalCoverage} label="Signal coverage" />
                <CoverageBar value={coverageMetrics.dataFreshness} label="Data freshness" />
                <CoverageBar value={coverageMetrics.modelConfidence} label="Model confidence" />
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function FileText(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/>
      <line x1="10" y1="9" x2="8" y2="9"/>
    </svg>
  );
}
