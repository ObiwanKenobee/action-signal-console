import riskMapBg from '@/assets/risk-map-bg.jpg';
import { MapPin, Layers, ToggleLeft, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { alerts, regions } from '@/data/mock';
import { RiskBadge } from '@/components/shared/RiskBadge';
import { ConfidencePill } from '@/components/shared/ConfidencePill';

const layers = [
  { id: 'forecast', label: 'Risk forecast', color: 'bg-[hsl(var(--risk-high))]', active: true },
  { id: 'heat', label: 'Heat index', color: 'bg-[hsl(var(--signal-heat))]', active: true },
  { id: 'water', label: 'Water stress', color: 'bg-[hsl(var(--signal-water))]', active: false },
  { id: 'absent', label: 'Absenteeism', color: 'bg-[hsl(var(--signal-absent))]', active: false },
  { id: 'infra', label: 'Infrastructure', color: 'bg-muted-foreground', active: false },
];

// Simple fake map pins with rough positions
const pins = [
  { regionId: 'r1', label: 'Turkana', x: 30, y: 38, riskLevel: 'critical' as const },
  { regionId: 'r2', label: 'Garissa', x: 55, y: 52, riskLevel: 'high' as const },
  { regionId: 'r3', label: 'Marsabit', x: 48, y: 32, riskLevel: 'high' as const },
  { regionId: 'r4', label: 'Wajir', x: 58, y: 42, riskLevel: 'moderate' as const },
  { regionId: 'r5', label: 'Nairobi', x: 44, y: 58, riskLevel: 'moderate' as const },
  { regionId: 'r6', label: 'Mombasa', x: 52, y: 66, riskLevel: 'low' as const },
];

const pinColor: Record<string, string> = {
  critical: 'bg-[hsl(var(--risk-critical))] shadow-[0_0_12px_hsl(var(--risk-critical)/0.6)]',
  high: 'bg-[hsl(var(--risk-high))] shadow-[0_0_12px_hsl(var(--risk-high)/0.5)]',
  moderate: 'bg-[hsl(var(--risk-moderate))] shadow-[0_0_8px_hsl(var(--risk-moderate)/0.4)]',
  low: 'bg-primary shadow-[0_0_8px_hsl(var(--primary)/0.3)]',
};

export default function RiskMap() {
  const [activeLayers, setActiveLayers] = useState<string[]>(['forecast', 'heat']);
  const [selectedPin, setSelectedPin] = useState<string | null>(null);

  const toggleLayer = (id: string) => {
    setActiveLayers(prev =>
      prev.includes(id) ? prev.filter(l => l !== id) : [...prev, id]
    );
  };

  const selectedAlert = selectedPin
    ? alerts.find(a => a.regionId === selectedPin) || null
    : null;

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      {/* Header */}
      <header className="border-b border-border px-6 py-4 flex items-center justify-between shrink-0 bg-background/95">
        <div>
          <h1 className="text-base font-semibold text-foreground flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary" />
            Risk Map
          </h1>
          <p className="text-[11px] font-mono text-muted-foreground mt-0.5">Forecast overlay · 21-day window</p>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Map area */}
        <div className="flex-1 relative overflow-hidden">
          <img
            src={riskMapBg}
            alt="Risk map background"
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 grid-overlay opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />

          {/* Risk pins */}
          {pins.map((pin) => (
            <button
              key={pin.regionId}
              onClick={() => setSelectedPin(selectedPin === pin.regionId ? null : pin.regionId)}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
              style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
            >
              <div className={cn('w-4 h-4 rounded-full border-2 border-background transition-transform group-hover:scale-125', pinColor[pin.riskLevel])} />
              <div className={cn(
                'absolute left-1/2 -translate-x-1/2 -top-7 whitespace-nowrap px-1.5 py-0.5 rounded text-[10px] font-mono border transition-opacity bg-card/90 border-border',
                selectedPin === pin.regionId ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
              )}>
                {pin.label}
              </div>
              {/* Pulse ring */}
              {(pin.riskLevel === 'critical' || pin.riskLevel === 'high') && (
                <div className={cn('absolute inset-0 rounded-full animate-ping opacity-30', pinColor[pin.riskLevel].split(' ')[0])} />
              )}
            </button>
          ))}

          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm border border-border rounded-md p-3 space-y-1.5">
            <p className="data-label mb-2">Risk level</p>
            {[
              { label: 'Critical', color: 'bg-[hsl(var(--risk-critical))]' },
              { label: 'High', color: 'bg-[hsl(var(--risk-high))]' },
              { label: 'Moderate', color: 'bg-[hsl(var(--risk-moderate))]' },
              { label: 'Low', color: 'bg-primary' },
            ].map(l => (
              <div key={l.label} className="flex items-center gap-2">
                <div className={cn('w-2 h-2 rounded-full', l.color)} />
                <span className="text-[11px] text-muted-foreground">{l.label}</span>
              </div>
            ))}
          </div>

          {/* Selected region drawer */}
          {selectedAlert && (
            <div className="absolute right-0 top-0 h-full w-72 bg-card/95 backdrop-blur-sm border-l border-border p-4 overflow-y-auto">
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-sm font-semibold text-foreground">{selectedAlert.regionName}</h3>
                    <button onClick={() => setSelectedPin(null)} className="text-muted-foreground hover:text-foreground">✕</button>
                  </div>
                  <div className="flex items-center gap-2">
                    <RiskBadge level={selectedAlert.riskLevel} />
                    <ConfidencePill value={selectedAlert.confidence} />
                  </div>
                </div>

                <div>
                  <p className="data-label mb-2">Alert</p>
                  <p className="text-xs text-foreground font-medium mb-1">{selectedAlert.type}</p>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">{selectedAlert.summary}</p>
                </div>

                <div>
                  <p className="data-label mb-2">Top drivers</p>
                  <div className="space-y-1.5">
                    {selectedAlert.drivers.map(d => (
                      <div key={d.signal} className="flex items-center justify-between">
                        <span className="text-[11px] text-muted-foreground">{d.signal}</span>
                        <span className="text-[11px] font-mono text-foreground">{d.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="data-label mb-2">Recommended action</p>
                  <button className="w-full text-left px-3 py-2 rounded border border-primary/30 bg-primary/10 text-xs text-primary hover:bg-primary/20 transition-colors">
                    Deploy ORS + hydration units → Create action
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Layer panel */}
        <div className="w-52 border-l border-border bg-card p-4 space-y-4 overflow-y-auto shrink-0">
          <div className="flex items-center gap-2">
            <Layers className="w-3.5 h-3.5 text-muted-foreground" />
            <h2 className="text-xs font-semibold text-foreground">Map layers</h2>
          </div>
          <div className="space-y-2">
            {layers.map((layer) => {
              const isOn = activeLayers.includes(layer.id);
              return (
                <button
                  key={layer.id}
                  onClick={() => toggleLayer(layer.id)}
                  className={cn(
                    'w-full flex items-center justify-between px-2.5 py-2 rounded border text-xs transition-colors',
                    isOn ? 'border-border bg-muted/30 text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground'
                  )}
                >
                  <div className="flex items-center gap-2">
                    <div className={cn('w-2 h-2 rounded-full opacity-70', layer.color)} />
                    <span>{layer.label}</span>
                  </div>
                  <ToggleLeft className={cn('w-3.5 h-3.5 transition-colors', isOn ? 'text-primary' : 'text-muted-foreground')} />
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-border">
            <div className="flex items-start gap-2 text-[10px] text-muted-foreground">
              <Info className="w-3 h-3 mt-0.5 shrink-0" />
              <p>Interactive map with full Leaflet/Mapbox integration in v2. Current view shows forecast risk overlay.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
