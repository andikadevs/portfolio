'use client';

import React, { useEffect, useState } from 'react';
import { ToastProps } from './ToastPropsInterface';
import { useSpring, animated } from '@react-spring/web';

export const Toast: React.FC<ToastProps> = ({ title, message, onClose, delay }) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
  
    const animationProps = useSpring({
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
      config: { tension: 220, friction: 20 },
      onRest: () => {
        if (!isVisible) onClose();
      },
    });
  
    useEffect(() => {
      setIsVisible(true);
  
      const hideToastTimeout = setTimeout(() => {
        setIsVisible(false);
      }, delay);
  
      return () => clearTimeout(hideToastTimeout);
    }, [delay]);
  
    return (
      <animated.div
        style={animationProps}
        className={`fixed max-w-[calc(100vw-3rem)] sm:max-w-[50%] bottom-4 right-4 bg-gray-800 text-white p-4 rounded shadow-lg flex items-start space-x-4 z-50`}
      >
        <div className="flex-1 pr-6">
          <strong className="block relative">
            {title}
            <div className="absolute w-[50px] h-[2px] bg-accent bottom-0"></div>
          </strong>
          <p className="mt-1">{message}</p>
        </div>
        <button 
          onClick={onClose} 
          className="text-gray-400 hover:text-gray-200 h-6 w-6 flex items-center justify-center"
        >
          &times;
        </button>
      </animated.div>
    );
};