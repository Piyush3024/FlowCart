'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Icons } from './icons';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="w-9 h-9" />;

  return (
    <button
      type="button"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label="Toggle theme"
      className="p-2 text-muted-foreground hover:text-foreground transition-colors"
    >
      {theme === 'dark' ? <Icons.sun size={20} /> : <Icons.moon size={20} />}
    </button>
  );
}
