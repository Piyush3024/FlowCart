import { Icons } from '@/components/shared/icons';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { KPI_STATS } from '@/data/dashboard.mock';
import { cn, formatPrice } from '@/lib/utils';

const KPI_ITEMS = [
  {
    label: 'Total Revenue',
    value: formatPrice(KPI_STATS.totalRevenue.value),
    change: KPI_STATS.totalRevenue.change,
    icon: 'currencyDollar',
    description: 'vs last year',
  },
  {
    label: 'Total Orders',
    value: KPI_STATS.totalOrders.value.toLocaleString(),
    change: KPI_STATS.totalOrders.change,
    icon: 'list',
    description: 'vs last year',
  },
  {
    label: 'Avg Order Value',
    value: formatPrice(KPI_STATS.avgOrderValue.value),
    change: KPI_STATS.avgOrderValue.change,
    icon: 'shoppingBag',
    description: 'vs last year',
  },
  {
    label: 'Conversion Rate',
    value: `${KPI_STATS.conversionRate.value}%`,
    change: KPI_STATS.conversionRate.change,
    icon: 'analytics',
    description: 'vs last year',
  },
] as const;

export function KpiCards() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {KPI_ITEMS.map((item) => {
        const isPositive = item.change >= 0;
        const Icon = Icons[item.icon as keyof typeof Icons] as React.ComponentType<{
          size?: number;
          className?: string;
        }>;

        return (
          <Card key={item.label} size="sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {item.label}
                </CardTitle>
                <div className="w-7 h-7 rounded-md bg-muted flex items-center justify-center shrink-0">
                  <Icon size={14} className="text-muted-foreground" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-1">
                <span className="font-serif text-2xl font-bold text-foreground tabular-nums">
                  {item.value}
                </span>
                <div className="flex items-center gap-1">
                  {isPositive ? (
                    <Icons.chevronUp size={13} className="text-green-500 shrink-0" />
                  ) : (
                    <Icons.chevronDown size={13} className="text-destructive shrink-0" />
                  )}
                  <span
                    className={cn(
                      'text-xs font-medium tabular-nums',
                      isPositive ? 'text-green-500' : 'text-destructive',
                    )}
                  >
                    {isPositive ? '+' : ''}
                    {item.change}%
                  </span>
                  <span className="text-xs text-muted-foreground">{item.description}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
