import React from 'react';

type ButtonProps = React.ComponentProps<'button'>;

const Button = ({ children, className = '', ...props }: ButtonProps) => {
  return (
    <button
      className={`cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;