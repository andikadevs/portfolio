'use client';

import { useEffect } from 'react';

export const GoToTop = () => {
  useEffect(() => {
    window.scrollTo({ 
      top: 0,
      left: 0, 
      behavior: 'smooth'
    });
  }, []);

  return null;
}