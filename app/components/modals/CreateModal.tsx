'use client';

import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { useMemo, useState } from 'react';
import axios from 'axios';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { add } from 'date-fns';
import PrimaryInput from '../inputs/PrimaryInput';
import Modal from './Modal';
import CitySelect from '../selects/CitySelect';
import PrimarySelect from '../selects/PrimarySelect';
import Heading from '../Heading';
import Calendar from '../Calendar';
import useCreateModal from '@/app/hooks/useCreateModal';
import { Location } from '@/app/types';
import { bikeTypesOptions } from '../homePage/HomeForm';

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
  const initialDate = add(new Date(), { days: 1 });

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
      startDate: initialDate,
      departure: '',
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
    setIsLoading(true);

    axios
      .post('/api/create', data)
      .then((callback) => {
        toast('Ride Created');
        const { id } = callback.data;
        createModal.onClose();
        router.push(`/listings/${id}`);
      })
      .catch(() => toast('Something went wrong.'));

    setIsLoading(false);
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
    reset({ ...getValues, [name]: value, startDate: initialDate });

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
        <Heading heading="Set departure time" light />
        <PrimaryInput
          id="departure"
          type="time"
          required
          register={register}
          error={errors}
          disabled={isLoading}
        />
      </>
    );
  }

  if (currentStep === 2) {
    modalBody = (
      <>
        <Heading heading="Describe meeting point:" light />
        <PrimaryInput
          id="meetingDescription"
          label="Meeting Point Description"
          register={register}
          error={errors}
          disabled={isLoading}
          required
        />
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
