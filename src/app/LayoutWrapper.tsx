'use client';

import React from 'react';
import DarkModeToggle from '@/components/shared/DarkModeToggle';

interface Props {
  children: React.ReactNode;
}

export default function LayoutWrapper({ children }: Props) {
  return (
    <div className="min-h-screen text-gray-900 dark:text-white">
      <DarkModeToggle />
      {children}
    </div>
  );
}
