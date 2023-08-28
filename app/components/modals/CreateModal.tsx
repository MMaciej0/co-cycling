'use client';

import { useCallback, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import PrimaryInput from '../inputs/PrimaryInput';
import Modal from './Modal';

import useCreateModal from '@/app/hooks/useCreateModal';
import CitySelect from '../selects/CitySelect';

import { Location } from '@/app/types';
import PrimarySelect from '../selects/PrimarySelect';
import { bikeTypesOptions } from '../homePage/HomeForm';
import Heading from '../Heading';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export const rideTypesOptions = [
  { value: 'chill', label: 'Chill' },
  { value: 'sightseeing', label: 'Sightseeing' },
  { value: 'training', label: 'Training' },
  { value: 'other', label: 'Other' },
];

enum Steps {
  Location = 0,
  Map = 1,
  Info = 2,
  Description = 3,
}

const CreateModal = () => {
  const [currentStep, setCurrentStep] = useState(Steps.Location);
  const [isLoading, setIsLoading] = useState(false);
  const createModal = useCreateModal();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
    setValue,
    reset,
    getValues,
  } = useForm<FieldValues>({
    defaultValues: {
      title: '',
      city: '',
      district: '',
      meetingPoint: '',
      meetingDescription: '',
      bikeType: '',
      rideType: '',
      pace: '',
      route: '',
      description: '',
    },
  });

  const city = watch('city');
  const meetingPoint = watch('meetingPoint');

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (currentStep !== Steps.Description) {
      return onNext();
    }
    console.log(data);
    axios
      .post('/api/create', data)
      .then(() => {
        toast('Ride Created');
        router.refresh();
        reset();
        setCurrentStep(Steps.Location);
        createModal.onClose();
      })
      .catch(() => toast('Something went wrong.'));
  };

  const onNext = () => {
    console.log(getValues(['meetingDescription', 'city']));
    setCurrentStep((currentStep) => currentStep + 1);
  };

  const onBack = () => {
    setCurrentStep((currentStep) => currentStep - 1);
  };

  const setMeetingPoint = useCallback(
    (location: Location) => {
      setValue('meetingPoint', location);
    },
    [setValue]
  );

  const resetAfterSelect = (name: string, value: unknown) =>
    reset({ ...getValues, [name]: value });

  const Map = useMemo(
    () => dynamic(() => import('../map/Map'), { ssr: false }),
    [city]
  );

  let modalBody = (
    <>
      <Heading heading="Ride title" light />
      <PrimaryInput
        id="title"
        label="e.g. Paris => Nicea..."
        register={register}
        error={errors}
        disabled={isLoading}
      />
      <Heading heading="Enter the starting city:" light />
      <CitySelect
        name="city"
        control={control}
        placeholder="Enter city..."
        disabled={isLoading}
        required
        errors={errors}
        preChange={resetAfterSelect}
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
    </>
  );

  if (currentStep === 1) {
    modalBody = (
      <>
        <Heading
          heading="Drag and drop marker on meeting point location:"
          light
        />
        <Map
          center={
            meetingPoint ? meetingPoint : { lat: city.lat, lng: city.lng }
          }
          setMeetingPoint={setMeetingPoint}
        />
        <Heading heading="Describe meeting point:" light />
        <PrimaryInput
          id="meetingDescription"
          label="Meeting Point Description"
          register={register}
          error={errors}
          disabled={isLoading}
          required
        />
      </>
    );
  }

  if (currentStep === 2) {
    modalBody = (
      <>
        <Heading heading="Specify the type of bike:" light />
        <PrimarySelect
          control={control}
          name="bikeType"
          options={bikeTypesOptions}
          placeholder="Choose type..."
          disabled={isLoading}
          required
          errors={errors}
        />
        <Heading heading="Specify the type of ride:" light />
        <PrimarySelect
          control={control}
          name="rideType"
          options={rideTypesOptions}
          placeholder="Choose type..."
          disabled={isLoading}
          required
          errors={errors}
        />
        <Heading heading="Specify average pace (optional):" light />
        <PrimaryInput
          id="pace"
          label="Pace in km/h"
          register={register}
          error={errors}
          disabled={isLoading}
        />
        <Heading heading="Paste link to route (optional):" light />
        <PrimaryInput
          id="route"
          label="Link"
          register={register}
          error={errors}
          disabled={isLoading}
        />
      </>
    );
  }

  if (currentStep === 3) {
    modalBody = (
      <>
        <Heading
          heading="Describe your ride:"
          subheading="Anything else u want to say about your ride?"
        />
        <PrimaryInput
          id="description"
          label="Link"
          register={register}
          error={errors}
          disabled={isLoading}
        />
      </>
    );
  }

  return (
    <Modal
      heading="Create Ride"
      isOpen={createModal.isOpen}
      onClose={createModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={currentStep !== 3 ? 'Next' : 'Create'}
      body={modalBody}
      disabled={isLoading}
      secondaryActionLabel={currentStep === 0 ? undefined : 'Back'}
      secondaryAction={onBack}
    />
  );
};

export default CreateModal;
