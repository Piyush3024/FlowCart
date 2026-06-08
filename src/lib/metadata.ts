import type { Metadata } from 'next';
import { SITE } from '@/constants/site';

export function createMetadata(override: Partial<Metadata> = {}): Metadata {
  return {
    title: override.title ?? SITE.name,
    description: override.description ?? SITE.description,
    openGraph: {
      type: 'website',
      siteName: SITE.name,
      ...override.openGraph,
    },
    ...override,
  };
}
