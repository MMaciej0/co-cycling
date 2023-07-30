'use client';

import { memo } from 'react';
import { IconType } from 'react-icons';

interface ButtonProps {
  label: string;
  onClick: () => void;
  type: 'button' | 'reset' | 'submit';
  outline?: boolean;
  icon?: IconType;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  type,
  outline,
  icon: Icon,
  disabled,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`relative w-full py-4 tracking-widest font-semibold rounded-md ${
        outline
          ? 'border-[1px] border-highlight hover:text-primary'
          : 'bg-highlight/70 text-primary'
      } hover:bg-highlight transition duration-300`}
    >
      {Icon && (
        <Icon className="hidden sml:block absolute top-4 left-8" size={20} />
      )}
      {label}
    </button>
  );
};

export default memo(Button);