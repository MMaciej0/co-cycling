'use client';

import Modal from './Modal';
import useRegisterModal from '@/app/hooks/useRegisterModal';

const RegisterModal = () => {
  const registerModal = useRegisterModal();

  return (
    <Modal
      heading="Register"
      subheading="Create an account"
      isOpen={registerModal.isOpen}
      onClose={registerModal.onClose}
      onSubmit={() => {}}
      actionLabel="Submit"
      footer={<div>dsf</div>}
    />
  );
};

export default RegisterModal;
