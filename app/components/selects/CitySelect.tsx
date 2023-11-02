'use client';

import useCities, { City } from '@/app/hooks/useCities';
import { useId } from 'react';
import { Control, Controller, FieldErrors, FieldValues } from 'react-hook-form';
import { createFilter } from 'react-select';
import AsyncSelect from 'react-select/async';
import { getCustomStyles } from './PrimarySelect';

interface CitySelectProps {
  control: Control<FieldValues>;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  name: string;
  errors: FieldErrors;
  controlledValue?: string;
  customChange?: (value: City) => void;
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

  const promiseOptions = (inputValue: string) => {
    const input = inputValue.trim().toLowerCase();
    const inputLength = inputValue.length;
    if (inputLength < 3) return;

    return new Promise<City[]>((resolve) => {
      setTimeout(() => {
        resolve(getBySubstring(input));
      }, 1000);
    });
  };

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
            const newValue = v as City;
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
