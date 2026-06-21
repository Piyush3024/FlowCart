import { describe, expect, it } from 'vitest';
import { cn, formatPrice, slugify } from '@/lib/utils';

describe('utils', () => {
  describe('cn', () => {
    it('merges class names correctly', () => {
      expect(cn('foo', 'bar')).toBe('foo bar');
    });

    it('handles conditional classes', () => {
      expect(cn('foo', 'bar', false)).toBe('foo bar');
    });

    it('merges tailwind classes with twMerge', () => {
      expect(cn('p-2', 'p-4')).toBe('p-4');
    });
  });

  describe('formatPrice', () => {
    it('formats price in USD', () => {
      expect(formatPrice(99.99)).toBe('$100');
    });

    it('formats price with cents', () => {
      expect(formatPrice(99.5)).toBe('$100');
    });

    it('handles zero', () => {
      expect(formatPrice(0)).toBe('$0');
    });
  });

  describe('slugify', () => {
    it('converts to lowercase', () => {
      expect(slugify('Hello World')).toBe('hello-world');
    });

    it('replaces spaces with hyphens', () => {
      expect(slugify('Product Name')).toBe('product-name');
    });

    it('removes special characters', () => {
      expect(slugify('Product@Name!')).toBe('productname');
    });

    it('handles multiple spaces', () => {
      expect(slugify('Product  Name')).toBe('product-name');
    });
  });
});
