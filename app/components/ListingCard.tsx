'use client';

import { FC } from 'react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import Heading from './Heading';
import Button from './buttons/Button';
import FavoriteButton from './buttons/FavoriteButton';
import HighlightedInfo from './HighlightedInfo';
import { Listing } from '@prisma/client';
import { capitalize } from '../libs/strings';
import { SafeUser } from '../types';

interface ListingCardProps {
  listing: Listing;
  favorites: string[] | null;
  currentUser: SafeUser | null;
}

const ListingCard: FC<ListingCardProps> = ({
  listing,
  favorites,
  currentUser,
}) => {
  const router = useRouter();

  return (
    <div className="rounded-md overflow-hidden shadow-lg shadow-highlight/20 border border-highlight/20 hover:scale-[1.02] transition duration-300 cursor-pointer">
      <div className="border-b border-highlight relative">
        <FavoriteButton
          currentUser={currentUser}
          userFavorites={favorites}
          listingId={listing.id}
        />
        <div className="opacity-1">
          <Heading
            center
            light
            heading={listing.title}
            subheading={`${listing.bikeType[0].toUpperCase()}${listing.bikeType.slice(
              1
            )} ride`}
          />
        </div>
      </div>
      <div
        className={`p-2 relative before:content-[''] before:bg-[url('/images/gravel.png')] before:bg-center before:bg-no-repeat before:opacity-20 before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0 -z-10`}
      >
        <div className="relative min-h-[150px]">
          <div className="grid grid-cols-3">
            <HighlightedInfo
              title="Country: "
              content={<p>{capitalize(listing.countryName!)}</p>}
            />
            <HighlightedInfo
              title="City: "
              content={<p>{capitalize(listing.city)}</p>}
            />
            {listing.district && (
              <HighlightedInfo
                title="District: "
                content={<p>{capitalize(listing.district)}</p>}
              />
            )}
            <div className="py-2 col-span-3 flex">
              <HighlightedInfo
                title="Date: "
                content={
                  <span> {format(new Date(listing.startDate), 'PPPP')}</span>
                }
              />
            </div>
            <HighlightedInfo
              title="Departure: "
              content={<p>{listing.departure}</p>}
            />
            <HighlightedInfo
              title="Ride type: "
              content={<p>{capitalize(listing.rideType)}</p>}
            />
            <HighlightedInfo
              title="Distance: "
              content={<p>{listing.distance} km</p>}
            />
          </div>
          <div className="pt-6">
            <Button
              small
              outline
              type="button"
              label="See details"
              onClick={() => router.push(`/listing/${listing.id}`)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
