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
import { useOptimisticCart } from '@/hooks/use-optimistic-cart';
import { useOptimisticWishlist } from '@/hooks/use-optimistic-wishlist';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { DURATION, EASE_DEFAULT, gsap, useGSAP } from '@/lib/gsap';
import { cn, formatPrice } from '@/lib/utils';
import { fetchProductDetail } from '@/services/product.service';
import { useQuickViewStore } from '@/stores/quick-view.store';
import type { Product } from '@/types/product.types';

interface ProductCardProps {
  priority?: boolean;
  product: Product;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const reducedMotion = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();
  const { addItem } = useOptimisticCart();
  const { toggle, has: isWishlisted } = useOptimisticWishlist();
  const openQuickView = useQuickViewStore((s) => s.open);

  const handleMouseEnter = () => {
    queryClient.prefetchQuery({
      queryKey: QUERY_KEYS.products.detail(product.id),
      queryFn: () => fetchProductDetail(product.id),
      staleTime: 5 * 60 * 1000,
    });
  };

  useGSAP(
    () => {
      if (reducedMotion || !cardRef.current) {
        return;
      }

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
    const currentlyWishlisted = isWishlisted(product.id);
    toggle(product.id);
    toast(currentlyWishlisted ? 'Removed from wishlist' : 'Added to wishlist', {
      icon: currentlyWishlisted ? '🤍' : '❤️',
    });
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <Card
      className="group cursor-pointer gap-3 rounded-none border-0 bg-transparent p-0 ring-0"
      onClick={() => openQuickView(product)}
      onMouseEnter={handleMouseEnter}
      ref={cardRef}
    >
      {/* Image container */}
      <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-muted">
        <ImageWithFallback
          alt={product.name}
          className="product-image object-cover will-change-transform"
          fill
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          src={product.image}
        />

        {/* Overlay */}
        <div
          aria-hidden="true"
          className="product-overlay absolute inset-0 bg-black/20 opacity-0"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isNew && (
            <Badge className="text-[10px] uppercase tracking-wider" variant="default">
              New
            </Badge>
          )}
          {discount !== null && (
            <Badge className="text-[10px] uppercase tracking-wider" variant="secondary">
              -{discount}%
            </Badge>
          )}
          {!product.inStock && (
            <Badge
              className="bg-background/80 text-[10px] uppercase tracking-wider"
              variant="outline"
            >
              Sold Out
            </Badge>
          )}
        </div>

        {/* Wishlist — top right */}
        <div className="absolute top-3 right-3">
          <Button
            aria-label={
              isWishlisted(product.id)
                ? `Remove ${product.name} from wishlist`
                : `Add ${product.name} to wishlist`
            }
            className={cn(
              'h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm',
              'transition-transform hover:scale-110 hover:bg-background',
              isWishlisted(product.id) && 'text-destructive',
            )}
            onClick={handleWishlistToggle}
            size="icon"
            variant="ghost"
          >
            <Icons.heart className={cn(isWishlisted(product.id) && 'fill-current')} size={15} />
          </Button>
        </div>

        {/* Hover actions */}
        <div
          className={cn(
            'product-actions absolute right-3 bottom-3 left-3 z-[9999] flex gap-2',
            'md:translate-y-2 md:opacity-0',
            'translate-y-0 opacity-100',
          )}
        >
          <Button
            aria-label={`Add ${product.name} to cart`}
            className="h-9 flex-1 bg-background/90 text-foreground text-xs tracking-wider backdrop-blur-sm hover:bg-background"
            disabled={!product.inStock}
            onClick={handleAddToCart}
            variant="default"
          >
            {product.inStock ? 'Add to Cart' : 'Sold Out'}
          </Button>
          <Button
            aria-label={`Quick view ${product.name}`}
            className="h-9 w-9 border-0 bg-background/90 backdrop-blur-sm"
            onClick={(e) => {
              e.stopPropagation();
              openQuickView(product);
            }}
            size="icon"
            variant="outline"
          >
            <Icons.eye size={15} />
          </Button>
        </div>
      </div>

      {/* Card content */}
      <CardContent className="px-0 pb-0">
        <div className="flex flex-col gap-1">
          {/* Category */}
          <span className="text-[11px] text-muted-foreground uppercase tracking-widest">
            {product.category}
          </span>

          {/* Name */}
          <h3 className="line-clamp-1 font-medium font-serif text-foreground text-sm leading-snug">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1.5">
            <div
              aria-label={`Rating: ${product.rating} out of 5`}
              className="flex items-center gap-0.5"
              role="img"
            >
              {[1, 2, 3, 4, 5].map((starValue) => (
                <Icons.star
                  className={cn(
                    starValue <= Math.floor(product.rating)
                      ? 'fill-current text-foreground'
                      : 'text-muted-foreground',
                  )}
                  key={starValue}
                  size={11}
                />
              ))}
            </div>
            <span className="text-[11px] text-muted-foreground">({product.reviewCount})</span>
          </div>

          {/* Price */}
          <div className="mt-0.5 flex items-center gap-2">
            <span className="font-semibold font-serif text-foreground text-sm tabular-nums">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-muted-foreground text-xs tabular-nums line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
