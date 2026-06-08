export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  category: string;
  tags: string[];
  rating: number;
  reviewCount: number;
  description: string;
  sizes: string[];
  colors: ProductColor[];
  inStock: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
}

export interface ProductColor {
  name: string;
  hex: string;
}

export type ProductCategory = 'apparel' | 'accessories' | 'footwear' | 'lifestyle' | 'tech';
