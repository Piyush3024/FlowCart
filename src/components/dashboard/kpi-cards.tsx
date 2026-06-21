'use client';

import { Icons } from '@/components/shared/icons';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { cn, formatPrice } from '@/lib/utils';
import { useDashboardKpis } from '@/services/dashboard.service';

type IconKey = keyof typeof Icons;

const KPI_CONFIG = [
  {
    label: 'Total Revenue',
    icon: 'currencyDollar' as IconKey,
    description: 'vs last year',
    format: (stats: ReturnType<typeof useDashboardKpis>['data']) =>
      stats ? formatPrice(stats.totalRevenue.value) : '',
    change: (stats: ReturnType<typeof useDashboardKpis>['data']) => stats?.totalRevenue.change ?? 0,
  },
  {
    label: 'Total Orders',
    icon: 'list' as IconKey,
    description: 'vs last year',
    format: (stats: ReturnType<typeof useDashboardKpis>['data']) =>
      stats ? stats.totalOrders.value.toLocaleString() : '',
    change: (stats: ReturnType<typeof useDashboardKpis>['data']) => stats?.totalOrders.change ?? 0,
  },
  {
    label: 'Avg Order Value',
    icon: 'shoppingBag' as IconKey,
    description: 'vs last year',
    format: (stats: ReturnType<typeof useDashboardKpis>['data']) =>
      stats ? formatPrice(stats.avgOrderValue.value) : '',
    change: (stats: ReturnType<typeof useDashboardKpis>['data']) =>
      stats?.avgOrderValue.change ?? 0,
  },
  {
    label: 'Conversion Rate',
    icon: 'analytics' as IconKey,
    description: 'vs last year',
    format: (stats: ReturnType<typeof useDashboardKpis>['data']) =>
      stats ? `${stats.conversionRate.value}%` : '',
    change: (stats: ReturnType<typeof useDashboardKpis>['data']) =>
      stats?.conversionRate.change ?? 0,
  },
] as const;

export function KpiCards() {
  const { data, isPending } = useDashboardKpis();

  if (isPending) {
    return (
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholders
          <Skeleton className="h-32 rounded-xl" key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {KPI_CONFIG.map((item) => {
        const isPositive = item.change(data) >= 0;
        const Icon = Icons[item.icon] as React.ComponentType<{
          size?: number;
          className?: string;
        }>;

        return (
          <Card key={item.label} size="sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="font-medium text-muted-foreground text-xs uppercase tracking-wider">
                  {item.label}
                </CardTitle>
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-muted">
                  <Icon className="text-muted-foreground" size={14} />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-1">
                <span className="font-bold font-serif text-2xl text-foreground tabular-nums">
                  {item.format(data)}
                </span>
                <div className="flex items-center gap-1">
                  {isPositive ? (
                    <Icons.chevronUp className="shrink-0 text-green-500" size={13} />
                  ) : (
                    <Icons.chevronDown className="shrink-0 text-destructive" size={13} />
                  )}
                  <span
                    className={cn(
                      'font-medium text-xs tabular-nums',
                      isPositive ? 'text-green-500' : 'text-destructive',
                    )}
                  >
                    {isPositive ? '+' : ''}
                    {item.change(data)}%
                  </span>
                  <span className="text-muted-foreground text-xs">{item.description}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
