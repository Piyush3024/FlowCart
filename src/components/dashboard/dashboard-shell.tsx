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
      if (reducedMotion) {
        return;
      }

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
    <div className="min-h-screen bg-background" ref={shellRef}>
      {/* Top nav */}
      <header className="sticky top-0 z-40 border-border border-b bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-screen-xl items-center justify-between gap-4 px-4 sm:px-6">
          <div className="flex items-center gap-4">
            <Link
              className="font-bold font-serif text-foreground text-lg transition-opacity hover:opacity-70"
              href="/"
            >
              {SITE.name}
            </Link>
            <Separator className="h-5" orientation="vertical" />
            <span className="text-muted-foreground text-sm">Dashboard</span>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button asChild size="sm" variant="outline">
              <Link href="/">
                <Icons.home size={14} />
                View Store
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main
        className="mx-auto flex max-w-screen-xl flex-col gap-8 px-4 py-8 sm:px-6"
        id="main-content"
      >
        {/* Page title */}
        <div className="dash-section flex flex-col gap-1">
          <h1 className="font-bold font-serif text-2xl text-foreground sm:text-3xl">Overview</h1>
          <p className="text-muted-foreground text-sm">
            FlowCart store performance — last 12 months
          </p>
        </div>

        {/* KPI cards */}
        <div className="dash-section">
          <KpiCards />
        </div>

        {/* Charts row */}
        <div className="dash-section grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <RevenueChart />
          </div>
          <div className="lg:col-span-1">
            <CategoryChart />
          </div>
        </div>

        {/* Tables row */}
        <div className="dash-section grid grid-cols-1 gap-6 lg:grid-cols-2">
          <ProductsTable />
          <RecentOrdersTable />
        </div>
      </main>
    </div>
  );
}
