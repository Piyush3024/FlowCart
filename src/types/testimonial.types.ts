export interface Testimonial {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  content: string;
  rating: number;
  product?: string;
  verified: boolean;
}
