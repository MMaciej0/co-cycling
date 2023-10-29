'use client';

import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import { BiSolidChevronDown } from 'react-icons/bi';
import Button from './Button';
import useClickOutside from '../../hooks/useClickOutside';

type DropdownButtonProps = {
  label: string;
  listContent: ReactNode;
  isOpen?: boolean;
  forceStatus?: (status: boolean) => void;
  small?: boolean;
};

const DropdownButton: FC<DropdownButtonProps> = ({
  label,
  listContent,
  isOpen,
  forceStatus,
  small,
}) => {
  const [listVisible, setListVisible] = useState(
    isOpen !== undefined ? isOpen : false
  );
  const btnRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setListVisible(isOpen);
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [isOpen]);

  useClickOutside(() => {
    setListVisible(false);
    if (isOpen && forceStatus) {
      forceStatus(false);
    }
  }, btnRef);

  const handleButtonClick = () => {
    setListVisible(!listVisible);
    if (isOpen !== undefined && forceStatus) {
      forceStatus(!isOpen);
    }
  };

  return (
    <div className="w-full">
      <div
        className={`${
          listVisible ? 'fixed' : 'hidden'
        } top-0 left-0 right-0 bottom-0 bg-secondary/95 z-40`}
      ></div>
      <div className={`relative ${listVisible && 'z-50'}`} ref={btnRef}>
        <Button
          type="button"
          icon={BiSolidChevronDown}
          label={label}
          onClick={handleButtonClick}
          outline
          active={listVisible}
          small={small}
        />
        <ul
          className={`${
            listVisible
              ? 'min-h-full opacity-1 rounded-md'
              : 'h-0 opacity-0 -z-40 hidden'
          } transition-all w-full p-2 absolute my-10 bg-primary shadow-lg shadow-highlight/20`}
        >
          {listContent}
        </ul>
      </div>
    </div>
  );
};

export default DropdownButton;
