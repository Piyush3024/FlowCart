'use client';

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Skeleton } from '@/components/ui/skeleton';
import { useDashboardRevenue } from '@/services/dashboard.service';

const chartConfig = {
  revenue: {
    label: 'Revenue',
    color: 'var(--foreground)',
  },
  orders: {
    label: 'Orders',
    color: 'var(--muted-foreground)',
  },
} satisfies ChartConfig;

export function RevenueChart() {
  const { data, isPending } = useDashboardRevenue();

  if (isPending) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-5 w-24 rounded" />
          <Skeleton className="h-4 w-40 rounded mt-1" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-64 w-full rounded-lg" />
        </CardContent>
      </Card>
    );
  }

  const revenueData = data ?? [];
  const totalRevenue = revenueData.reduce((acc, d) => acc + d.revenue, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue</CardTitle>
        <CardDescription>${(totalRevenue / 1000).toFixed(0)}k total — Jan–Dec 2025</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-64 w-full">
          <AreaChart data={revenueData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--foreground)" stopOpacity={0.15} />
                <stop offset="95%" stopColor="var(--foreground)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fontSize: 11 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fontSize: 11 }}
              tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value) =>
                    typeof value === 'number' ? `$${value.toLocaleString()}` : String(value)
                  }
                />
              }
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="var(--foreground)"
              strokeWidth={1.5}
              fill="url(#revenueGradient)"
              dot={false}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
