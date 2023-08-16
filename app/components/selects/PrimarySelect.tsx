'use client';

import { useId } from 'react';
import { Control, Controller, FieldErrors, FieldValues } from 'react-hook-form';
import Select, { StylesConfig } from 'react-select';

interface Option {
  label: string;
  value: string;
}

interface PrimarySelectProps {
  control: Control<FieldValues>;
  options: Option[];
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  name: string;
  errors: FieldErrors;
}

export const getCustomStyles = (
  errors: FieldErrors,
  name: string
): StylesConfig => ({
  menu: (styles) => ({
    ...styles,
    backgroundColor: '#393E46',
  }),
  menuList: (styles) => ({
    ...styles,
    maxHeight: '200px',
  }),
  control: (styles, state) => ({
    ...styles,
    backgroundColor: '#393E46',
    border: state.isFocused
      ? '1px solid #FFFF00'
      : errors[name]
      ? '1px solid #f43f5e'
      : '1px solid transparent',
    boxShadow: 'none',
    padding: '0.7rem 1rem',
    marginBlock: '1.5rem',

    ':hover': {
      border: state.isFocused
        ? '1px solid #FFFF00'
        : errors[name]
        ? '1px solid #f43f5e'
        : '1px solid transparent',
    },
  }),
  option: (styles, state) => ({
    ...styles,
    color: state.isSelected ? '#222831' : '#EEEEEE',
    padding: '0.8rem 1rem',
    backgroundColor: state.isSelected ? '#FFFF00' : '#393E46',
    ':hover': {
      backgroundColor: '#FFFF00',
      color: '#222831',
    },
  }),
  placeholder: (styles) => ({
    ...styles,
    color: '#EEEEEE',
    fontWeight: 500,
    letterSpacing: '0.05em',
    fontSize: '1rem',
    lineHeight: '1.75rem',
    opacity: 0.5,
  }),
  dropdownIndicator: (styles, state) => ({
    ...styles,
    color: state.isFocused ? '#FFFF00' : '#EEEEEE',
  }),
  singleValue: (styles) => ({
    ...styles,
    color: '#EEEEEE',
    letterSpacing: '0.05em',
    fontSize: '1rem',
    lineHeight: '1.75rem',
  }),
  input: (styles) => ({
    ...styles,
    color: '#EEEEEE',
    letterSpacing: '0.05em',
    fontSize: '1rem',
    lineHeight: '1.75rem',
  }),
});

const PrimarySelect: React.FC<PrimarySelectProps> = ({
  placeholder,
  options,
  control,
  disabled,
  required,
  name,
  errors,
}) => {
  const customStyles = getCustomStyles(errors, name);
  const id = useId();

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: required }}
      render={({ field: { onChange, value, name, ref } }) => (
        <Select
          options={options}
          styles={customStyles}
          placeholder={placeholder}
          name={name}
          ref={ref}
          value={value}
          onChange={onChange}
          isDisabled={disabled}
          required={required}
          instanceId={id}
        />
      )}
    />
  );
};

export default PrimarySelect;
