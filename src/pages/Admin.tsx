import { ShieldCheck, Lock, Eye, Database } from 'lucide-react';

export default function Admin() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border px-6 py-4 sticky top-0 z-10 bg-background/95 backdrop-blur-sm">
        <h1 className="text-base font-semibold text-foreground flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-primary" />
          Admin & Privacy
        </h1>
        <p className="text-[11px] font-mono text-muted-foreground mt-0.5">Role management · Privacy controls · Audit</p>
      </header>
      <div className="p-6 grid grid-cols-3 gap-6">
        {[
          { icon: Lock, title: 'Role-Based Access', desc: 'Manage roles: Ministry, Ops Lead, Analyst, CHW. Each role sees only their permitted data layers.', action: 'Manage roles →' },
          { icon: Eye, title: 'Audit Log', desc: '734 events logged this week. All alert views, acknowledgements, and action creations recorded.', action: 'View audit trail →' },
          { icon: Database, title: 'Privacy Controls', desc: 'Differential privacy applied. Minimum aggregation k=50. No individual records accessible in any role.', action: 'Review config →' },
        ].map(card => (
          <div key={card.title} className="bg-card border border-border rounded-md p-5 space-y-3">
            <card.icon className="w-5 h-5 text-primary" />
            <h2 className="text-sm font-semibold text-foreground">{card.title}</h2>
            <p className="text-xs text-muted-foreground leading-relaxed">{card.desc}</p>
            <button className="text-xs text-primary hover:text-primary/80">{card.action}</button>
          </div>
        ))}
      </div>
    </div>
  );
}
