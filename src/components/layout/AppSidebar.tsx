import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Map,
  Bell,
  ClipboardList,
  Activity,
  GitBranch,
  FileText,
  Settings,
  FlaskConical,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { label: 'Overview', icon: LayoutDashboard, to: '/' },
  { label: 'Risk Map', icon: Map, to: '/map' },
  { label: 'Alerts', icon: Bell, to: '/alerts', badge: 3 },
  { label: 'Actions', icon: ClipboardList, to: '/actions', badge: 5 },
  { label: 'Signals', icon: Activity, to: '/signals' },
  { label: 'Scenarios', icon: GitBranch, to: '/scenarios' },
  { label: 'Reports', icon: FileText, to: '/reports' },
];

const bottomItems = [
  { label: 'Model / Quality', icon: FlaskConical, to: '/model' },
  { label: 'Admin & Privacy', icon: ShieldCheck, to: '/admin' },
  { label: 'Settings', icon: Settings, to: '/settings' },
];

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const isActive = (to: string) =>
    to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);

  return (
    <aside
      className={cn(
        'flex flex-col bg-[hsl(var(--sidebar-background))] border-r border-[hsl(var(--sidebar-border))] transition-all duration-200 shrink-0',
        collapsed ? 'w-14' : 'w-52'
      )}
    >
      {/* Logo */}
      <div className={cn('flex items-center border-b border-[hsl(var(--sidebar-border))] h-14', collapsed ? 'justify-center px-0' : 'px-4 gap-2.5')}>
        <div className="w-7 h-7 rounded bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0">
          <div className="w-2.5 h-2.5 rounded-full bg-primary pulse-dot" style={{ '--tw-content': '' } as React.CSSProperties} />
        </div>
        {!collapsed && (
          <div>
            <div className="text-xs font-semibold tracking-tight text-foreground leading-none">PHES</div>
            <div className="text-[10px] font-mono text-muted-foreground mt-0.5 tracking-wide">ACTION OPS</div>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-3 space-y-0.5 px-2 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={cn(
              'flex items-center gap-2.5 rounded px-2 py-2 text-sm transition-colors group relative',
              isActive(item.to)
                ? 'bg-[hsl(var(--sidebar-accent))] text-[hsl(var(--sidebar-accent-foreground))]'
                : 'text-[hsl(var(--sidebar-foreground))] hover:bg-[hsl(var(--sidebar-accent))] hover:text-[hsl(var(--sidebar-accent-foreground))]',
              collapsed && 'justify-center'
            )}
          >
            <item.icon className={cn('shrink-0', isActive(item.to) ? 'text-primary' : 'text-[hsl(var(--sidebar-foreground))]', 'w-4 h-4')} />
            {!collapsed && (
              <>
                <span className="flex-1 font-medium text-[13px]">{item.label}</span>
                {item.badge && (
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-primary/15 text-primary border border-primary/20">
                    {item.badge}
                  </span>
                )}
              </>
            )}
            {collapsed && item.badge && (
              <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-primary" />
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom nav */}
      <div className="border-t border-[hsl(var(--sidebar-border))] py-3 space-y-0.5 px-2">
        {bottomItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={cn(
              'flex items-center gap-2.5 rounded px-2 py-2 text-sm transition-colors',
              isActive(item.to)
                ? 'bg-[hsl(var(--sidebar-accent))] text-[hsl(var(--sidebar-accent-foreground))]'
                : 'text-[hsl(var(--sidebar-foreground))] hover:bg-[hsl(var(--sidebar-accent))] hover:text-[hsl(var(--sidebar-accent-foreground))]',
              collapsed && 'justify-center'
            )}
          >
            <item.icon className="w-4 h-4 shrink-0" />
            {!collapsed && <span className="font-medium text-[13px]">{item.label}</span>}
          </NavLink>
        ))}

        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            'w-full flex items-center gap-2.5 rounded px-2 py-2 text-sm transition-colors',
            'text-[hsl(var(--sidebar-foreground))] hover:bg-[hsl(var(--sidebar-accent))] hover:text-[hsl(var(--sidebar-accent-foreground))]',
            collapsed && 'justify-center'
          )}
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4 shrink-0" />
          ) : (
            <>
              <ChevronLeft className="w-4 h-4 shrink-0" />
              <span className="font-medium text-[13px]">Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
