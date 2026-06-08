'use client';

import { Cell, Pie, PieChart } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { CATEGORY_DATA } from '@/data/dashboard.mock';

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
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales by Category</CardTitle>
        <CardDescription>Revenue share — 2025</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-48 w-full">
          <PieChart>
            <Pie
              data={CATEGORY_DATA}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={80}
              paddingAngle={3}
              dataKey="value"
            >
              {CATEGORY_DATA.map((entry, i) => (
                <Cell key={entry.name} fill={COLORS[i % COLORS.length]} stroke="transparent" />
              ))}
            </Pie>
            <ChartTooltip content={<ChartTooltipContent formatter={(value) => `${value}%`} />} />
          </PieChart>
        </ChartContainer>

        {/* Legend */}
        <div className="grid grid-cols-2 gap-2 mt-4">
          {CATEGORY_DATA.map((cat, i) => (
            <div key={cat.name} className="flex items-center gap-2">
              <div
                className="w-2.5 h-2.5 rounded-sm shrink-0"
                style={{ backgroundColor: COLORS[i % COLORS.length] }}
                aria-hidden="true"
              />
              <span className="text-xs text-muted-foreground truncate">{cat.name}</span>
              <span className="text-xs font-medium text-foreground ml-auto tabular-nums">
                {cat.value}%
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
