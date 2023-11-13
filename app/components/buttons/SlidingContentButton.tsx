'use client';

import { FC, ReactNode, useEffect, useState } from 'react';
import { IconType } from 'react-icons';
import Button from './Button';
import SlidingContent from '../SlidingContent';
import { useRouter } from 'next/navigation';

interface SlidingContentButton {
  buttonLabel: string;
  buttonIcon?: IconType;
  heading: string;
  content: ReactNode;
  disabled?: boolean;
  border?: boolean;
  externalState?: boolean;
  setExternalState?: (state: boolean) => void;
  contentLogo?: boolean;
}

const SlidingContentButton: FC<SlidingContentButton> = ({
  buttonLabel,
  buttonIcon,
  heading,
  content,
  disabled,
  border,
  externalState,
  setExternalState,
  contentLogo,
}) => {
  const router = useRouter();
  const [isVisible, setIsvisible] = useState(
    externalState !== undefined ? externalState : false
  );

  useEffect(() => {
    if (externalState !== undefined) {
      setIsvisible(externalState);
    }
  }, [externalState]);

  const handleOpen = () => {
    router.refresh();
    if (externalState !== undefined && setExternalState) {
      return setExternalState(true);
    }
    setIsvisible(true);
  };

  const handleClose = () => {
    if (externalState !== undefined && setExternalState) {
      setTimeout(() => {
        setExternalState(false);
      }, 300);
    }
    setIsvisible(false);
  };

  return (
    <>
      <Button
        onClick={handleOpen}
        type="button"
        label={buttonLabel}
        small
        outline
        icon={buttonIcon}
        disabled={disabled}
        border={border}
      />
      <SlidingContent
        heading={heading}
        isOpen={isVisible}
        onClose={handleClose}
        content={content}
        logo={contentLogo}
      />
    </>
  );
};

export default SlidingContentButton;
1;
