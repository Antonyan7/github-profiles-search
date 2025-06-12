'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { githubSearchSelector } from '@/src/redux/slices/githubSearch';

interface Props {
  children: React.ReactNode;
}

export default function LayoutWrapper({ children }: Props) {
  const isDark = useSelector(githubSearchSelector.isDarkMode);

  return (
    <div
      className={`min-h-screen text-gray-900 dark:text-white ${
        isDark ? 'bg-gray-100 dark:bg-gray-900' : 'bg-gray-200'
      }`}
    >
      {children}
    </div>
  );
}
