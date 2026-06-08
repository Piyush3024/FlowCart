import type { Testimonial } from '@/types/testimonial.types';

export const MOCK_TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Alex Morgan',
    handle: '@alexmorgan',
    avatar: 'https://picsum.photos/seed/avatar1/100/100',
    content:
      'The Obsidian Field Jacket is everything I wanted. Clean, minimal, and built like it will last a decade. Worth every penny.',
    rating: 5,
    product: 'Obsidian Field Jacket',
    verified: true,
  },
  {
    id: 't2',
    name: 'Priya Sharma',
    handle: '@priyasharma',
    avatar: 'https://picsum.photos/seed/avatar2/100/100',
    content:
      'Finally a brand that understands what minimal actually means. The merino crewneck is the softest thing I own. Already ordered two more.',
    rating: 5,
    product: 'Arc Merino Crewneck',
    verified: true,
  },
  {
    id: 't3',
    name: 'James Wu',
    handle: '@jameswu',
    avatar: 'https://picsum.photos/seed/avatar3/100/100',
    content:
      'Packaging alone sets the tone — you know this is a premium brand before you even open the box. The Drift sneakers fit perfectly.',
    rating: 5,
    product: 'Drift Low Sneaker',
    verified: true,
  },
  {
    id: 't4',
    name: 'Sara Lindqvist',
    handle: '@saralindqvist',
    avatar: 'https://picsum.photos/seed/avatar4/100/100',
    content:
      'I was skeptical about buying a $545 watch online. FlowCart made it effortless — arrived in two days, packaged impeccably. No regrets.',
    rating: 5,
    product: 'Ceramic Utility Watch',
    verified: true,
  },
  {
    id: 't5',
    name: 'Marcus Bell',
    handle: '@marcusbell',
    avatar: 'https://picsum.photos/seed/avatar5/100/100',
    content:
      'The titanium bottle has replaced every other bottle I own. Lightweight, keeps coffee hot all morning. Genuinely exceptional product.',
    rating: 4,
    product: 'Cold-Press Titanium Bottle',
    verified: true,
  },
];
