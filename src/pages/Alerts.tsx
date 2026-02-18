import { useState } from 'react';
import { alerts } from '@/data/mock';
import { RiskBadge } from '@/components/shared/RiskBadge';
import { ConfidencePill } from '@/components/shared/ConfidencePill';
import { PrivacyBadge } from '@/components/shared/PrivacyBadge';
import { MiniSparkline } from '@/components/shared/MiniSparkline';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import {
  Bell, Clock, Users, TrendingUp, CheckCheck,
  Siren, BellOff, ArrowUpRight, Filter, ChevronDown,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { AlertStatus, RiskLevel } from '@/data/mock';

const statusLabel: Record<AlertStatus, string> = {
  open: 'Open',
  acknowledged: 'Acknowledged',
  snoozed: 'Snoozed',
  escalated: 'Escalated',
};

const statusStyle: Record<AlertStatus, string> = {
  open: 'text-[hsl(var(--risk-high))] border-[hsl(var(--risk-high)/0.3)] bg-[hsl(var(--risk-high)/0.08)]',
  acknowledged: 'text-primary border-primary/30 bg-primary/10',
  snoozed: 'text-muted-foreground border-border bg-muted/50',
  escalated: 'text-[hsl(var(--risk-critical))] border-[hsl(var(--risk-critical)/0.3)] bg-[hsl(var(--risk-critical)/0.1)]',
};

export default function Alerts() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<'all' | RiskLevel>('all');

  const filtered = filter === 'all' ? alerts : alerts.filter((a) => a.riskLevel === filter);
  const counts = {
    all: alerts.length,
    critical: alerts.filter((a) => a.riskLevel === 'critical').length,
    high: alerts.filter((a) => a.riskLevel === 'high').length,
    moderate: alerts.filter((a) => a.riskLevel === 'moderate').length,
    low: alerts.filter((a) => a.riskLevel === 'low').length,
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border px-6 py-4 flex items-center justify-between sticky top-0 z-10 bg-background/95 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div>
            <h1 className="text-base font-semibold text-foreground flex items-center gap-2">
              <Bell className="w-4 h-4 text-[hsl(var(--risk-high))]" />
              Alerts
            </h1>
            <p className="text-[11px] font-mono text-muted-foreground mt-0.5">
              {alerts.filter(a => a.status === 'open').length} open · {alerts.length} total
            </p>
          </div>
        </div>
        <Button size="sm" variant="outline" className="text-xs gap-1.5">
          <Filter className="w-3.5 h-3.5" /> Filter <ChevronDown className="w-3 h-3" />
        </Button>
      </header>

      <div className="p-6 space-y-4">
        {/* Filter tabs */}
        <div className="flex items-center gap-1.5">
          {(['all', 'critical', 'high', 'moderate', 'low'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                'px-3 py-1.5 rounded text-xs font-medium font-mono transition-colors border',
                filter === f
                  ? 'bg-primary/15 text-primary border-primary/30'
                  : 'bg-muted/30 text-muted-foreground border-border hover:text-foreground'
              )}
            >
              {f.toUpperCase()} <span className="opacity-60 ml-1">{counts[f]}</span>
            </button>
          ))}
        </div>

        {/* Alert queue */}
        <div className="space-y-2">
          {filtered.map((alert) => (
            <div
              key={alert.id}
              onClick={() => navigate(`/alerts/${alert.id}`)}
              className="bg-card border border-border rounded-md p-4 cursor-pointer card-hover group"
            >
              <div className="flex items-start gap-4">
                {/* Risk indicator bar */}
                <div
                  className="w-0.5 self-stretch rounded-full shrink-0"
                  style={{
                    background: alert.riskLevel === 'critical' ? 'hsl(var(--risk-critical))' :
                                alert.riskLevel === 'high' ? 'hsl(var(--risk-high))' :
                                alert.riskLevel === 'moderate' ? 'hsl(var(--risk-moderate))' :
                                'hsl(var(--risk-low))'
                  }}
                />

                {/* Main content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <RiskBadge level={alert.riskLevel} />
                      <span
                        className={cn(
                          'text-[10px] font-mono px-1.5 py-0.5 rounded-sm border',
                          statusStyle[alert.status]
                        )}
                      >
                        {statusLabel[alert.status].toUpperCase()}
                      </span>
                      <ConfidencePill value={alert.confidence} />
                      <PrivacyBadge aggregationLevel={alert.aggregationLevel} />
                    </div>
                    <div className="text-right shrink-0">
                      <div
                        className="font-mono text-xl font-medium"
                        style={{
                          color: alert.riskLevel === 'critical' ? 'hsl(var(--risk-critical))' :
                                 alert.riskLevel === 'high' ? 'hsl(var(--risk-high))' :
                                 'hsl(var(--risk-moderate))'
                        }}
                      >
                        {alert.probability}%
                      </div>
                      <div className="data-label">prob.</div>
                    </div>
                  </div>

                  <p className="text-sm font-semibold text-foreground mb-0.5">{alert.type}</p>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs text-muted-foreground">{alert.regionName}</span>
                    <span className="text-[10px] text-border">·</span>
                    <span className="flex items-center gap-1 text-[11px] font-mono text-muted-foreground">
                      <Users className="w-3 h-3" />
                      ~{(alert.affectedPopulation / 1000).toFixed(0)}k population
                    </span>
                    <span className="text-[10px] text-border">·</span>
                    <span className="flex items-center gap-1 text-[11px] font-mono text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {alert.timeWindow}
                    </span>
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed mb-3 line-clamp-2">{alert.summary}</p>

                  {/* Drivers */}
                  <div className="flex items-center gap-4 mb-3">
                    <span className="data-label">Top drivers:</span>
                    {alert.drivers.map((d) => (
                      <div key={d.signal} className="flex items-center gap-2">
                        <div className="w-16 h-6">
                          <MiniSparkline data={d.sparkData} anomaly={d.anomaly} height={24} />
                        </div>
                        <div>
                          <div className="text-[10px] text-muted-foreground">{d.signal}</div>
                          <div className={cn('text-[11px] font-mono font-medium', d.direction === 'up' ? 'text-[hsl(var(--risk-high))]' : 'text-primary')}>
                            {d.value}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button size="sm" className="h-7 text-xs gap-1">
                      <TrendingUp className="w-3 h-3" /> Create action
                    </Button>
                    <Button size="sm" variant="outline" className="h-7 text-xs gap-1"
                      onClick={(e) => { e.stopPropagation(); navigate(`/alerts/${alert.id}`); }}>
                      <ArrowUpRight className="w-3 h-3" /> View detail
                    </Button>
                    <Button size="sm" variant="ghost" className="h-7 text-xs gap-1 text-muted-foreground">
                      <CheckCheck className="w-3 h-3" /> Acknowledge
                    </Button>
                    <Button size="sm" variant="ghost" className="h-7 text-xs gap-1 text-muted-foreground">
                      <BellOff className="w-3 h-3" /> Snooze
                    </Button>
                    <Button size="sm" variant="ghost" className="h-7 text-xs gap-1 text-muted-foreground">
                      <Siren className="w-3 h-3" /> Escalate
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
