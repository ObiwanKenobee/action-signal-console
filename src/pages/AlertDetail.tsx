import { useParams, useNavigate } from 'react-router-dom';
import { alerts } from '@/data/mock';
import { RiskBadge } from '@/components/shared/RiskBadge';
import { ConfidencePill } from '@/components/shared/ConfidencePill';
import { PrivacyBadge } from '@/components/shared/PrivacyBadge';
import { MiniSparkline } from '@/components/shared/MiniSparkline';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft, TrendingUp, AlertTriangle, Clock, Users,
  Eye, CheckCheck, BellOff, Siren, BookOpen, ChevronRight,
  Info,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const interventions = [
  { title: 'Deploy hydration units + ORS distribution', cost: '$2,400', feasibility: 'High', impact: 'High', timeline: '3 days' },
  { title: 'Community radio alert + heat advisory', cost: '$180', feasibility: 'Very High', impact: 'Medium', timeline: '1 day' },
  { title: 'Health facility surge readiness briefing', cost: '$340', feasibility: 'High', impact: 'Medium', timeline: '2 days' },
  { title: 'CHW proactive home visit sweep', cost: '$1,200', feasibility: 'Medium', impact: 'High', timeline: '5 days' },
];

const auditTrail = [
  { action: 'Alert generated', by: 'PHES Model v2.4', time: '2026-02-17 06:00 UTC' },
  { action: 'Alert viewed', by: 'Dr. A. Omondi (County Director)', time: '2026-02-17 07:14 UTC' },
  { action: 'Alert viewed', by: 'J. Muthoni (Ops Lead, Turkana)', time: '2026-02-17 08:32 UTC' },
  { action: 'Action AC-001 created', by: 'J. Muthoni', time: '2026-02-17 09:01 UTC' },
];

