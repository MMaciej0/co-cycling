'use client';

import useCities from '@/app/hooks/useCities';
import { useId } from 'react';
import { Control, Controller, FieldErrors, FieldValues } from 'react-hook-form';
import { createFilter } from 'react-select';
import AsyncSelect from 'react-select/async';
import { getCustomStyles } from './PrimarySelect';

export interface CityOption {
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
  controlledValue?: string;
  customChange?: (value: CityOption) => void;
}

const CitySelect: React.FC<CitySelectProps> = ({
  placeholder,
  control,
  disabled,
  required,
  name,
  errors,
  controlledValue,
  customChange,
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
          value={controlledValue || value}
          onChange={(v) => {
            const newValue = v as CityOption;
            if (customChange) {
              customChange(newValue);
            } else {
              onChange(newValue);
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
