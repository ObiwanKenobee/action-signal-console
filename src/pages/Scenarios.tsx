import { GitBranch, Sliders, Info } from 'lucide-react';
import { useState } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend,
} from 'recharts';

const baseScenario = Array.from({ length: 21 }, (_, i) => ({
  day: `D+${i + 1}`,
  baseline: Math.round(60 + i * 1.4 + Math.random() * 5),
  hydration: Math.round(60 + i * 0.6 + Math.random() * 4),
  radio: Math.round(60 + i * 1.0 + Math.random() * 5),
}));

export default function Scenarios() {
  const [budget, setBudget] = useState(5000);
  const [staffing, setStaffing] = useState(12);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border px-6 py-4 sticky top-0 z-10 bg-background/95 backdrop-blur-sm">
        <h1 className="text-base font-semibold text-foreground flex items-center gap-2">
          <GitBranch className="w-4 h-4 text-primary" />
          Scenario Simulator
        </h1>
        <p className="text-[11px] font-mono text-muted-foreground mt-0.5">Model-based intervention comparison</p>
      </header>

      <div className="p-6 grid grid-cols-12 gap-6">
        {/* Controls */}
        <div className="col-span-4 space-y-5">
          <div className="bg-card border border-border rounded-md p-4 space-y-5">
            <h2 className="text-xs font-semibold text-foreground flex items-center gap-2">
              <Sliders className="w-3.5 h-3.5 text-muted-foreground" /> Parameters
            </h2>

            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="data-label">Budget (USD)</label>
                <span className="font-mono text-xs text-foreground">${budget.toLocaleString()}</span>
              </div>
              <input
                type="range" min={1000} max={20000} step={500}
                value={budget} onChange={e => setBudget(Number(e.target.value))}
                className="w-full accent-primary"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="data-label">Staffing (CHWs)</label>
                <span className="font-mono text-xs text-foreground">{staffing}</span>
              </div>
              <input
                type="range" min={2} max={40} step={2}
                value={staffing} onChange={e => setStaffing(Number(e.target.value))}
                className="w-full accent-primary"
              />
            </div>

            <div className="border-t border-border pt-4 space-y-3">
              <p className="data-label">Scenario comparison</p>
              {[
                { label: 'Hydration units + ORS', color: 'hsl(174 68% 42%)', cost: '$2,400', impact: 'High' },
                { label: 'Radio messaging only', color: 'hsl(205 90% 52%)', cost: '$180', impact: 'Medium' },
                { label: 'No intervention (baseline)', color: 'hsl(215 15% 40%)', cost: '$0', impact: 'None' },
              ].map(s => (
                <div key={s.label} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full shrink-0" style={{ background: s.color }} />
                  <div className="flex-1">
                    <p className="text-xs text-foreground">{s.label}</p>
                    <p className="text-[10px] text-muted-foreground">Cost: {s.cost} · Expected impact: {s.impact}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-start gap-2 p-3 rounded border border-border bg-muted/20 text-[11px] text-muted-foreground">
            <Info className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
            <p>Assumptions: model v2.4, Turkana region, heat-dehydration scenario. Outcomes are probabilistic estimates, not predictions. Budget and staffing sliders affect simulation curves.</p>
          </div>
        </div>

        {/* Chart */}
        <div className="col-span-8">
          <div className="bg-card border border-border rounded-md p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xs font-semibold text-foreground">Projected risk trajectory — 21 days</h2>
              <span className="data-label">Risk score (0–100)</span>
            </div>
            <ResponsiveContainer width="100%" height={360}>
              <AreaChart data={baseScenario} margin={{ top: 4, right: 8, bottom: 4, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 16% 18%)" />
                <XAxis dataKey="day" tick={{ fontSize: 9, fill: 'hsl(215 12% 48%)', fontFamily: 'JetBrains Mono' }} tickLine={false} />
                <YAxis tick={{ fontSize: 9, fill: 'hsl(215 12% 48%)', fontFamily: 'JetBrains Mono' }} tickLine={false} axisLine={false} domain={[40, 100]} />
                <Tooltip
                  contentStyle={{
                    background: 'hsl(220 20% 10%)',
                    border: '1px solid hsl(220 16% 18%)',
                    borderRadius: '4px',
                    fontSize: '11px',
                    fontFamily: 'JetBrains Mono',
                  }}
                />
                <Legend formatter={(v) => <span style={{ fontSize: '10px', color: 'hsl(215 15% 65%)' }}>
                  {v === 'baseline' ? 'No intervention' : v === 'hydration' ? 'Hydration + ORS' : 'Radio messaging'}
                </span>} />
                <Area type="monotone" dataKey="baseline" stroke="hsl(215 15% 40%)" fill="hsl(215 15% 40% / 0.1)" strokeWidth={1.5} dot={false} />
                <Area type="monotone" dataKey="radio" stroke="hsl(205 90% 52%)" fill="hsl(205 90% 52% / 0.08)" strokeWidth={1.5} dot={false} />
                <Area type="monotone" dataKey="hydration" stroke="hsl(174 68% 42%)" fill="hsl(174 68% 42% / 0.12)" strokeWidth={2} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
