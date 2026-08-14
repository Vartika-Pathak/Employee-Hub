import { Bell, ChevronDown, CircleHelp, ClipboardCheck, FileBarChart, LayoutDashboard, Menu, Users, X } from 'lucide-react';
import { useState } from 'react';
import type { ReactNode } from 'react';
import { Link, useLocation } from 'wouter';

const navItems = [
  { href: '/', label: 'Overview', icon: LayoutDashboard },
  { href: '/employees', label: 'People', icon: Users },
  { href: '/attendance', label: 'Attendance', icon: ClipboardCheck },
  { href: '/reports', label: 'Reports', icon: FileBarChart },
  { href: '/tasks', label: 'Tasks', icon: ClipboardCheck },
];

export function PeopleShell({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const current = navItems.find((item) => item.href === location) ?? navItems[0];

  return (
    <div className="min-h-[100dvh] bg-background">
      <aside className={`fixed inset-y-0 left-0 z-40 flex w-[250px] flex-col bg-sidebar text-sidebar-foreground transition-transform duration-300 lg:translate-x-0 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between px-7 pb-8 pt-7">
          <Link href="/" className="flex items-center gap-3" data-testid="link-brand">
            <span className="grid h-9 w-9 place-items-center rounded-[11px] bg-secondary text-secondary-foreground shadow-[4px_4px_0_hsl(var(--sidebar-primary)/.3)]">
              <span className="font-display text-[20px] leading-none">p</span>
            </span>
            <span className="text-[17px] font-semibold tracking-[-.03em]">people ops</span>
          </Link>
          <button className="rounded-lg p-2 text-sidebar-foreground/60 hover:bg-sidebar-accent lg:hidden" onClick={() => setMobileOpen(false)} aria-label="Close navigation" data-testid="button-close-navigation">
            <X size={18} />
          </button>
        </div>

        <div className="px-4">
          <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[.2em] text-sidebar-foreground/40">Workspace</p>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = current.href === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`group flex items-center gap-3 rounded-[10px] px-3 py-2.5 text-[13px] font-medium transition-colors ${active ? 'bg-sidebar-primary text-sidebar-primary-foreground' : 'text-sidebar-foreground/67 hover:bg-sidebar-accent hover:text-sidebar-foreground'}`}
                  data-testid={`link-nav-${item.label.toLowerCase()}`}
                >
                  <Icon size={17} strokeWidth={active ? 2.3 : 1.8} />
                  <span>{item.label}</span>
                  {item.label === 'Tasks' && <span className="ml-auto rounded-full bg-accent/80 px-1.5 py-0.5 font-data text-[9px] text-sidebar-primary-foreground">4</span>}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto px-4 pb-5">
          <div className="mb-4 rounded-[14px] border border-sidebar-border bg-sidebar-accent/60 p-4">
            <div className="mb-3 flex items-start justify-between">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-primary/20 text-primary-foreground"><CircleHelp size={15} /></span>
              <span className="font-data text-[9px] uppercase tracking-wider text-sidebar-foreground/45">Tips</span>
            </div>
            <p className="text-[12px] leading-5 text-sidebar-foreground/75">A clear place for every people moment.</p>
            <button className="mt-3 text-[11px] font-semibold text-secondary hover:underline" onClick={() => window.alert('People Ops keeps your people work in one thoughtful place.')} data-testid="button-view-tip">Learn more</button>
          </div>
          <button className="flex w-full items-center gap-3 rounded-[10px] p-2 text-left hover:bg-sidebar-accent" onClick={() => window.alert('Profile settings are coming soon.')} data-testid="button-account-menu">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-[#c8a59a] text-[11px] font-bold text-[#24383b]">AM</span>
            <span className="min-w-0 flex-1"><span className="block truncate text-[12px] font-semibold">Avery Morgan</span><span className="block truncate text-[10px] text-sidebar-foreground/50">People team</span></span>
            <ChevronDown size={15} className="text-sidebar-foreground/45" />
          </button>
        </div>
      </aside>

      {mobileOpen && <button className="fixed inset-0 z-30 bg-foreground/20 lg:hidden" onClick={() => setMobileOpen(false)} aria-label="Close menu overlay" data-testid="button-menu-overlay" />}

      <div className="lg:pl-[250px]">
        <header className="sticky top-0 z-20 flex h-[74px] items-center justify-between border-b border-border/70 bg-background/90 px-5 backdrop-blur-md sm:px-8 lg:px-10">
          <div className="flex items-center gap-3">
            <button className="rounded-lg p-2 hover:bg-muted lg:hidden" onClick={() => setMobileOpen(true)} aria-label="Open navigation" data-testid="button-open-navigation"><Menu size={20} /></button>
            <div>
              <p className="font-data text-[9px] uppercase tracking-[.19em] text-muted-foreground">People operations</p>
              <h1 className="mt-0.5 text-[15px] font-semibold tracking-[-.02em]">{current.label}</h1>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <button className="relative rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground" onClick={() => window.alert('You are all caught up.')} aria-label="View notifications" data-testid="button-notifications">
              <Bell size={18} strokeWidth={1.8} /><span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-accent" />
            </button>
            <div className="hidden h-6 w-px bg-border sm:block" />
            <span className="hidden text-[12px] text-muted-foreground sm:block">Tuesday, October 8</span>
          </div>
        </header>
        <main className="mx-auto max-w-[1480px] px-5 py-7 sm:px-8 sm:py-9 lg:px-10">{children}</main>
      </div>
    </div>
  );
}