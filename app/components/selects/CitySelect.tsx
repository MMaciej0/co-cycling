'use client';

import useCities from '@/app/hooks/useCities';
import { useId } from 'react';
import { Control, Controller, FieldErrors, FieldValues } from 'react-hook-form';
import { createFilter } from 'react-select';
import AsyncSelect from 'react-select/async';
import { getCustomStyles } from './PrimarySelect';
import { Location } from '@/app/types';

interface CityOption {
  label: string;
  value: string;
  country?: string;
  name?: string;
  lat?: number;
  lng?: number;
}

interface CitySelectProps {
  control: Control<FieldValues>;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  name: string;
  errors: FieldErrors;
  preChange?: (name: string, value: unknown) => void;
  handleMeetingPointChange?: (location: Location) => void;
}

const CitySelect: React.FC<CitySelectProps> = ({
  placeholder,
  control,
  disabled,
  required,
  name,
  errors,
  preChange,
  handleMeetingPointChange,
}) => {
  const { getBySubstring } = useCities();
  const customStyles = getCustomStyles(errors, name);
  const id = useId();

  const filterCities = (value: string) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength >= 3 ? getBySubstring(value) : [];
  };

  const promiseOptions = (inputValue: string) =>
    new Promise<CityOption[]>((resolve) => {
      setTimeout(() => {
        resolve(filterCities(inputValue));
      }, 1000);
    });

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: required }}
      render={({ field: { onChange, value, name, ref } }) => (
        <AsyncSelect
          filterOption={createFilter({ ignoreAccents: false })}
          loadOptions={promiseOptions}
          styles={customStyles}
          placeholder={placeholder}
          name={name}
          ref={ref}
          value={value}
          onChange={(v) => {
            const newValue = v as CityOption;
            if (preChange) {
              preChange('city', newValue);
            }
            onChange(newValue);
            if (handleMeetingPointChange) {
              handleMeetingPointChange({
                lat: Number(newValue.lat),
                lng: Number(newValue.lng),
              } as Location);
            }
          }}
          isDisabled={disabled}
          required={required}
          instanceId={id}
          formatOptionLabel={(option: any) => (
            <div className="flex flex-row justify-between items-center">
              <div>{option.label}</div>
              <div>{option.country}</div>
            </div>
          )}
        />
      )}
    />
  );
};

export default CitySelect;
