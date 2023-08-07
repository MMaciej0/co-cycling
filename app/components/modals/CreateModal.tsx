'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import PrimaryInput from '../inputs/PrimaryInput';
import Modal from './Modal';
import Button from '../Button';
import useCreateModal from '@/app/hooks/useCreateModal';

enum Steps {
  Location = 0,
  Info = 1,
  Route = 2,
  Description = 3,
}

const CreateModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const createModal = useCreateModal();
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

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {};

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

  return (
    <Modal
      heading="Create"
      isOpen={createModal.isOpen}
      onClose={createModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel="Next"
      body={modalBody}
      disabled={isLoading}
      secondaryActionLabel="Back"
      secondaryAction={() => {}}
    />
  );
};

export default CreateModal;
