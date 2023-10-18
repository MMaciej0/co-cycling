'use client';

import { FC, useMemo, useState } from 'react';
import DropdownButton from '../components/DropdownButton';
import RangeSlider from '../components/RangeSlider';
import { rideTypesOptions } from '../components/modals/CreateModal';
import SingleSelectionList from '../components/SingleSelectionList';
import Button from '../components/Button';
import { Listing } from '@prisma/client';
import useFiltersDropdown from '../hooks/useFiltersDropdown';
import useQueryParams from '../hooks/useQueryParams';
import useFilters from '../hooks/useFilters';

interface NavButtonsProps {
  listings: Listing[];
}

const ListingsNavButtons: FC<NavButtonsProps> = ({ listings }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { updateQuery } = useQueryParams();
  const filtersDropDown = useFiltersDropdown();
  const filters = useFilters();
  const { maxDistance, rideType, sorting } = filters.filters;

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

  const handleSubmit = () => {
    setIsLoading(true);
    const newParams = filters.filters;
    updateQuery('/listings', newParams);
    filtersDropDown.onClose();
    setIsLoading(false);
  };

  return (
    <>
      <div className="mb-4">
        <DropdownButton
          label="Max Distance"
          listContent={
            <>
              <RangeSlider
                max={max}
                changeHandler={(value) =>
                  filters.setNewValue('maxDistance', value)
                }
                defaultValue={
                  Number(maxDistance) > max ? max : Number(maxDistance)
                }
                min={0}
                value={Number(maxDistance)}
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
                clickHandler={(value) => filters.setNewValue('rideType', value)}
                hoverBg="highlight"
                hoverTxt="primary"
                activeLabel={rideType}
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
                clickHandler={(value) => filters.setNewValue('sorting', value)}
                hoverBg="highlight"
                hoverTxt="primary"
                activeLabel={sorting}
              />
            </>
          }
        />
      </div>
      <div>
        <Button
          label="Apply"
          onClick={handleSubmit}
          type="submit"
          disabled={isLoading}
        />
      </div>
    </>
  );
};

export default ListingsNavButtons;
