'use client';

import { useSession } from 'next-auth/react';
import PrimaryInput from '../inputs/PrimaryInput';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Button from '../buttons/Button';
import toast from 'react-hot-toast';

const UserMenuProfileContent = () => {
  const { data: session, update } = useSession();
  const user = session?.user;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: user?.name,
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = ({ name }) => {
    if (name === user?.name) {
      return toast('Name you entered is the same.');
    }
    update({
      name,
    });
  };

  return (
    <div className="flex space-x-6 py-10">
      <div className="grow">
        <PrimaryInput
          label="Name"
          id="name"
          register={register}
          error={errors}
        />
      </div>
      <div className="my-6">
        <Button
          type="submit"
          onClick={handleSubmit(onSubmit)}
          label="Change Name"
        />
      </div>
    </div>
  );
};

export default UserMenuProfileContent;
