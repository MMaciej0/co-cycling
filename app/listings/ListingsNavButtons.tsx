'use client';

import React, { FC, useCallback, useMemo } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import DropdownButton from '../components/DropdownButton';
import RangeSlider from '../components/RangeSlider';
import { rideTypesOptions } from '../components/modals/CreateModal';
import SingleSelectionList from '../components/SingleSelectionList';
import Button from '../components/Button';
import { Listing } from '@prisma/client';

interface NavButtonsProps {
  listings: Listing[];
}

const ListingsNavButtons: FC<NavButtonsProps> = ({ listings }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FieldValues>({
    defaultValues: {
      maxDistance: 10,
      rideType: '',
      sorting: '',
    },
  });

  const selectedRideType = watch('rideType');
  const maxDistance = watch('maxDistance');
  const sorting = watch('sorting');

  const max = useMemo(() => {
    return listings?.reduce((a: number, c: Listing) => {
      a = a > Number(c.distance) ? a : Number(c.distance);
      return a;
    }, 0);
  }, [listings]);

  const rideOptions = rideTypesOptions?.reduce((a: string[], c) => {
    a.push(c.label);
    return a;
  }, []);

  const rangeSliderHandler = useCallback(
    (value: number) => {
      setValue('maxDistance', value);
    },
    [setValue]
  );

  const rideOptionsHandler = useCallback(
    (value: string) => {
      setValue('rideType', value);
    },
    [setValue]
  );

  const sortingHandler = useCallback(
    (value: string) => {
      setValue('sorting', value);
    },
    [setValue]
  );

  return (
    <>
      <div className="mb-4">
        <DropdownButton
          label="Max Distance"
          listContent={
            <>
              <RangeSlider
                max={max}
                changeHandler={rangeSliderHandler}
                defaultValue={maxDistance}
                min={0}
              />
            </>
          }
        />
      </div>
      <div className="mb-4">
        <DropdownButton
          label="Ride Type"
          listContent={
            <>
              <SingleSelectionList
                labels={rideOptions}
                clickHandler={rideOptionsHandler}
                hoverBg="highlight"
                hoverTxt="primary"
                activeLabel={selectedRideType}
              />
            </>
          }
        />
      </div>
      <div className="mb-4">
        <DropdownButton
          label="Sorting"
          listContent={
            <>
              <SingleSelectionList
                labels={['Nearest Departure', 'Shortest', 'Longest']}
                clickHandler={sortingHandler}
                hoverBg="highlight"
                hoverTxt="primary"
                activeLabel={sorting}
              />
            </>
          }
        />
      </div>
      <div>
        <Button label="Apply" onClick={() => {}} type="submit" />
      </div>
    </>
  );
};

export default ListingsNavButtons;
