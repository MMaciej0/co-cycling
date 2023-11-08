'use client';

import { FC, ReactNode, useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import Heading from './Heading';
import Logo from './navbar/Logo';

interface SlidingContentProps {
  isOpen: boolean;
  onClose: () => void;
  heading: string;
  content: ReactNode;
  logo?: boolean;
}

const SlidingContent: FC<SlidingContentProps> = ({
  isOpen,
  heading,
  onClose,
  content,
  logo,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [isOpen]);

  return (
    <div
      className={`${
        isOpen ? 'translate-x-0' : 'translate-x-[200%]'
      } transition duration-300 fixed inset-0 pt-20 md:pt-32 pb-10 before:content-[''] before:bg-primary before:opacity-[0.98] before:absolute before:top-0 before:left-0 before:right-0 before:h-full before:-z-10 z-10 overflow-hidden`}
    >
      {logo && (
        <div className="absolute top-5 md:top-10 text-center w-full">
          <Logo />
        </div>
      )}
      <div className="max-w-contentContainer w-full h-full mx-auto md:px-12 flex flex-col">
        <div className="relative border-b-[1px] border-highlight/20">
          <div className="bg-highlight text-primary md:rounded-t-xl">
            <Heading heading={heading} center />
            <button
              onClick={onClose}
              className="text-xl absolute top-5 right-5 hover:text-primary/60 transition"
            >
              <AiOutlineClose />
            </button>
          </div>
        </div>
        <div className="overflow-y-auto h-full grow noscrollbar">{content}</div>
      </div>
    </div>
  );
};

export default SlidingContent;
