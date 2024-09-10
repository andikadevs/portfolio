'use client';

import React, { useEffect, useState } from 'react';
import { Toast } from '@/components/Global';

interface Fact {
  text: string;
}

export const Facts: React.FC = () => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showToast, setShowToast] = useState<boolean>(false);

  const toastDisplayDuration  = 10000; 
  const intervalBetweenToasts = 10000;

  let displayTimeoutId: number | undefined;
  let delayTimeoutId: number | undefined;

  const fetchFact = async () => {
    try {
      const response = await fetch('https://uselessfacts.jsph.pl/random.json?language=en');
      const data: Fact = await response.json();
      setToastMessage(data.text);
      setShowToast(true);

      displayTimeoutId = window.setTimeout(() => {
        setShowToast(false);
      }, toastDisplayDuration);
    } catch (error) {
      console.error('Error fetching fact:', error);
    }
  };

  useEffect(() => {
    const showToastWithDelay = async () => {
      await fetchFact();

      delayTimeoutId = window.setTimeout(() => {
        showToastWithDelay();
      }, toastDisplayDuration + intervalBetweenToasts);
    };

    showToastWithDelay();

    return () => {
      if (displayTimeoutId) clearTimeout(displayTimeoutId);
      if (delayTimeoutId) clearTimeout(delayTimeoutId);
    };
  }, []);

  const handleClose = () => {
    setShowToast(false);
    if (displayTimeoutId) clearTimeout(displayTimeoutId);
  };

  return (
    <>
      {showToast && toastMessage && (
        <Toast
          title="Did you know?"
          message={toastMessage}
          onClose={handleClose}
          delay={toastDisplayDuration}
        />
      )}
    </>
  );
};
