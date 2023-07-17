'use client';

import { useCallback, useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import Heading from '../Heading';
import Button from '../Button';

interface ModalProps {
  heading: string;
  subheading?: string;
  isOpen: boolean;
  disabled: boolean;
  onClose: () => void;
  onSubmit: () => void;
  body: React.ReactNode;
  actionLabel: string;
  footer?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  onClose,
  isOpen,
  onSubmit,
  heading,
  disabled,
  body,
  subheading,
  actionLabel,
  footer,
}) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }
    setTimeout(() => {
      onClose();
    }, 300);
    setShowModal(false);
  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }
    onSubmit();
  }, [disabled, onSubmit]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-secondary/95 overflow-y-auto flex justify-center items-center">
      <div className="w-full md:w-4/6 lg:w-3/6 lgl:w-3/6 xl:w-2/6 h-full md:h-auto">
        <div
          className={`${showModal ? 'translate-y-0' : 'translate-y-full'} ${
            showModal ? 'opacity-100' : 'opacity-0'
          } transition duration-300 h-full`}
        >
          <div className="py-4 bg-primary md:border-highlight md:border-[1px] md:rounded-lg h-full">
            {/* heading */}
            <div className="relative">
              <button
                onClick={handleClose}
                className="text-xl absolute top-5 right-5 hover:text-highlight"
              >
                <AiOutlineClose />
              </button>
              <Heading heading={heading} subheading={subheading} center />
            </div>
            {/* body */}
            <div className="w-full py-4 px-8">
              {body}
              <div className="mt-10 mx-4">
                <Button
                  label={actionLabel}
                  onClick={handleSubmit}
                  type="submit"
                  outline
                />
              </div>
            </div>
            {/* footer */}
            {footer && (
              <div className="w-full py-4 px-8">
                <div className="pt-10 mx-4 border-t border-secondary">
                  {footer}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
