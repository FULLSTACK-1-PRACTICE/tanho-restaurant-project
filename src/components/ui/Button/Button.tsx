import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  }

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled,
  className = '',
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 active:scale-[0.98] select-none';

  const variants = {
    primary:
      'bg-[#DCAE4D] hover:bg-[#c99b3d] text-black shadow-lg shadow-[#DCAE4D]/20 active:bg-[#b98d36]',
    secondary:
      'bg-[#1a1d24] hover:bg-[#222630] text-[#DCAE4D] border border-[#DCAE4D]/30',
    outline:
      'border border-gray-700 hover:border-[#DCAE4D]/50 text-gray-200 hover:text-[#DCAE4D] bg-transparent',
    ghost:
      'bg-transparent text-gray-300 hover:bg-white/5 hover:text-white',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-6 py-3 text-sm gap-2',
    lg: 'px-8 py-4 text-base gap-2.5',
  };

  return (
    <button
      disabled={disabled || isLoading}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {isLoading && (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      )}
      {children}
    </button>
  );
};

export default Button;