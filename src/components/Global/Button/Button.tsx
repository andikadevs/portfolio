import { ButtonProps } from './ButtonProps';

export const Button: React.FC<ButtonProps> = ({
    onClick,
    className = '',
    children,
    disabled = false,
    variant = 'fill', 
  }) => {
    const baseStyles    = 'px-4 py-2 flex items-center gap-2 transition-colors duration-300 ease-in-out shadow-sm';
    const fillStyles    = 'bg-accent hover:brightness-110 text-secondary';
    const outlineStyles = 'bg-transparent border border-accent hover:bg-accent hover:text-secondary text-accent';
  
  
    const variantStyles = variant === 'fill' ? fillStyles : outlineStyles;
  
    return (
      <button
        onClick={onClick}
        className={`${baseStyles} ${variantStyles} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={disabled}
      >
        {children}
      </button>
    );
};