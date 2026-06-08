import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { TOP_PRODUCTS } from '@/data/dashboard.mock';
import { formatPrice } from '@/lib/utils';

export function ProductsTable() {
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
            {TOP_PRODUCTS.map((product) => (
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
