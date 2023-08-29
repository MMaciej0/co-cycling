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
  secondaryActionLabel?: string;
  secondaryAction?: () => void;
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
  secondaryAction,
  secondaryActionLabel,
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
    <div className="fixed inset-0 bg-secondary/95 flex justify-center items-center z-50">
      <div className="w-full md:w-4/6 lg:w-3/6 lgl:w-3/6 xl:w-2/6 h-full md:h-auto">
        <div
          className={`${
            showModal
              ? 'translate-y-0 bg-primary md:rounded-lg overflow-y-auto'
              : 'translate-y-full'
          } ${
            showModal ? 'opacity-100' : 'opacity-0'
          } transition duration-300 h-full`}
        >
          <div className="py-4 md:border-highlight md:border-[1px] md:rounded-lg h-full">
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
              <div
                className={`mt-10 ${
                  secondaryAction && secondaryActionLabel && 'flex'
                }`}
              >
                {secondaryAction && secondaryActionLabel && (
                  <div className="mr-4 w-full">
                    <Button
                      label={secondaryActionLabel}
                      onClick={secondaryAction}
                      type="button"
                      outline
                    />
                  </div>
                )}
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
                <div className="pt-10 border-t border-secondary">{footer}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
