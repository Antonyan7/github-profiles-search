'use client';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ThemeMode } from '@/src/enums';
import { dispatch } from '@/src/redux/hooks';
import {
  githubSearchMiddleware,
  githubSearchSelector,
} from '@/src/redux/slices/githubSearch';
import { useSelector } from 'react-redux';

export default function DarkModeToggle() {
  const isDark = useSelector(githubSearchSelector.isDarkMode);

  useEffect(() => {
    const stored = localStorage.getItem('dark-mode');

    const shouldEnableDark = stored === ThemeMode.DARK || !stored;
    document.documentElement.classList.toggle('dark', shouldEnableDark);

    dispatch(githubSearchMiddleware.updateIsDarkMode(shouldEnableDark));
  }, []);

  const toggleDark = () => {
    const newTheme = isDark ? ThemeMode.LIGHT : ThemeMode.DARK;

    localStorage.setItem('dark-mode', newTheme);
    document.documentElement.classList.toggle(
      'dark',
      newTheme === ThemeMode.DARK
    );

    dispatch(githubSearchMiddleware.updateIsDarkMode(!isDark));
  };

  return (
    <Button
      onClick={toggleDark}
      className="absolute cursor-pointer top-4 right-4 p-2 rounded bg-gray-300 dark:bg-gray-700 text-sm"
    >
      {isDark ? '🌞 Light' : '🌙 Dark'}
    </Button>
  );
}
