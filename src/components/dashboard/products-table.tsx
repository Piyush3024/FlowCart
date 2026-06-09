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
import { useDashboardProducts } from '@/services/dashboard.service';

export function ProductsTable() {
  const { data, isPending } = useDashboardProducts();

  if (isPending) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-5 w-28 rounded" />
          <Skeleton className="h-4 w-44 rounded mt-1" />
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

  const products = data ?? [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Products</CardTitle>
        <CardDescription>Best performing by revenue</CardDescription>
      </CardHeader>
      <CardContent className="px-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-4">Product</TableHead>
              <TableHead className="text-right">Sold</TableHead>
              <TableHead className="text-right">Revenue</TableHead>
              <TableHead className="text-right pr-4">Stock</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="pl-4">
                  <div className="flex flex-col gap-0.5">
                    <span className="font-medium text-foreground text-xs">{product.name}</span>
                    <span className="text-[11px] text-muted-foreground">{product.category}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right tabular-nums text-xs">
                  {product.sold.toLocaleString()}
                </TableCell>
                <TableCell className="text-right tabular-nums text-xs font-medium">
                  {formatPrice(product.revenue)}
                </TableCell>
                <TableCell className="text-right pr-4">
                  <Badge
                    variant={product.stock < 20 ? 'destructive' : 'outline'}
                    className="text-[10px] tabular-nums ml-auto"
                  >
                    {product.stock}
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
