'use client';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/shared/Button';
import LightIcon from '@/components/Icons/LightIcon';
import DarkIcon from '@/components/Icons/DarkIcon';
import { ThemeMode } from '@/src/enums';

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    const shouldUseDark =
      stored === ThemeMode.DARK ||
      (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches);
    document.documentElement.classList.toggle(ThemeMode.DARK, shouldUseDark);
    setIsDark(shouldUseDark);
  }, []);

  const toggleTheme = () => {
    const newTheme = isDark ? ThemeMode.LIGHT : ThemeMode.DARK;
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle(
      ThemeMode.DARK,
      newTheme === ThemeMode.DARK
    );
    setIsDark(!isDark);
  };

  return (
    <div className="absolute top-3 right-3">
      <Button className="bg-gray-600 disabled:opacity-50" onClick={toggleTheme}>
        {isDark ? <LightIcon /> : <DarkIcon />}
      </Button>
    </div>
  );
}
