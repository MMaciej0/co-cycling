'use client';

import { useCallback, useMemo, useState } from 'react';
import { redirect, useRouter } from 'next/navigation';
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
import Calendar from '../Calendar';

export const rideTypesOptions = [
  { value: 'chill', label: 'Chill' },
  { value: 'sightseeing', label: 'Sightseeing' },
  { value: 'training', label: 'Training' },
  { value: 'other', label: 'Other' },
];

enum Steps {
  Location = 0,
  Date = 1,
  Map = 2,
  Info = 3,
  Description = 4,
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
      startDate: new Date(),
      city: '',
      district: '',
      meetingPoint: null,
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
  const startDate = watch('startDate');

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (currentStep !== Steps.Description) {
      return onNext();
    }

    axios
      .post('/api/create', data)
      .then((callback) => {
        toast('Ride Created');
        const { id } = callback.data;
        router.push(`/listings/${id}`);
      })
      .catch(() => toast('Something went wrong.'));
  };

  const onNext = () => {
    setCurrentStep((currentStep) => currentStep + 1);
  };

  const onBack = () => {
    setCurrentStep((currentStep) => currentStep - 1);
  };

  const setMeetingPoint = (location: Location) => {
    setValue('meetingPoint', location);
  };

  const resetAfterSelect = (name: string, value: unknown) =>
    reset({ ...getValues, [name]: value, startDate: new Date() });

  const changeDate = (newDate: Date) => {
    setValue('startDate', newDate);
  };

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
        required
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
        handleMeetingPointChange={setMeetingPoint}
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
        <Heading heading="Pick a ride date" light />
        <Calendar selectedDate={startDate} onChange={changeDate} />
      </>
    );
  }

  if (currentStep === 2) {
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

  if (currentStep === 3) {
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

  if (currentStep === 4) {
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
      actionLabel={currentStep !== 4 ? 'Next' : 'Create'}
      body={modalBody}
      disabled={isLoading}
      secondaryActionLabel={currentStep === 0 ? undefined : 'Back'}
      secondaryAction={onBack}
    />
  );
};

export default CreateModal;
