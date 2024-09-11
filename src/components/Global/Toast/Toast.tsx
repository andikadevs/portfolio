'use client';

import React, { useEffect, useState } from 'react';
import { ToastProps } from './ToastPropsInterface';

export const Toast: React.FC<ToastProps> = ({ title, message, onClose, delay }) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
  
    useEffect(() => {
      setIsVisible(true);
  
      const hideToastTimeout = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 300);
      }, delay);
  
      return () => clearTimeout(hideToastTimeout);
    }, [onClose, delay]);
  
    return (
      <div
        className={`fixed max-w-[calc(100vw-3rem)] sm:max-w-[50%] bottom-4 right-4 bg-gray-800 text-white p-4 rounded shadow-lg flex items-center space-x-4 z-50 transform transition-transform duration-300 ease-in-out ${
          isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        }`}
        style={{
          zIndex: 999
        }}
      >
        <div>
          <strong className="relative">
            {title}
            <div className="absolute w-[50px] h-[2px] bg-accent bottom-0"></div>
          </strong>
          <p>{message}</p>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-200 absolute top-0 text-2xl right-2">
          &times;
        </button>
      </div>
    );
};