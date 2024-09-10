'use client';

import React from 'react';

interface ToastProps {
  message: string;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  return (
    <div className="fixed bottom-4 right-4 bg-gray-800 text-white p-4 rounded shadow-lg flex items-center space-x-4 z-50">
      <span>{message}</span>
      <button onClick={onClose} className="text-gray-400 hover:text-gray-200">
        &times;
      </button>
    </div>
  );
};
