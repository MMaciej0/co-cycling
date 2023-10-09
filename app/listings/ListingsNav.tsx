'use client';

import { FC } from 'react';
import ListingsNavButtons from './ListingsNavButtons';
import DropdownButton from '../components/DropdownButton';
import { Listing } from '@prisma/client';

interface ListingNavProps {
  listings: Listing[];
}

const ListingsNav: FC<ListingNavProps> = ({ listings }) => {
  return (
    <>
      <div className="lg:hidden">
        <DropdownButton
          label="Filters & Sorting"
          listContent={
            <>
              <ListingsNavButtons listings={listings} />
            </>
          }
        />
      </div>
      <div className="hidden lg:grid grid-cols-4 gap-2">
        <ListingsNavButtons listings={listings} />
      </div>
    </>
  );
};

export default ListingsNav;
