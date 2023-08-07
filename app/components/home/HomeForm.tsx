'use client';

import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import PrimaryInput from '../inputs/PrimaryInput';
import Button from '../Button';
import PrimarySelect from '../selects/PrimarySelect';
import useCreateModal from '@/app/hooks/useCreateModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import { SafeUser } from '@/app/types';

export const bikeTypesOptions = [
  { value: 'road', label: 'Road' },
  { value: 'gravel', label: 'Gravel' },
  { value: 'mtb', label: 'MTB' },
  { value: 'urban', label: 'Urban' },
  { value: 'cross', label: 'Cross' },
  { value: 'other', label: 'Other' },
];

interface HomeFormProps {
  currentUser: SafeUser | null;
}

const HomeForm: React.FC<HomeFormProps> = ({ currentUser }) => {
  const [isLoading, setIsLoading] = useState(false);
  const createModal = useCreateModal();
  const loginModal = useLoginModal();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FieldValues>({
    defaultValues: {
      city: '',
      district: '',
      type: '',
    },
  });

  const handleCreateButton = () => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    return createModal.onOpen();
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    console.log(data);
    setIsLoading(false);
  };

  return (
    <>
      <div>
        <h3>Enter the starting city:</h3>
        <PrimaryInput
          id="city"
          label="City"
          register={register}
          error={errors}
          disabled={isLoading}
          pattern={new RegExp(/^[a-z ,.'-]+$/i)}
          required
        />
      </div>
      <div>
        <h3>Enter the district of the starting city (optional):</h3>
        <PrimaryInput
          id="district"
          label="District"
          register={register}
          error={errors}
          disabled={isLoading}
        />
      </div>
      <div>
        <h3>Specify the type of bike:</h3>
        <PrimarySelect
          name="type"
          control={control}
          options={bikeTypesOptions}
          placeholder="Choose type..."
          disabled={isLoading}
          required
          errors={errors}
        />
      </div>
      <div className="pt-4">
        <Button
          type="submit"
          label="FIND RIDE!"
          onClick={handleSubmit(onSubmit)}
          disabled={isLoading}
        />
        <div className="relative my-14 w-full border-t-2 border-light/20 flex justify-center">
          <span className="absolute font-semibold text-3xl px-6 bg-primary -translate-y-[50%]">
            OR
          </span>
        </div>
        <Button
          outline
          type="button"
          label="CREATE RIDE!"
          onClick={handleCreateButton}
          disabled={isLoading}
        />
      </div>
    </>
  );
};

export default HomeForm;
