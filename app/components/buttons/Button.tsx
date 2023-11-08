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
  small?: boolean;
  active?: boolean;
  border?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  type,
  outline,
  icon: Icon,
  disabled,
  small,
  active,
  border = true,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`relative w-full ${
        border && 'border-[1px] border-highlight rounded-md'
      }  ${small ? 'py-2 px-2' : 'py-4 px-4'} tracking-widest font-semibold ${
        outline
          ? ` hover:text-primary ${active && 'bg-highlight text-primary'}`
          : 'bg-highlight/70 text-primary'
      } hover:bg-highlight transition duration-300 ${
        disabled && 'cursor-not-allowed bg-highlight/20 hover:bg-highlight/20'
      }`}
    >
      {Icon && (
        <Icon
          className={`hidden sml:block absolute ${
            small ? 'top-2' : 'top-4'
          }  left-8`}
          size={20}
        />
      )}
      {label}
    </button>
  );
};

export default memo(Button);
