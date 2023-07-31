'use client';

import { useState } from 'react';
import axios from 'axios';
import { signIn } from 'next-auth/react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { BsStrava, BsGoogle } from 'react-icons/bs';
import { toast } from 'react-hot-toast';
import PrimaryInput from '../inputs/PrimaryInput';
import Modal from './Modal';
import Button from '../Button';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';

const RegisterModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post('/api/register', data)
      .then(() => registerModal.onClose())
      .catch((error) => toast('Something went wrong. Plase try again.'))
      .finally(() => setIsLoading(false));
  };

  const handleModalChange = () => {
    registerModal.onClose();
    loginModal.onOpen();
  };

  const modalBody = (
    <>
      <PrimaryInput
        label="Name"
        id="name"
        register={register}
        disabled={isLoading}
        required
        error={errors}
        pattern={new RegExp(/^[a-z ,.'-]+$/i)}
      />
      <PrimaryInput
        label="Email"
        type="email"
        id="email"
        register={register}
        disabled={isLoading}
        required
        error={errors}
        pattern={new RegExp(/^\S+@\S+\.\S+$/)}
      />
      <PrimaryInput
        label="Password"
        type="password"
        id="password"
        register={register}
        disabled={isLoading}
        required
        error={errors}
      />
    </>
  );

  const modalFooter = (
    <div className="flex flex-col space-y-6">
      <Button
        type="button"
        label="Continue with Google"
        onClick={() => signIn('google')}
        icon={BsGoogle}
        outline
        disabled={isLoading}
      />
      <p className="text-center pt-4">
        Already have an account?
        <span
          onClick={handleModalChange}
          className="text-highlight cursor-pointer ml-2 hover:underline"
        >
          Login
        </span>
      </p>
    </div>
  );

  return (
    <Modal
      heading="Register"
      subheading="Create an account"
      isOpen={registerModal.isOpen}
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel="Create"
      body={modalBody}
      footer={modalFooter}
      disabled={isLoading}
    />
  );
};

export default RegisterModal;
