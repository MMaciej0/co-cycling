'use client';

import { useMemo } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import Button from '../components/Button';
import Heading from '../components/Heading';
import useQueryParams from '../hooks/useQueryParams';
import useFilters, { Key } from '../hooks/useFilters';

interface ResultButtonDetail {
  label: string;
  valueKey: string;
  units?: string;
  value?: string;
}

let resultButtonsDetails: ResultButtonDetail[] = [
  { label: 'Max Distance', valueKey: 'maxDistance', units: 'km' },
  { label: 'Ride Type', valueKey: 'rideType' },
  { label: 'Sorting', valueKey: 'sorting' },
];

const ListingsNavResults = () => {
  const filters = useFilters();
  const { parseQuery, deleteParam } = useQueryParams();
  const currentQuery = parseQuery();

  const updatedResultButtons = useMemo(() => {
    return resultButtonsDetails
      .filter((btn) => currentQuery[btn.valueKey])
      .map((btn) => {
        btn.value = currentQuery[btn.valueKey] as string;
        return btn;
      });
  }, [currentQuery]);

  const onRemoveFilter = (valueKey: string) => {
    deleteParam('/listings', valueKey);
    filters.setDefaultValue(valueKey as Key);
  };

  if (!updatedResultButtons.length) return null;

  return (
    <div className="border-t-[1px] lg:border-b-[1px] border-highlight/20 my-6 pb-4">
      <Heading light heading="Selected filters:" />
      <div className="flex flex-col lg:flex-row lg:space-x-2 w-full">
        {updatedResultButtons.map((button) => (
          <div key={button.label} className="my-2 w-full">
            <Button
              outline
              icon={AiOutlineClose}
              label={`${button.label}: ${button.value} ${
                button.units !== undefined ? button.units : ''
              }`}
              onClick={() => onRemoveFilter(button.valueKey)}
              type="button"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListingsNavResults;