export default function AlertDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const alert = alerts.find((a) => a.id === id) || alerts[0];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border px-6 py-4 flex items-center gap-4 sticky top-0 z-10 bg-background/95 backdrop-blur-sm">
        <button
          onClick={() => navigate('/alerts')}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <RiskBadge level={alert.riskLevel} size="md" />
            <h1 className="text-base font-semibold text-foreground">{alert.type}</h1>
          </div>
          <p className="text-[11px] font-mono text-muted-foreground mt-0.5">{alert.regionName} · Alert #{alert.id.toUpperCase()}</p>
        </div>
        <div className="flex items-center gap-2">
          <ConfidencePill value={alert.confidence} size="md" />
          <PrivacyBadge aggregationLevel={alert.aggregationLevel} />
          <Button size="sm" className="gap-1.5 text-xs">
            <TrendingUp className="w-3.5 h-3.5" /> Create action
          </Button>
          <Button size="sm" variant="outline" className="gap-1.5 text-xs">
            <CheckCheck className="w-3.5 h-3.5" /> Acknowledge
          </Button>
        </div>
      </header>

      <div className="p-6 grid grid-cols-12 gap-6">
        {/* Left: main detail — col 8 */}
        <div className="col-span-8 space-y-6">
          {/* Summary */}
          <section className="bg-card border border-border rounded-md p-5 space-y-3">
            <h2 className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Summary</h2>
            <p className="text-sm text-foreground leading-relaxed">{alert.summary}</p>

            <div className="grid grid-cols-4 gap-4 pt-2 border-t border-border">
              <div>
                <div className="data-label mb-1">Probability</div>
                <div
                  className="font-mono text-2xl font-medium"
                  style={{
                    color: alert.riskLevel === 'critical' ? 'hsl(var(--risk-critical))' :
                           alert.riskLevel === 'high' ? 'hsl(var(--risk-high))' :
                           'hsl(var(--risk-moderate))'
                  }}
                >
                  {alert.probability}%
                </div>
              </div>
              <div>
                <div className="data-label mb-1">Time window</div>
                <div className="font-mono text-sm font-medium text-foreground flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                  {alert.timeWindow}
                </div>
              </div>
              <div>
                <div className="data-label mb-1">Affected pop.</div>
                <div className="font-mono text-sm font-medium text-foreground flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-muted-foreground" />
                  ~{(alert.affectedPopulation / 1000).toFixed(0)}k
                </div>
              </div>
              <div>
                <div className="data-label mb-1">Aggregation</div>
                <div className="font-mono text-sm font-medium text-foreground">{alert.aggregationLevel}</div>
              </div>
            </div>
          </section>

          {/* Drivers */}
          <section className="bg-card border border-border rounded-md p-5 space-y-4">
            <h2 className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Signal Drivers</h2>
            <div className="space-y-4">
              {alert.drivers.map((d, i) => (
                <div key={d.signal} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] text-muted-foreground">{String(i + 1).padStart(2, '0')}</span>
                      <span className="text-sm font-medium text-foreground">{d.signal}</span>
                      {d.anomaly && (
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-sm border text-[hsl(var(--risk-moderate))] border-[hsl(var(--risk-moderate)/0.3)] bg-[hsl(var(--risk-moderate)/0.08)]">
                          ANOMALY
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={cn('font-mono text-sm font-medium', d.direction === 'up' ? 'text-[hsl(var(--risk-high))]' : 'text-primary')}>
                        {d.value}
                      </span>
                      <span className="text-xs text-muted-foreground">{d.change}</span>
                    </div>
                  </div>
                  <div className="h-12 w-full">
                    <MiniSparkline data={d.sparkData} anomaly={d.anomaly} height={48} />
                  </div>
                  {i < alert.drivers.length - 1 && <div className="border-t border-border" />}
                </div>
              ))}
            </div>
          </section>

          {/* Suggested interventions */}
          <section className="bg-card border border-border rounded-md p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Suggested interventions</h2>
              <span className="text-[11px] text-muted-foreground">ranked by feasibility × impact</span>
            </div>
            <div className="space-y-2">
              {interventions.map((iv, i) => (
                <div key={iv.title} className="flex items-center gap-3 p-3 rounded border border-border bg-muted/20 hover:bg-muted/40 transition-colors cursor-pointer group">
                  <span className="font-mono text-[10px] text-muted-foreground w-4 shrink-0">{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground">{iv.title}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-[10px] font-mono text-muted-foreground">Cost: <span className="text-foreground">{iv.cost}</span></span>
                      <span className="text-[10px] font-mono text-muted-foreground">Feasibility: <span className="text-primary">{iv.feasibility}</span></span>
                      <span className="text-[10px] font-mono text-muted-foreground">Impact: <span className="text-foreground">{iv.impact}</span></span>
                      <span className="text-[10px] font-mono text-muted-foreground">ETA: <span className="text-foreground">{iv.timeline}</span></span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button size="sm" className="h-6 text-xs gap-1 px-2">
                      <BookOpen className="w-3 h-3" /> Playbook
                    </Button>
                    <Button size="sm" variant="outline" className="h-6 text-xs px-2">Deploy</Button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right column: col 4 */}
        <div className="col-span-4 space-y-4">
          {/* Quick actions */}
          <section className="bg-card border border-border rounded-md p-4 space-y-2">
            <h2 className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-3">Quick actions</h2>
            {[
              { label: 'Create action from alert', icon: TrendingUp, primary: true },
              { label: 'Acknowledge', icon: CheckCheck, primary: false },
              { label: 'Snooze (with reason)', icon: BellOff, primary: false },
              { label: 'Escalate to Ministry', icon: Siren, primary: false },
            ].map((qa) => (
              <button
                key={qa.label}
                className={cn(
                  'w-full flex items-center justify-between px-3 py-2 rounded text-xs font-medium border transition-colors',
                  qa.primary
                    ? 'bg-primary/15 text-primary border-primary/30 hover:bg-primary/25'
                    : 'bg-muted/20 text-muted-foreground border-border hover:text-foreground hover:bg-muted/40'
                )}
              >
                <div className="flex items-center gap-2">
                  <qa.icon className="w-3.5 h-3.5" />
                  {qa.label}
                </div>
                <ChevronRight className="w-3 h-3" />
              </button>
            ))}
          </section>

          {/* Context */}
          <section className="bg-card border border-border rounded-md p-4 space-y-3">
            <h2 className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Alert context</h2>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Alert ID</span>
                <span className="font-mono text-foreground">{alert.id.toUpperCase()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Generated</span>
                <span className="font-mono text-foreground">{new Date(alert.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Region</span>
                <span className="font-mono text-foreground">{alert.regionName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Aggregation</span>
                <span className="font-mono text-foreground capitalize">{alert.aggregationLevel}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Privacy</span>
                <PrivacyBadge aggregationLevel={alert.aggregationLevel} />
              </div>
            </div>
          </section>

          {/* Audit trail */}
          <section className="bg-card border border-border rounded-md p-4 space-y-3">
            <h2 className="text-xs font-mono text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
              <Eye className="w-3 h-3" /> Audit trail
            </h2>
            <div className="space-y-3">
              {auditTrail.map((entry, i) => (
                <div key={i} className="flex gap-2">
                  <div className="flex flex-col items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1 shrink-0" />
                    {i < auditTrail.length - 1 && <div className="w-px flex-1 bg-border mt-1" />}
                  </div>
                  <div className="pb-3">
                    <p className="text-xs font-medium text-foreground">{entry.action}</p>
                    <p className="text-[10px] text-muted-foreground">{entry.by}</p>
                    <p className="text-[10px] font-mono text-muted-foreground/60">{entry.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Privacy note */}
          <div className="flex items-start gap-2 p-3 rounded border border-primary/15 bg-primary/5 text-xs text-muted-foreground">
            <Info className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
            <p>No individual records exist in this view. All data is aggregated at {alert.aggregationLevel} level with differential privacy applied.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
