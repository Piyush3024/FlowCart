export interface OrderStat {
  month: string;
  revenue: number;
  orders: number;
}

export interface TopProduct {
  id: string;
  name: string;
  category: string;
  sold: number;
  revenue: number;
  stock: number;
}

export interface RecentOrder {
  id: string;
  customer: string;
  email: string;
  product: string;
  amount: number;
  status: 'completed' | 'processing' | 'cancelled' | 'refunded';
  date: string;
}

export const REVENUE_DATA: OrderStat[] = [
  { month: 'Jan', revenue: 18400, orders: 64 },
  { month: 'Feb', revenue: 22100, orders: 78 },
  { month: 'Mar', revenue: 19800, orders: 71 },
  { month: 'Apr', revenue: 26500, orders: 94 },
  { month: 'May', revenue: 31200, orders: 112 },
  { month: 'Jun', revenue: 28900, orders: 103 },
  { month: 'Jul', revenue: 34100, orders: 121 },
  { month: 'Aug', revenue: 38700, orders: 138 },
  { month: 'Sep', revenue: 42300, orders: 151 },
  { month: 'Oct', revenue: 39800, orders: 142 },
  { month: 'Nov', revenue: 51200, orders: 183 },
  { month: 'Dec', revenue: 61400, orders: 219 },
];

export const CATEGORY_DATA = [
  { name: 'Apparel', value: 42, fill: 'var(--color-apparel)' },
  { name: 'Accessories', value: 28, fill: 'var(--color-accessories)' },
  { name: 'Footwear', value: 18, fill: 'var(--color-footwear)' },
  { name: 'Lifestyle', value: 12, fill: 'var(--color-lifestyle)' },
];

export const TOP_PRODUCTS: TopProduct[] = [
  {
    id: 'p1',
    name: 'Obsidian Field Jacket',
    category: 'Apparel',
    sold: 312,
    revenue: 90168,
    stock: 24,
  },
  {
    id: 'p2',
    name: 'Arc Merino Crewneck',
    category: 'Apparel',
    sold: 289,
    revenue: 47685,
    stock: 61,
  },
  {
    id: 'p4',
    name: 'Drift Low Sneaker',
    category: 'Footwear',
    sold: 241,
    revenue: 46995,
    stock: 18,
  },
  {
    id: 'p6',
    name: 'Ceramic Utility Watch',
    category: 'Accessories',
    sold: 98,
    revenue: 53410,
    stock: 9,
  },
  {
    id: 'p8',
    name: 'Cold-Press Titanium Bottle',
    category: 'Lifestyle',
    sold: 418,
    revenue: 27170,
    stock: 143,
  },
  {
    id: 'p3',
    name: 'Minimal Canvas Tote',
    category: 'Accessories',
    sold: 374,
    revenue: 33286,
    stock: 88,
  },
];

export const RECENT_ORDERS: RecentOrder[] = [
  {
    id: '#FC-8821',
    customer: 'Alex Morgan',
    email: 'alex@example.com',
    product: 'Obsidian Field Jacket',
    amount: 289,
    status: 'completed',
    date: '2 min ago',
  },
  {
    id: '#FC-8820',
    customer: 'Priya Sharma',
    email: 'priya@example.com',
    product: 'Arc Merino Crewneck',
    amount: 165,
    status: 'processing',
    date: '14 min ago',
  },
  {
    id: '#FC-8819',
    customer: 'James Wu',
    email: 'james@example.com',
    product: 'Drift Low Sneaker',
    amount: 195,
    status: 'completed',
    date: '1 hr ago',
  },
  {
    id: '#FC-8818',
    customer: 'Sara Lindqvist',
    email: 'sara@example.com',
    product: 'Ceramic Utility Watch',
    amount: 545,
    status: 'completed',
    date: '2 hr ago',
  },
  {
    id: '#FC-8817',
    customer: 'Marcus Bell',
    email: 'marcus@example.com',
    product: 'Minimal Canvas Tote',
    amount: 89,
    status: 'cancelled',
    date: '3 hr ago',
  },
  {
    id: '#FC-8816',
    customer: 'Yuki Tanaka',
    email: 'yuki@example.com',
    product: 'Cold-Press Titanium Bottle',
    amount: 65,
    status: 'refunded',
    date: '5 hr ago',
  },
];

export const KPI_STATS = {
  totalRevenue: { value: 414400, change: +18.2 },
  totalOrders: { value: 1476, change: +12.4 },
  avgOrderValue: { value: 281, change: +5.1 },
  conversionRate: { value: 3.8, change: -0.4 },
};
