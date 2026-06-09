import { type UseQueryResult, useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/query-keys';
import {
  CATEGORY_DATA,
  KPI_STATS,
  RECENT_ORDERS,
  REVENUE_DATA,
  TOP_PRODUCTS,
} from '@/data/dashboard.mock';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function useDashboardKpis(): UseQueryResult<typeof KPI_STATS> {
  return useQuery({
    queryKey: QUERY_KEYS.dashboard.kpis,
    queryFn: async () => {
      await delay(800);
      return KPI_STATS;
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useDashboardRevenue(): UseQueryResult<typeof REVENUE_DATA> {
  return useQuery({
    queryKey: QUERY_KEYS.dashboard.revenue,
    queryFn: async () => {
      await delay(600);
      return REVENUE_DATA;
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useDashboardCategory(): UseQueryResult<typeof CATEGORY_DATA> {
  return useQuery({
    queryKey: QUERY_KEYS.dashboard.categories,
    queryFn: async () => {
      await delay(500);
      return CATEGORY_DATA;
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useDashboardProducts(): UseQueryResult<typeof TOP_PRODUCTS> {
  return useQuery({
    queryKey: QUERY_KEYS.dashboard.products,
    queryFn: async () => {
      await delay(700);
      return TOP_PRODUCTS;
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useDashboardOrders(): UseQueryResult<typeof RECENT_ORDERS> {
  return useQuery({
    queryKey: QUERY_KEYS.dashboard.orders,
    queryFn: async () => {
      await delay(500);
      return RECENT_ORDERS;
    },
    staleTime: 5 * 60 * 1000,
  });
}
