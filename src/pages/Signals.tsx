import { useState } from 'react';
import { signals } from '@/data/mock';
import { cn } from '@/lib/utils';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, ReferenceLine, Legend,
} from 'recharts';
import { Activity, AlertTriangle, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { RiskBadge } from '@/components/shared/RiskBadge';

const signalColors: Record<string, string> = {
  heat: 'hsl(15 88% 52%)',
  water: 'hsl(205 90% 52%)',
  disease: 'hsl(290 60% 55%)',
  absenteeism: 'hsl(35 95% 52%)',
  ors: 'hsl(174 68% 42%)',
  aqi: 'hsl(48 90% 52%)',
};

export default function Signals() {
  const [selectedSignals, setSelectedSignals] = useState<string[]>(['s1', 's4']);

  const toggleSignal = (id: string) => {
    setSelectedSignals(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  // Merge data for multi-line chart
  const mergedData = signals[0].data.map((_, dayIdx) => {
    const point: Record<string, string | number> = { date: signals[0].data[dayIdx].date };
    selectedSignals.forEach(sid => {
      const sig = signals.find(s => s.id === sid);
      if (sig) point[sid] = sig.data[dayIdx]?.value ?? 0;
    });
    return point;
  });

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border px-6 py-4 sticky top-0 z-10 bg-background/95 backdrop-blur-sm">
        <h1 className="text-base font-semibold text-foreground flex items-center gap-2">
          <Activity className="w-4 h-4 text-primary" />
          Signals Explorer
        </h1>
        <p className="text-[11px] font-mono text-muted-foreground mt-0.5">30-day time series · Select signals to overlay</p>
      </header>

      <div className="p-6 grid grid-cols-12 gap-6">
        {/* Signal selector — col 4 */}
        <div className="col-span-4 space-y-2">
          <p className="data-label mb-3">Available signals ({signals.length})</p>
          {signals.map((sig) => {
            const selected = selectedSignals.includes(sig.id);
            return (
              <button
                key={sig.id}
                onClick={() => toggleSignal(sig.id)}
                className={cn(
                  'w-full flex items-start gap-3 p-3 rounded-md border text-left transition-colors',
                  selected
                    ? 'border-border bg-card'
                    : 'border-transparent bg-muted/10 hover:bg-muted/20'
                )}
              >
                <div
                  className="w-2 h-2 rounded-full mt-1 shrink-0"
                  style={{ background: signalColors[sig.type], opacity: selected ? 1 : 0.4 }}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <p className={cn('text-xs font-medium', selected ? 'text-foreground' : 'text-muted-foreground')}>
                      {sig.name}
                    </p>
                    {sig.anomaly && (
                      <AlertTriangle className="w-3 h-3 text-[hsl(var(--risk-high))] shrink-0" />
                    )}
                  </div>
                  <p className="text-[10px] text-muted-foreground">{sig.regionName}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-mono text-[11px] text-foreground">
                      {sig.currentValue} {sig.unit}
                    </span>
                    {sig.trend === 'rising' && <TrendingUp className="w-3 h-3 text-[hsl(var(--risk-high))]" />}
                    {sig.trend === 'falling' && <TrendingDown className="w-3 h-3 text-primary" />}
                    {sig.trend === 'stable' && <Minus className="w-3 h-3 text-muted-foreground" />}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Chart — col 8 */}
        <div className="col-span-8 space-y-4">
          {/* Summary cards */}
          <div className="grid grid-cols-3 gap-3">
            {selectedSignals.map(sid => {
              const sig = signals.find(s => s.id === sid);
              if (!sig) return null;
              return (
                <div key={sid} className="bg-card border border-border rounded-md p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] text-muted-foreground">{sig.name}</span>
                    <div className="w-2 h-2 rounded-full" style={{ background: signalColors[sig.type] }} />
                  </div>
                  <div className="font-mono text-lg font-medium text-foreground">
                    {sig.currentValue} <span className="text-xs text-muted-foreground">{sig.unit}</span>
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    {sig.anomaly && <RiskBadge level="high" />}
                    <span className="text-[10px] text-muted-foreground capitalize">{sig.trend}</span>
                  </div>
                </div>
              );
            })}
            {selectedSignals.length === 0 && (
              <div className="col-span-3 text-center py-4 text-xs text-muted-foreground">
                Select signals from the left panel to compare
              </div>
            )}
          </div>

          {/* Multi-line chart */}
          <div className="bg-card border border-border rounded-md p-4">
            <p className="data-label mb-4">30-day overlay</p>
            {selectedSignals.length > 0 ? (
              <ResponsiveContainer width="100%" height={340}>
                <LineChart data={mergedData} margin={{ top: 4, right: 8, bottom: 4, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 16% 18%)" />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 9, fill: 'hsl(215 12% 48%)', fontFamily: 'JetBrains Mono' }}
                    tickLine={false}
                    interval={6}
                    tickFormatter={(v) => v.slice(5)}
                  />
                  <YAxis
                    tick={{ fontSize: 9, fill: 'hsl(215 12% 48%)', fontFamily: 'JetBrains Mono' }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      background: 'hsl(220 20% 10%)',
                      border: '1px solid hsl(220 16% 18%)',
                      borderRadius: '4px',
                      fontSize: '11px',
                      fontFamily: 'JetBrains Mono',
                    }}
                  />
                  <Legend
                    formatter={(value) => {
                      const sig = signals.find(s => s.id === value);
                      return <span style={{ fontSize: '10px', color: 'hsl(215 15% 65%)' }}>{sig?.name}</span>;
                    }}
                  />
                  <ReferenceLine
                    x={mergedData[23]?.date as string}
                    stroke="hsl(35 95% 52% / 0.4)"
                    strokeDasharray="4 2"
                    label={{ value: 'Anomaly window', fontSize: 9, fill: 'hsl(35 95% 52%)' }}
                  />
                  {selectedSignals.map(sid => {
                    const sig = signals.find(s => s.id === sid);
                    if (!sig) return null;
                    return (
                      <Line
                        key={sid}
                        type="monotone"
                        dataKey={sid}
                        stroke={signalColors[sig.type]}
                        strokeWidth={1.5}
                        dot={false}
                        isAnimationActive={false}
                      />
                    );
                  })}
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-64 flex items-center justify-center text-xs text-muted-foreground">
                No signals selected
              </div>
            )}
          </div>

          {/* Coverage note */}
          <div className="bg-card border border-border rounded-md p-3 flex items-center justify-between">
            <div className="text-xs text-muted-foreground">
              Data coverage: <span className="text-foreground font-mono">83%</span> of monitored regions ·{' '}
              Last update: <span className="text-foreground font-mono">2026-02-17 06:00 UTC</span>
            </div>
            <button className="text-xs text-primary hover:text-primary/80">Download aggregate CSV →</button>
          </div>
        </div>
      </div>
    </div>
  );
}
