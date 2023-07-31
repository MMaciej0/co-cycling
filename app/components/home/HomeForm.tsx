'use client';

import { FieldValues, useForm } from 'react-hook-form';
import PrimaryInput from '../inputs/PrimaryInput';
import Button from '../Button';

const HomeForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      city: '',
      district: '',
      type: '',
    },
  });

  return (
    <div>
      <form>
        <div>
          <h3>Enter the starting city:</h3>
          <PrimaryInput
            id="city"
            label="City"
            register={register}
            error={errors}
          />
        </div>
        <div>
          <h3>Enter the district of the starting city (optional):</h3>
          <PrimaryInput
            id="district"
            label="District"
            register={register}
            error={errors}
          />
        </div>
        <div>
          <h3>Specify the type of bike:</h3>
          <PrimaryInput
            id="type"
            label="Type"
            register={register}
            error={errors}
          />
        </div>
        <div className="pt-4">
          <Button type="submit" label="FIND RIDE!" onClick={() => {}} />
          <p className="font-bold text-4xl text-center my-10">OR</p>
          <Button
            outline
            type="button"
            label="CREATE RIDE!"
            onClick={() => {}}
          />
        </div>
      </form>
    </div>
  );
};

export default HomeForm;
