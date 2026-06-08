import type { FAQ } from '@/types/faq.types';

export const MOCK_FAQS: FAQ[] = [
  {
    id: 'f1',
    question: 'What is your return policy?',
    answer:
      'We offer a 30-day return policy on all unused items in original condition. Simply initiate a return from your order page and we will arrange free collection.',
    category: 'orders',
  },
  {
    id: 'f2',
    question: 'How long does shipping take?',
    answer:
      'Standard shipping takes 3–5 business days. Express shipping (1–2 business days) is available at checkout. Free standard shipping on all orders over $100.',
    category: 'shipping',
  },
  {
    id: 'f3',
    question: 'Do you ship internationally?',
    answer:
      'Yes — we ship to over 40 countries. International orders typically arrive within 7–14 business days depending on destination. Duties and taxes may apply.',
    category: 'shipping',
  },
  {
    id: 'f4',
    question: 'How do I find my size?',
    answer:
      'Each product page includes a detailed size guide with measurements. When in doubt, size up — our pieces are designed with a relaxed, intentional fit.',
    category: 'products',
  },
  {
    id: 'f5',
    question: 'Are your materials sustainably sourced?',
    answer:
      'Sustainability is core to everything we make. We use certified organic cotton, recycled materials, and partner only with factories that meet our strict ethical standards.',
    category: 'products',
  },
  {
    id: 'f6',
    question: 'Can I modify or cancel my order?',
    answer:
      'Orders can be modified or cancelled within 1 hour of placement. After that, they enter fulfilment and cannot be changed. Contact support immediately if you need assistance.',
    category: 'orders',
  },
];
