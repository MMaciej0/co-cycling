'use client';

import { FC, ReactNode, useState } from 'react';
import { IconType } from 'react-icons';
import Button from './Button';
import SlidingContent from '../SlidingContent';

interface SlidingContentButton {
  buttonLabel: string;
  buttonIcon?: IconType;
  heading: string;
  content: ReactNode;
  disabled?: boolean;
}

const SlidingContentButton: FC<SlidingContentButton> = ({
  buttonLabel,
  buttonIcon,
  heading,
  content,
  disabled,
}) => {
  const [isVisible, setIsvisible] = useState(false);
  return (
    <>
      <Button
        onClick={() => setIsvisible(true)}
        type="button"
        label={buttonLabel}
        small
        outline
        icon={buttonIcon}
        disabled={disabled}
      />
      <SlidingContent
        heading={heading}
        isOpen={isVisible}
        onClose={() => setIsvisible(false)}
        content={content}
      />
    </>
  );
};

export default SlidingContentButton;
