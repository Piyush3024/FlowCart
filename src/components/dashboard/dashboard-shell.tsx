'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { Icons } from '@/components/shared/icons';
import { ThemeToggle } from '@/components/shared/theme-toggle';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { SITE } from '@/constants/site';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { DURATION, EASE_DEFAULT, gsap, useGSAP } from '@/lib/gsap';
import { CategoryChart } from './category-chart';
import { KpiCards } from './kpi-cards';
import { ProductsTable } from './products-table';
import { RecentOrdersTable } from './recent-orders-table';
import { RevenueChart } from './revenue-chart';

export function DashboardShell() {
  const reducedMotion = useReducedMotion();
  const shellRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (reducedMotion) return;

      gsap.from('.dash-section', {
        autoAlpha: 0,
        y: 24,
        duration: DURATION.normal,
        stagger: 0.08,
        ease: EASE_DEFAULT,
        delay: 0.2,
      });
    },
    { scope: shellRef, dependencies: [reducedMotion] },
  );

  return (
    <div ref={shellRef} className="min-h-screen bg-background">
      {/* Top nav */}
      <header className="sticky top-0 z-40 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="font-serif text-lg font-bold text-foreground hover:opacity-70 transition-opacity"
            >
              {SITE.name}
            </Link>
            <Separator orientation="vertical" className="h-5" />
            <span className="text-sm text-muted-foreground">Dashboard</span>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button variant="outline" size="sm" asChild>
              <Link href="/">
                <Icons.home size={14} />
                View Store
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-screen-xl mx-auto px-4 sm:px-6 py-8 flex flex-col gap-8">
        {/* Page title */}
        <div className="dash-section flex flex-col gap-1">
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">Overview</h1>
          <p className="text-sm text-muted-foreground">
            FlowCart store performance — last 12 months
          </p>
        </div>

        {/* KPI cards */}
        <div className="dash-section">
          <KpiCards />
        </div>

        {/* Charts row */}
        <div className="dash-section grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <RevenueChart />
          </div>
          <div className="lg:col-span-1">
            <CategoryChart />
          </div>
        </div>

        {/* Tables row */}
        <div className="dash-section grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ProductsTable />
          <RecentOrdersTable />
        </div>
      </main>
    </div>
  );
}
