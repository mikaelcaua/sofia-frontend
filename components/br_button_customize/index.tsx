import React from 'react';

interface BRButtonProps {
  type?: 'button' | 'submit' | 'reset';
  children: React.ReactNode;
  emphasis: 'primary' | 'secondary';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const BrButtonCustomize: React.FC<BRButtonProps> = ({
  type = 'button',
  children,
  emphasis = 'primary',
  onClick,
  disabled = false,
  className = '',
  ...props
}) => {
  const baseClasses =
    'px-6 py-3 rounded-full font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const emphasisClasses =
    emphasis === 'primary'
      ? 'bg-[#1351b4] text-white hover:bg-[#2c5aa0] focus:ring-blue-500'
      : 'border-2 border-[#396DC0] text-[#396DC0] bg-transparent hover:bg-blue-50 focus:ring-blue-500';

  return (
    <button
      type={type}
      className={` ${emphasisClasses}  ${baseClasses} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default BrButtonCustomize;
