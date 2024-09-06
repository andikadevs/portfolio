'use client'

import { useState, useEffect } from 'react';
import { TypingProps } from './TypingProps';

export const Typing = ({
  texts,
  typingSpeed = 100,
  deletingSpeed = 100,
  pauseDuration = 1000
}: TypingProps) => {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let typingInterval: NodeJS.Timeout | undefined;
    let deletingInterval: NodeJS.Timeout | undefined;

    const currentText = texts[index];

    const startTyping = () => {
      typingInterval = setInterval(() => {
        setText((prev) => {
          const newText = currentText.slice(0, prev.length + 1);
          if (newText === currentText) {
            clearInterval(typingInterval);
            setTimeout(() => {
              setIsDeleting(true);
            }, pauseDuration); // Pause before deleting
          }
          return newText;
        });
      }, typingSpeed);
    };

    const startDeleting = () => {
      deletingInterval = setInterval(() => {
        setText((prev) => {
          const newText = prev.slice(0, -1);
          if (newText === '') {
            clearInterval(deletingInterval);
            setIsDeleting(false);
            setIndex((prevIndex) => (prevIndex + 1) % texts.length);
          }
          return newText;
        });
      }, deletingSpeed);
    };

    const delayTimeout = setTimeout(() => {
      if (isDeleting) {
        startDeleting();
      } else {
        startTyping();
      }
    }, 500); // Delay before starting typing

    return () => {
      if (typingInterval) clearInterval(typingInterval);
      if (deletingInterval) clearInterval(deletingInterval);
      clearTimeout(delayTimeout);
    };
  }, [index, isDeleting, texts, typingSpeed, deletingSpeed, pauseDuration]);

  return <>{text}</>;
};
