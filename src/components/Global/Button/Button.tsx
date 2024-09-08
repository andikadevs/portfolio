import React from 'react';
import { ButtonProps } from './ButtonProps';

export const Button: React.FC<ButtonProps> = ({
  onClick,
  className = '',
  children,
  disabled = false,
  variant = 'fill',
  size = 'md',
}) => {
  const baseStyles     = 'flex items-center gap-2 transition-colors duration-300 ease-in-out shadow-sm';
  const fillStyles     = 'bg-accent hover:brightness-110 text-secondary';
  const outlineStyles  = 'bg-transparent border border-accent hover:bg-accent hover:text-secondary text-accent';
  const disabledStyles = 'bg-transparent border border-dark text-dark cursor-not-allowed hover:bg-transparent hover:text-dark'; 

  // Size variants
  const sizeStyles = size === 'sm' ? 'px-2 py-1 text-sm' : 'px-4 py-2 text-base'; 

  // Determine the styles based on the variant and size
  const variantStyles = variant === 'fill' ? fillStyles : outlineStyles;

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles} ${variantStyles} ${className} ${disabled ? disabledStyles : ''}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
