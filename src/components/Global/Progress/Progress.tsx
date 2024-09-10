'use client';

import React, { useEffect, useState } from 'react';

export const Progress: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  const updateScrollProgress = () => {
    const scrollTop = window.scrollY;
    const documentHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    const totalHeight = documentHeight - windowHeight;
    const progress = (scrollTop / totalHeight) * 100;
    setScrollProgress(progress);
  };

  useEffect(() => {
    window.addEventListener('scroll', updateScrollProgress);
    updateScrollProgress();
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-main">
      <div
        className="h-1 bg-accent-contrast bg-accent"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
};
