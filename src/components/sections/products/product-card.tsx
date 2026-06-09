'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useRef } from 'react';
import { toast } from 'sonner';
import { Icons } from '@/components/shared/icons';
import { ImageWithFallback } from '@/components/shared/image-with-fallback';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { QUERY_KEYS } from '@/constants/query-keys';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { DURATION, EASE_DEFAULT, gsap, useGSAP } from '@/lib/gsap';
import { cn, formatPrice } from '@/lib/utils';
import { fetchProductDetail } from '@/services/product.service';
import { useCartStore } from '@/stores/cart.store';
import { useQuickViewStore } from '@/stores/quick-view.store';
import { useWishlistStore } from '@/stores/wishlist.store';
import type { Product } from '@/types/product.types';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const reducedMotion = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();
  const addItem = useCartStore((s) => s.addItem);
  const toggle = useWishlistStore((s) => s.toggle);
  const openQuickView = useQuickViewStore((s) => s.open);
  const isWishlisted = useWishlistStore((s) => s.ids.includes(product.id));

  const handleMouseEnter = () => {
    queryClient.prefetchQuery({
      queryKey: QUERY_KEYS.products.detail(product.id),
      queryFn: () => fetchProductDetail(product.id),
      staleTime: 5 * 60 * 1000,
    });
  };

  useGSAP(
    () => {
      if (reducedMotion || !cardRef.current) return;

      const card = cardRef.current;
      const image = card.querySelector('.product-image');
      const overlay = card.querySelector('.product-overlay');
      const actions = card.querySelector('.product-actions');

      const enterAnim = () => {
        gsap.to(image, {
          scale: 1.05,
          duration: DURATION.normal,
          ease: EASE_DEFAULT,
        });
        gsap.to(overlay, {
          opacity: 1,
          duration: DURATION.fast,
          ease: 'none',
        });
        gsap.to(actions, {
          y: 0,
          opacity: 1,
          duration: DURATION.fast,
          ease: EASE_DEFAULT,
        });
      };

      const leaveAnim = () => {
        gsap.to(image, {
          scale: 1,
          duration: DURATION.normal,
          ease: EASE_DEFAULT,
        });
        gsap.to(overlay, {
          opacity: 0,
          duration: DURATION.fast,
          ease: 'none',
        });
        gsap.to(actions, {
          y: 8,
          opacity: 0,
          duration: DURATION.fast,
          ease: EASE_DEFAULT,
        });
      };

      const isTouchDevice = window.matchMedia('(hover: none)').matches;
      if (!isTouchDevice) {
        card.addEventListener('mouseenter', enterAnim);
        card.addEventListener('mouseleave', leaveAnim);
      }

      return () => {
        card.removeEventListener('mouseenter', enterAnim);
        card.removeEventListener('mouseleave', leaveAnim);
      };
    },
    { scope: cardRef, dependencies: [reducedMotion] },
  );

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    toast.success(`${product.name} added to cart`, {
      description: formatPrice(product.price),
    });
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggle(product.id);
    toast(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist', {
      icon: isWishlisted ? '🤍' : '❤️',
    });
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <Card
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onClick={() => openQuickView(product)}
      className="group border-0 ring-0 bg-transparent p-0 gap-3 rounded-none cursor-pointer"
    >
      {/* Image container */}
      <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-muted">
        <ImageWithFallback
          src={product.image}
          alt={product.name}
          fill
          priority={priority}
          className="product-image object-cover will-change-transform"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Overlay */}
        <div
          className="product-overlay absolute inset-0 bg-black/20 opacity-0"
          aria-hidden="true"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isNew && (
            <Badge variant="default" className="text-[10px] tracking-wider uppercase">
              New
            </Badge>
          )}
          {discount !== null && (
            <Badge variant="secondary" className="text-[10px] tracking-wider uppercase">
              -{discount}%
            </Badge>
          )}
          {!product.inStock && (
            <Badge
              variant="outline"
              className="text-[10px] tracking-wider uppercase bg-background/80"
            >
              Sold Out
            </Badge>
          )}
        </div>

        {/* Wishlist — top right */}
        <div className="absolute top-3 right-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleWishlistToggle}
            aria-label={
              isWishlisted
                ? `Remove ${product.name} from wishlist`
                : `Add ${product.name} to wishlist`
            }
            className={cn(
              'w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm',
              'hover:bg-background hover:scale-110 transition-transform',
              isWishlisted && 'text-destructive',
            )}
          >
            <Icons.heart size={15} className={cn(isWishlisted && 'fill-current')} />
          </Button>
        </div>

        {/* Hover actions */}
        <div
          className={cn(
            'product-actions absolute bottom-3 left-3 right-3 flex gap-2 z-[9999]',
            'md:opacity-0 md:translate-y-2',
            'opacity-100 translate-y-0',
          )}
        >
          <Button
            variant="default"
            className="flex-1 h-9 text-xs tracking-wider bg-background/90 backdrop-blur-sm text-foreground hover:bg-background"
            onClick={handleAddToCart}
            disabled={!product.inStock}
            aria-label={`Add ${product.name} to cart`}
          >
            {product.inStock ? 'Add to Cart' : 'Sold Out'}
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9 bg-background/90 backdrop-blur-sm border-0"
            onClick={(e) => {
              e.stopPropagation();
              openQuickView(product);
            }}
            aria-label={`Quick view ${product.name}`}
          >
            <Icons.eye size={15} />
          </Button>
        </div>
      </div>

      {/* Card content */}
      <CardContent className="px-0 pb-0">
        <div className="flex flex-col gap-1">
          {/* Category */}
          <span className="text-[11px] tracking-widest uppercase text-muted-foreground">
            {product.category}
          </span>

          {/* Name */}
          <h3 className="font-serif text-sm font-medium text-foreground leading-snug line-clamp-1">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1.5">
            <div
              className="flex items-center gap-0.5"
              role="img"
              aria-label={`Rating: ${product.rating} out of 5`}
            >
              {[1, 2, 3, 4, 5].map((starValue) => (
                <Icons.star
                  key={starValue}
                  size={11}
                  className={cn(
                    starValue <= Math.floor(product.rating)
                      ? 'text-foreground fill-current'
                      : 'text-muted-foreground',
                  )}
                />
              ))}
            </div>
            <span className="text-[11px] text-muted-foreground">({product.reviewCount})</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2 mt-0.5">
            <span className="font-serif text-sm font-semibold text-foreground tabular-nums">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-muted-foreground line-through tabular-nums">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
