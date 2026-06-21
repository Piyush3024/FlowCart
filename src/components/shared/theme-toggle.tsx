'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Icons } from './icons';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) {
    return <div className="h-9 w-9" />;
  }

  return (
    <Button
      aria-label="Toggle theme"
      className="text-muted-foreground transition-colors hover:text-foreground"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      size="icon"
      variant="ghost"
    >
      {theme === 'dark' ? <Icons.sun size={20} /> : <Icons.moon size={20} />}
    </Button>
  );
}
