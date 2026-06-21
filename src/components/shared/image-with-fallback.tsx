'use client';

import Image, { type ImageProps } from 'next/image';
import { useEffect, useState } from 'react';

import NoImgFallback from '@/assets/no-image.png';

export interface ImageWithFallbackProps extends Omit<ImageProps, 'src' | 'onError'> {
  fallbackSrc?: string;
  src?: string | null;
}

export function ImageWithFallback({
  src,
  fallbackSrc = NoImgFallback.src,
  ...props
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState<string>(src ?? fallbackSrc);

  useEffect(() => {
    setImgSrc(src ?? fallbackSrc);
  }, [src, fallbackSrc]);

  const handleError = () => {
    if (imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc);
    }
  };

  return <Image {...props} onError={handleError} src={imgSrc} />;
}
