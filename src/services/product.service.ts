import { useQuery } from '@tanstack/react-query';
import { FEATURED_PRODUCTS, MOCK_PRODUCTS } from '@/data/products.mock';
import type { Product, ProductCategory } from '@/types/product.types';

export const productKeys = {
  all: ['products'] as const,
  featured: () => [...productKeys.all, 'featured'] as const,
  byCategory: (category: ProductCategory) => [...productKeys.all, 'category', category] as const,
  detail: (id: string) => [...productKeys.all, 'detail', id] as const,
};

const fetchProducts = async (): Promise<Product[]> => {
  await new Promise((r) => setTimeout(r, 800));
  return MOCK_PRODUCTS;
};

const fetchFeaturedProducts = async (): Promise<Product[]> => {
  await new Promise((r) => setTimeout(r, 800));
  return FEATURED_PRODUCTS;
};

export function useProducts() {
  return useQuery({
    queryKey: productKeys.all,
    queryFn: fetchProducts,
  });
}

export function useFeaturedProducts() {
  return useQuery({
    queryKey: productKeys.featured(),
    queryFn: fetchFeaturedProducts,
  });
}
