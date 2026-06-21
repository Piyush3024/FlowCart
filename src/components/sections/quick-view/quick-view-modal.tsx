'use client';

import { useEffect, useRef, useState } from 'react';
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
  const product = useQuickViewStore((s) => s.product);
  const close = useQuickViewStore((s) => s.close);
  const addItem = useCartStore((s) => s.addItem);
  const toggle = useWishlistStore((s) => s.toggle);
  const isWishlisted = useWishlistStore((s) => (product ? s.ids.includes(product.id) : false));
  const overlayRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);

  // Open animation
  useGSAP(
    () => {
      if (!product || reducedMotion) {
        return;
      }

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
        if (e.key === 'Escape' && product) {
          handleClose();
        }
      };
      window.addEventListener('keydown', handler);
      return () => window.removeEventListener('keydown', handler);
    },
    { dependencies: [product] },
  );

  // Focus trap
  useEffect(() => {
    if (!(product && modalRef.current)) {
      return;
    }

    const focusableSelectors = [
      'a[href]',
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ].join(', ');

    const focusableEls = Array.from(
      modalRef.current.querySelectorAll<HTMLElement>(focusableSelectors),
    );

    if (focusableEls.length === 0) {
      return;
    }

    const firstEl = focusableEls[0];
    const lastEl = focusableEls.at(-1);

    if (!(firstEl && lastEl)) {
      return;
    }

    firstEl.focus();

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') {
        return;
      }
      if (e.shiftKey) {
        if (document.activeElement === firstEl) {
          lastEl.focus();
          e.preventDefault();
        }
      } else if (document.activeElement === lastEl) {
        firstEl.focus();
        e.preventDefault();
      }
    };

    window.addEventListener('keydown', handleTab);
    return () => window.removeEventListener('keydown', handleTab);
  }, [product]);

  if (!product) {
    return null;
  }

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
      aria-labelledby="quick-view-title"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
    >
      {/* Overlay */}
      <Button
        aria-label="Close quick view"
        className="absolute inset-0 h-full w-full cursor-default rounded-none border-none bg-black/60 p-0 backdrop-blur-sm hover:bg-black/60 focus-visible:ring-0 active:translate-y-0"
        onClick={handleClose}
        ref={overlayRef}
        variant="ghost"
      />

      {/* Modal */}
      <div
        className={cn(
          'relative z-10 max-h-[90vh] w-full max-w-3xl overflow-y-auto',
          'rounded-2xl border border-border bg-card shadow-2xl',
        )}
        ref={modalRef}
      >
        {/* Close */}
        <Button
          aria-label="Close quick view"
          className="absolute top-4 right-4 z-10"
          onClick={handleClose}
          size="icon"
          variant="ghost"
        >
          <Icons.close size={18} />
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Images */}
          <div className="flex flex-col gap-3 p-4">
            {/* Main image */}
            <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-muted">
              <ImageWithFallback
                alt={product.name}
                className="object-cover"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 400px"
                src={product.images[selectedImage] ?? product.image}
              />
              {product.isNew && (
                <div className="absolute top-3 left-3">
                  <Badge className="text-[10px] uppercase tracking-wider">New</Badge>
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, i) => (
                  <Button
                    aria-label={`View image ${i + 1}`}
                    className={cn(
                      'relative aspect-square w-16 shrink-0 overflow-hidden rounded-lg bg-muted p-0 hover:bg-muted',
                      'ring-2 transition-all',
                      selectedImage === i ? 'ring-primary' : 'ring-transparent hover:ring-border',
                    )}
                    key={img}
                    onClick={() => setSelectedImage(i)}
                    variant="ghost"
                  >
                    <ImageWithFallback
                      alt={`${product.name} view ${i + 1}`}
                      className="object-cover"
                      fill
                      sizes="64px"
                      src={img}
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
              <span className="text-[11px] text-muted-foreground uppercase tracking-widest">
                {product.category}
              </span>
              <h2
                className="font-bold font-serif text-2xl text-card-foreground leading-tight"
                id="quick-view-title"
              >
                {product.name}
              </h2>

              {/* Rating */}
              <div className="mt-1 flex items-center gap-2">
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
                      size={13}
                    />
                  ))}
                </div>
                <span className="text-muted-foreground text-xs">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>
            </div>

            <Separator />

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="font-bold font-serif text-2xl text-foreground tabular-nums">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-muted-foreground text-sm tabular-nums line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                  <Badge className="text-[10px] uppercase tracking-wider" variant="secondary">
                    -{discount}%
                  </Badge>
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-muted-foreground text-sm leading-relaxed">{product.description}</p>

            <Separator />

            {/* Colors */}
            {product.colors.length > 0 && (
              <div className="flex flex-col gap-2">
                <span className="font-medium text-foreground text-xs uppercase tracking-wide">
                  Color — {product.colors[0]?.name}
                </span>
                <div className="flex gap-2">
                  {product.colors.map((color) => (
                    <Button
                      aria-label={`Color: ${color.name}`}
                      className="h-6 w-6 rounded-full ring-2 ring-border ring-offset-2 ring-offset-card transition-all hover:ring-primary"
                      key={color.name}
                      style={{ backgroundColor: color.hex }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.sizes.length > 1 && (
              <div className="flex flex-col gap-2">
                <span className="font-medium text-foreground text-xs uppercase tracking-wide">
                  Size {selectedSize ? `— ${selectedSize}` : ''}
                </span>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <Button
                      aria-label={`Size ${size}`}
                      aria-pressed={selectedSize === size}
                      className={cn(
                        'h-9 min-w-[2.5rem] rounded-md px-3 font-medium text-xs transition-all',
                        selectedSize === size
                          ? ''
                          : 'border-border bg-transparent text-foreground hover:border-foreground hover:bg-transparent',
                      )}
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      variant={selectedSize === size ? 'default' : 'outline'}
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="mt-auto flex gap-3 pt-2">
              <Button
                className="h-11 flex-1 tracking-wider"
                disabled={!product.inStock}
                onClick={handleAddToCart}
              >
                {product.inStock ? 'Add to Cart' : 'Sold Out'}
              </Button>
              <Button
                aria-label={
                  isWishlisted
                    ? `Remove ${product.name} from wishlist`
                    : `Add ${product.name} to wishlist`
                }
                className={cn('h-11 w-11', isWishlisted && 'border-destructive text-destructive')}
                onClick={() => toggle(product.id)}
                size="icon"
                variant="outline"
              >
                <Icons.heart className={cn(isWishlisted && 'fill-current')} size={18} />
              </Button>
            </div>

            {/* Stock warning */}
            {!product.inStock && (
              <p className="text-center text-muted-foreground text-xs">
                This item is currently out of stock.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
