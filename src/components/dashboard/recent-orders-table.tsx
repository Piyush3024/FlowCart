'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatPrice } from '@/lib/utils';
import { useDashboardOrders } from '@/services/dashboard.service';

const STATUS_VARIANTS: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  completed: 'default',
  processing: 'secondary',
  cancelled: 'destructive',
  refunded: 'outline',
};

export function RecentOrdersTable() {
  const { data, isPending } = useDashboardOrders();

  if (isPending) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-5 w-28 rounded" />
          <Skeleton className="h-4 w-36 rounded mt-1" />
        </CardHeader>
        <CardContent className="px-0">
          <div className="flex flex-col gap-3 px-4">
            {Array.from({ length: 5 }).map((_, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholders
              <Skeleton key={i} className="h-10 w-full rounded" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const orders = data ?? [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
        <CardDescription>Last 6 transactions</CardDescription>
      </CardHeader>
      <CardContent className="px-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-4">Order</TableHead>
              <TableHead>Product</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-right pr-4">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="pl-4">
                  <div className="flex flex-col gap-0.5">
                    <span className="font-medium text-foreground text-xs">{order.id}</span>
                    <span className="text-[11px] text-muted-foreground truncate max-w-[100px]">
                      {order.customer}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-xs text-muted-foreground truncate block max-w-[120px]">
                    {order.product}
                  </span>
                </TableCell>
                <TableCell className="text-right tabular-nums text-xs font-medium">
                  {formatPrice(order.amount)}
                </TableCell>
                <TableCell className="text-right pr-4">
                  <Badge
                    variant={STATUS_VARIANTS[order.status] ?? 'outline'}
                    className="text-[10px] capitalize ml-auto"
                  >
                    {order.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
