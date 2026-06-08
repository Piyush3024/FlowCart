import { useQuery } from '@tanstack/react-query';
import { MOCK_FAQS } from '@/data/faqs.mock';
import type { FAQ } from '@/types/faq.types';

export const faqKeys = {
  all: ['faqs'] as const,
};

const fetchFaqs = async (): Promise<FAQ[]> => {
  await new Promise((r) => setTimeout(r, 600));
  return MOCK_FAQS;
};

export function useFaqs() {
  return useQuery({
    queryKey: faqKeys.all,
    queryFn: fetchFaqs,
  });
}
