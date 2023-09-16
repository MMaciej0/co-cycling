'use client';

import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import qs from 'query-string';
import PrimaryInput from '../inputs/PrimaryInput';
import Button from '../Button';
import PrimarySelect from '../selects/PrimarySelect';
import CitySelect from '../selects/CitySelect';
import Heading from '../Heading';
import useCreateModal from '@/app/hooks/useCreateModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import { SafeUser } from '@/app/types';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();

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
    const newQuery = {
      city: data.city.value,
      district: data.district,
      type: data.type.value,
    };
    const url = qs.stringifyUrl(
      {
        url: '/listings',
        query: newQuery,
      },
      { skipEmptyString: true, skipNull: true }
    );
    router.push(url);
    setIsLoading(false);
  };

  return (
    <>
      <Heading heading="Enter the starting city:" light />
      <CitySelect
        name="city"
        control={control}
        placeholder="Enter city..."
        disabled={isLoading}
        required
        errors={errors}
      />
      <Heading
        heading="Enter the district of the starting city (optional):"
        light
      />
      <PrimaryInput
        id="district"
        label="District"
        register={register}
        error={errors}
        disabled={isLoading}
      />
      <Heading heading="Specify the type of bike:" light />
      <PrimarySelect
        control={control}
        name="type"
        options={bikeTypesOptions}
        placeholder="Choose type..."
        disabled={isLoading}
        required
        errors={errors}
      />
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
