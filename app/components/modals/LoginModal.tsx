'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import { BsStrava, BsGoogle } from 'react-icons/bs';
import { toast } from 'react-hot-toast';
import PrimaryInput from '../inputs/PrimaryInput';
import Modal from './Modal';
import Button from '../Button';
import useLoginModal from '@/app/hooks/useLoginModal';
import useRegisterModal from '@/app/hooks/useRegisterModal';

const LoginModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    await signIn('credentials', { ...data, redirect: false }).then(
      (callback) => {
        setIsLoading(false);
        if (!callback?.error) {
          toast('Welcome again.');
          router.refresh();
          loginModal.onClose();
        } else {
          toast.error(callback.error);
        }
      }
    );
  };

  const handleModalChange = () => {
    loginModal.onClose();
    registerModal.onOpen();
  };

  const modalBody = (
    <>
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
        You do not have an account??
        <span
          onClick={handleModalChange}
          className="text-highlight cursor-pointer ml-2 hover:underline"
        >
          Register
        </span>
      </p>
    </div>
  );

  return (
    <Modal
      heading="Login"
      subheading="Sign in to your account"
      isOpen={loginModal.isOpen}
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel="Continue"
      body={modalBody}
      footer={modalFooter}
      disabled={isLoading}
    />
  );
};

export default LoginModal;
