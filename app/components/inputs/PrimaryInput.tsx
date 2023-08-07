'use client';

import {
  FieldErrors,
  FieldValues,
  UseFormRegister,
  ValidationRule,
} from 'react-hook-form';

interface PrimaryInputProps {
  id: string;
  type?: string;
  label: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  pattern?: ValidationRule<RegExp>;
  error: FieldErrors;
}

const PrimaryInput: React.FC<PrimaryInputProps> = ({
  id,
  label,
  disabled,
  register,
  required,
  pattern,
  type,
  error,
}) => {
  return (
    <div className="relative my-6">
      <input
        id={id}
        disabled={disabled}
        placeholder=" "
        type={type ?? 'text'}
        {...register(id, { required, pattern })}
        className={`peer w-full bg-secondary rounded-md py-4 px-6 outline-none text-lg tracking-wider border-[1px] ${
          error[id] ? 'border-rose-500' : 'border-transparent'
        } ${error[id] ? 'focus:border-rose-500' : 'focus:border-highlight'}`}
      />
      <label
        htmlFor={id}
        className={`cursor-pointer absolute left-6 top-4 p-1 font-semibold tracking-wider text-primary bg-highlight rounded transform orgin-[0] duration-200 -translate-y-9 scale-75 peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-light/50 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0`}
      >
        {label}
      </label>
    </div>
  );
};

export default PrimaryInput;
