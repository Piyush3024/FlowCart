import { HttpResponse, http } from 'msw';
import { FEATURED_PRODUCTS, MOCK_PRODUCTS } from '@/data/products.mock';

export const productHandlers = [
  http.get('/api/products', () => HttpResponse.json(MOCK_PRODUCTS)),

  http.get('/api/products/featured', () => HttpResponse.json(FEATURED_PRODUCTS)),

  http.get('/api/products/:id', ({ params }) => {
    const product = MOCK_PRODUCTS.find((p) => p.id === params.id);
    if (!product) {
      return new HttpResponse(null, { status: 404 });
    }
    return HttpResponse.json(product);
  }),

  http.get('/api/products/category/:category', ({ params }) => {
    const products = MOCK_PRODUCTS.filter((p) => p.category === params.category);
    return HttpResponse.json(products);
  }),
];
