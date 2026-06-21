export interface Product {
  category: string;
  colors: ProductColor[];
  description: string;
  id: string;
  image: string;
  images: string[];
  inStock: boolean;
  isFeatured?: boolean;
  isNew?: boolean;
  name: string;
  originalPrice?: number;
  price: number;
  rating: number;
  reviewCount: number;
  sizes: string[];
  slug: string;
  tags: string[];
}

export interface ProductColor {
  hex: string;
  name: string;
}

export type ProductCategory = 'apparel' | 'accessories' | 'footwear' | 'lifestyle' | 'tech';
