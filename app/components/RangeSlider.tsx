'use client';

import { FC } from 'react';
import ReactSlider from 'react-slider';

interface RangeSliderProps {
  defaultValue?: number;
  min?: number;
  max: number;
  changeHandler: (value: number) => void;
}

const RangeSlider: FC<RangeSliderProps> = ({
  defaultValue,
  min,
  max,
  changeHandler,
}) => {
  return (
    <div className="flex items-center space-x-6">
      <p>{min || 0}</p>
      <ReactSlider
        className="bg-highlight text-highlight h-full flex items-center my-8 grow"
        thumbClassName="text-primary bg-highlight font-semibold py-1 px-3 rounded-full cursor-pointer"
        trackClassName="text-highlight bg-highlight h-1"
        renderThumb={(props, state) => (
          <div {...props} key={props.key}>
            {state.valueNow}
          </div>
        )}
        defaultValue={defaultValue || 0}
        min={min || 0}
        max={max}
        onChange={changeHandler}
      />
      <p>{max}</p>
    </div>
  );
};

export default RangeSlider;
