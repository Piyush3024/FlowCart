'use client';

import { useRef, useState } from 'react';
import { toast } from 'sonner';
import { Icons } from '@/components/shared/icons';
import { ImageWithFallback } from '@/components/shared/image-with-fallback';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { DURATION, EASE_DEFAULT, gsap, useGSAP } from '@/lib/gsap';
import { cn, formatPrice } from '@/lib/utils';
import { useCartStore } from '@/stores/cart.store';
import { useQuickViewStore } from '@/stores/quick-view.store';
import { useWishlistStore } from '@/stores/wishlist.store';

export function QuickViewModal() {
  const reducedMotion = useReducedMotion();
  const { product, close } = useQuickViewStore();
  const addItem = useCartStore((s) => s.addItem);
  const { toggle, has } = useWishlistStore();
  const overlayRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);

  const isWishlisted = product ? has(product.id) : false;

  // Open animation
  useGSAP(
    () => {
      if (!product || reducedMotion) return;

      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: DURATION.fast, ease: 'none' },
      );
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, y: 30, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: DURATION.normal,
          ease: EASE_DEFAULT,
        },
      );
    },
    { dependencies: [product, reducedMotion] },
  );

  const handleClose = () => {
    if (reducedMotion) {
      close();
      return;
    }
    gsap.to(overlayRef.current, { opacity: 0, duration: DURATION.fast });
    gsap.to(modalRef.current, {
      opacity: 0,
      y: 20,
      scale: 0.97,
      duration: DURATION.fast,
      ease: 'power2.in',
      onComplete: close,
    });
  };

  // Escape key
  useGSAP(
    () => {
      const handler = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && product) handleClose();
      };
      window.addEventListener('keydown', handler);
      return () => window.removeEventListener('keydown', handler);
    },
    { dependencies: [product] },
  );

  if (!product) return null;

  const handleAddToCart = () => {
    if (product.sizes.length > 1 && !selectedSize) {
      toast.error('Please select a size');
      return;
    }
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      ...(selectedSize ? { size: selectedSize } : {}),
    });
    toast.success(`${product.name} added to cart`, {
      description: selectedSize ? `Size: ${selectedSize}` : formatPrice(product.price),
    });
    handleClose();
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`Quick view: ${product.name}`}
    >
      {/* Overlay */}
      <Button
        variant="ghost"
        ref={overlayRef}
        onClick={handleClose}
        aria-label="Close quick view"
        className="absolute inset-0 w-full h-full bg-black/60 backdrop-blur-sm cursor-default hover:bg-black/60 active:translate-y-0 rounded-none border-none p-0 focus-visible:ring-0"
      />

      {/* Modal */}
      <div
        ref={modalRef}
        className={cn(
          'relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto',
          'bg-card rounded-2xl border border-border shadow-2xl',
        )}
      >
        {/* Close */}
        <Button
          variant="ghost"
          size="icon"
          onClick={handleClose}
          aria-label="Close quick view"
          className="absolute top-4 right-4 z-10"
        >
          <Icons.close size={18} />
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Images */}
          <div className="flex flex-col gap-3 p-4">
            {/* Main image */}
            <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-muted">
              <ImageWithFallback
                src={product.images[selectedImage] ?? product.image}
                alt={product.name}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 400px"
              />
              {product.isNew && (
                <div className="absolute top-3 left-3">
                  <Badge className="text-[10px] tracking-wider uppercase">New</Badge>
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, i) => (
                  <Button
                    key={img}
                    variant="ghost"
                    onClick={() => setSelectedImage(i)}
                    aria-label={`View image ${i + 1}`}
                    className={cn(
                      'relative w-16 aspect-square rounded-lg overflow-hidden bg-muted shrink-0 p-0 hover:bg-muted',
                      'ring-2 transition-all',
                      selectedImage === i ? 'ring-primary' : 'ring-transparent hover:ring-border',
                    )}
                  >
                    <ImageWithFallback
                      src={img}
                      alt={`${product.name} view ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </Button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col gap-5 p-6">
            {/* Category + name */}
            <div className="flex flex-col gap-1">
              <span className="text-[11px] tracking-widest uppercase text-muted-foreground">
                {product.category}
              </span>
              <h2 className="font-serif text-2xl font-bold text-card-foreground leading-tight">
                {product.name}
              </h2>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-1">
                <div
                  className="flex items-center gap-0.5"
                  role="img"
                  aria-label={`Rating: ${product.rating} out of 5`}
                >
                  {[1, 2, 3, 4, 5].map((starValue) => (
                    <Icons.star
                      key={starValue}
                      size={13}
                      className={cn(
                        starValue <= Math.floor(product.rating)
                          ? 'text-foreground fill-current'
                          : 'text-muted-foreground',
                      )}
                    />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>
            </div>

            <Separator />

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="font-serif text-2xl font-bold text-foreground tabular-nums">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-sm text-muted-foreground line-through tabular-nums">
                    {formatPrice(product.originalPrice)}
                  </span>
                  <Badge variant="secondary" className="text-[10px] tracking-wider uppercase">
                    -{discount}%
                  </Badge>
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>

            <Separator />

            {/* Colors */}
            {product.colors.length > 0 && (
              <div className="flex flex-col gap-2">
                <span className="text-xs font-medium text-foreground tracking-wide uppercase">
                  Color — {product.colors[0]?.name}
                </span>
                <div className="flex gap-2">
                  {product.colors.map((color) => (
                    <Button
                      key={color.name}
                      aria-label={`Color: ${color.name}`}
                      className="w-6 h-6 rounded-full ring-2 ring-offset-2 ring-offset-card ring-border hover:ring-primary transition-all"
                      style={{ backgroundColor: color.hex }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.sizes.length > 1 && (
              <div className="flex flex-col gap-2">
                <span className="text-xs font-medium text-foreground tracking-wide uppercase">
                  Size {selectedSize ? `— ${selectedSize}` : ''}
                </span>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <Button
                      key={size}
                      variant={selectedSize === size ? 'default' : 'outline'}
                      onClick={() => setSelectedSize(size)}
                      aria-label={`Size ${size}`}
                      aria-pressed={selectedSize === size}
                      className={cn(
                        'h-9 min-w-[2.5rem] px-3 rounded-md text-xs font-medium transition-all',
                        selectedSize === size
                          ? ''
                          : 'bg-transparent text-foreground border-border hover:border-foreground hover:bg-transparent',
                      )}
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 mt-auto pt-2">
              <Button
                className="flex-1 h-11 tracking-wider"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                {product.inStock ? 'Add to Cart' : 'Sold Out'}
              </Button>
              <Button
                variant="outline"
                size="icon"
                className={cn('h-11 w-11', isWishlisted && 'text-destructive border-destructive')}
                onClick={() => toggle(product.id)}
                aria-label={
                  isWishlisted
                    ? `Remove ${product.name} from wishlist`
                    : `Add ${product.name} to wishlist`
                }
              >
                <Icons.heart size={18} className={cn(isWishlisted && 'fill-current')} />
              </Button>
            </div>

            {/* Stock warning */}
            {!product.inStock && (
              <p className="text-xs text-muted-foreground text-center">
                This item is currently out of stock.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
