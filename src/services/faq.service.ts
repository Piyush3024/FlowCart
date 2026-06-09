import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/query-keys';
import { MOCK_FAQS } from '@/data/faqs.mock';
import type { FAQ } from '@/types/faq.types';

const fetchFaqs = async (): Promise<FAQ[]> => {
  await new Promise((r) => setTimeout(r, 600));
  return MOCK_FAQS;
};

export function useFaqs(): ReturnType<typeof useQuery<FAQ[]>> {
  return useQuery({
    queryKey: QUERY_KEYS.faqs.all,
    queryFn: fetchFaqs,
    staleTime: 30 * 60 * 1000,
    retry: 1,
  });
}
