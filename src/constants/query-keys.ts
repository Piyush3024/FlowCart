export const QUERY_KEYS = {
  products: {
    all: ['products'] as const,
    featured: () => ['products', 'featured'] as const,
    byCategory: (category: string) => ['products', 'category', category] as const,
    detail: (id: string) => ['products', 'detail', id] as const,
  },
  faqs: {
    all: ['faqs'] as const,
    list: ['faqs', 'list'] as const,
  },
  reviews: {
    all: ['reviews'] as const,
    list: ['reviews', 'list'] as const,
  },
  dashboard: {
    all: ['dashboard'] as const,
    kpis: ['dashboard', 'kpis'] as const,
    revenue: ['dashboard', 'revenue'] as const,
    products: ['dashboard', 'products'] as const,
    orders: ['dashboard', 'orders'] as const,
    categories: ['dashboard', 'categories'] as const,
  },
} as const;
