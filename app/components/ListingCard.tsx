'use client';

import { FC } from 'react';
import { format } from 'date-fns';
import Heading from './Heading';
import Button from './buttons/Button';
import { Listing } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { capitalize } from '../libs/strings';

interface ListingCardProps {
  listing: Listing;
  key: string;
}

const ListingCard: FC<ListingCardProps> = ({ listing, key }) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/listing/${listing.id}`)}
      key={key}
      className="rounded-md overflow-hidden shadow-lg shadow-highlight/20 border border-highlight/20 hover:scale-[1.02] transition duration-300 cursor-pointer"
    >
      <div className="border-b border-highlight">
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
            <div className="py-2">
              <p className="font-semibold text-highlight">Country: </p>
              <p>{capitalize(listing.countryName!)}</p>
            </div>
            <div className="py-2">
              <p className="font-semibold text-highlight">City: </p>
              <p>{capitalize(listing.city)}</p>
            </div>
            {listing.district && (
              <div className="py-2">
                <p className="font-semibold text-highlight">District: </p>
                <p>{capitalize(listing.district)}</p>
              </div>
            )}
            <div className="py-2 col-span-3 flex">
              <p className="font-semibold text-highlight">Date: </p>
              <p className="ml-2">
                {format(new Date(listing.startDate), 'PPPP')}
              </p>
            </div>
            <div className="py-2">
              <p className="font-semibold text-highlight">Departure: </p>
              <p>{listing.departure}</p>
            </div>
            <div className="py-2">
              <p className="font-semibold text-highlight">Ride type: </p>
              <p>{`${listing.rideType[0].toUpperCase()}${listing.rideType.slice(
                1
              )}`}</p>
            </div>
            <div className="py-2">
              <p className="font-semibold text-highlight">Distance: </p>
              <p>{listing.distance} km</p>
            </div>
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
