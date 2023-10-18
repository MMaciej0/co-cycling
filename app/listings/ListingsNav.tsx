'use client';

import { FC } from 'react';
import ListingsNavButtons from './ListingsNavButtons';
import ListingsNavResults from './ListingsNavResults';
import DropdownButton from '../components/DropdownButton';
import { Listing } from '@prisma/client';
import useFiltersDropdown from '../hooks/useFiltersDropdown';

interface ListingNavProps {
  listings: Listing[];
}

const ListingsNav: FC<ListingNavProps> = ({ listings }) => {
  const filtersDropdown = useFiltersDropdown();

  return (
    <>
      <div className="lg:hidden">
        <DropdownButton
          isOpen={filtersDropdown.isOpen}
          forceStatus={filtersDropdown.forceStatus}
          label="Filters & Sorting"
          listContent={
            <>
              <ListingsNavButtons listings={listings} />
              <ListingsNavResults />
            </>
          }
        />
      </div>
      <div className="hidden lg:block">
        <div className="grid grid-cols-4 gap-2">
          <ListingsNavButtons listings={listings} />
        </div>
        <ListingsNavResults />
      </div>
    </>
  );
};

export default ListingsNav;
