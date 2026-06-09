import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/query-keys';
import { FEATURED_PRODUCTS, MOCK_PRODUCTS } from '@/data/products.mock';
import type { Product, ProductCategory } from '@/types/product.types';

const fetchProducts = async (): Promise<Product[]> => {
  await new Promise((r) => setTimeout(r, 800));
  return MOCK_PRODUCTS;
};

const fetchFeaturedProducts = async (): Promise<Product[]> => {
  await new Promise((r) => setTimeout(r, 800));
  return FEATURED_PRODUCTS;
};

export async function fetchProductDetail(id: string): Promise<Product | undefined> {
  await new Promise((r) => setTimeout(r, 200));
  return MOCK_PRODUCTS.find((p) => p.id === id);
}

export function useProducts(): ReturnType<typeof useQuery<Product[]>> {
  return useQuery({
    queryKey: QUERY_KEYS.products.all,
    queryFn: fetchProducts,
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });
}

export function useFeaturedProducts(): ReturnType<typeof useQuery<Product[]>> {
  return useQuery({
    queryKey: QUERY_KEYS.products.featured(),
    queryFn: fetchFeaturedProducts,
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });
}

export function useProductsByCategory(
  category: ProductCategory,
): ReturnType<typeof useQuery<Product[]>> {
  return useQuery({
    queryKey: QUERY_KEYS.products.byCategory(category),
    queryFn: async (): Promise<Product[]> => {
      await new Promise((r) => setTimeout(r, 600));
      return MOCK_PRODUCTS.filter((p) => p.category === category);
    },
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });
}
