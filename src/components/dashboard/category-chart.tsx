'use client';

import { Cell, Pie, PieChart } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Skeleton } from '@/components/ui/skeleton';
import { useDashboardCategory } from '@/services/dashboard.service';

const chartConfig = {
  apparel: { label: 'Apparel', color: 'var(--foreground)' },
  accessories: { label: 'Accessories', color: 'var(--muted-foreground)' },
  footwear: { label: 'Footwear', color: 'var(--border)' },
  lifestyle: { label: 'Lifestyle', color: 'var(--accent-foreground)' },
} satisfies ChartConfig;

const COLORS = [
  'var(--foreground)',
  'var(--muted-foreground)',
  'color-mix(in oklch, var(--foreground) 40%, transparent)',
  'color-mix(in oklch, var(--foreground) 20%, transparent)',
];

export function CategoryChart() {
  const { data, isPending } = useDashboardCategory();

  if (isPending) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-5 w-32 rounded" />
          <Skeleton className="mt-1 h-4 w-24 rounded" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-48 w-full rounded-lg" />
        </CardContent>
      </Card>
    );
  }

  const categoryData = data ?? [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales by Category</CardTitle>
        <CardDescription>Revenue share — 2025</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer className="h-48 w-full" config={chartConfig}>
          <PieChart>
            <Pie
              cx="50%"
              cy="50%"
              data={categoryData}
              dataKey="value"
              innerRadius={55}
              outerRadius={80}
              paddingAngle={3}
            >
              {categoryData.map((entry, i) => (
                <Cell fill={COLORS[i % COLORS.length]} key={entry.name} stroke="transparent" />
              ))}
            </Pie>
            <ChartTooltip content={<ChartTooltipContent formatter={(value) => `${value}%`} />} />
          </PieChart>
        </ChartContainer>

        {/* Legend */}
        <div className="mt-4 grid grid-cols-2 gap-2">
          {categoryData.map((cat, i) => (
            <div className="flex items-center gap-2" key={cat.name}>
              <div
                aria-hidden="true"
                className="h-2.5 w-2.5 shrink-0 rounded-sm"
                style={{ backgroundColor: COLORS[i % COLORS.length] }}
              />
              <span className="truncate text-muted-foreground text-xs">{cat.name}</span>
              <span className="ml-auto font-medium text-foreground text-xs tabular-nums">
                {cat.value}%
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
