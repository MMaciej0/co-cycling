import { FC } from 'react';
import dynamic from 'next/dynamic';
import { format } from 'date-fns';
import Heading from '@/app/components/Heading';
import ColapsableContent from '@/app/components/ColapsableContent';
import Avatar from '@/app/components/Avatar';
import UsersSlider from '@/app/components/carousels/UsersSlider';
import getListingById from '@/app/actions/getListingById';
import getCurrentUser from '@/app/actions/getCurrentUser';
import { capitalize } from '@/app/libs/strings';
import { Location } from '@/app/types';

interface ListingProps {
  params: {
    listingId: string;
  };
}

const Listing: FC<ListingProps> = async ({ params: { listingId } }) => {
  const listing = await getListingById(listingId);
  const currentUser = await getCurrentUser();

  const Map = dynamic(() => import('@/app/components/map/Map'), { ssr: false });

  return (
    <div className="pt-32 md:pt40 px-4 md:px-12 pb-10 max-w-contentContainer m-auto flex flex-col space-y-8">
      <div className="rounded-b-xl shadow-lg shadow-highlight/10 bg-primary overflow-y-visible">
        <div className="lg:grid grid-cols-2">
          <div className="grid grid-cols-1 lg:grid-rows-2">
            {/* heading */}
            <div className="text-center rounded-t-xl lg:rounded-none lg:rounded-tl-xl overflow-hidden text-primary flex flex-col space-y-4 bg-highlight/95 py-6">
              <h1 className="font-black tracking-wide text-2xl xs:text-4xl md:text-6xl  ">
                {listing.title}
              </h1>
              <h3>{capitalize(listing.bikeType)} bike ride.</h3>
            </div>
            {/* 2nd heading */}
            <div className="text-light bg-primary flex items-center py-6">
              <Heading
                center
                heading={`The ride will start in
            ${
              listing.district
                ? ` ${capitalize(listing.city)}, ${capitalize(
                    listing.district
                  )}`
                : `${capitalize(listing.city)}`
            }, ${capitalize(listing.countryName!)}.`}
              />
            </div>
          </div>
          <div className="relative">
            <div className="lg:rounded-tr-xl overflow-hidden">
              <Map center={listing.meetingPoint as Location} />
            </div>
            <p className="italic font-light absolute -bottom-8 left-3">
              Meeting point: {listing.meetingDescription}
            </p>
          </div>
        </div>
        <div className="py-6 mt-6">
          <div className="w-full border-t border-highlight/10 p-2 md:px-6 grid grid-cols-2 md:grid-cols-3 gap-2">
            <div className="py-2">
              <span className="font-semibold text-highlight">Date: </span>
              {format(new Date(listing.startDate), 'PPPP')}
            </div>
            <div className="py-2">
              <span className="font-semibold text-highlight">Departure: </span>
              {listing.departure}
            </div>
            <div className="py-2">
              <span className="font-semibold text-highlight">Ride type: </span>
              {capitalize(listing.rideType)}
            </div>
            <div className="py-2">
              <span className="font-semibold text-highlight">Bike type: </span>
              {capitalize(listing.bikeType)}
            </div>
            <div className="py-2">
              <span className="font-semibold text-highlight">Distance: </span>
              {listing.distance} km
            </div>
            {listing.pace && (
              <div className="py-2">
                <span className="font-semibold text-highlight">
                  Average pace:{' '}
                </span>
                {listing.pace} km/h
              </div>
            )}
          </div>
        </div>
        {listing.route && (
          <div className="w-full border-t border-highlight/10 p-2 md:px-6">
            <div className="py-2">
              <span className="font-semibold text-highlight">Route: </span>
              {listing.route}
            </div>
          </div>
        )}
        {listing.description && (
          <div className="w-full border-t border-highlight/10 p-2 md:px-6">
            <ColapsableContent
              label="Description"
              content={listing.description}
            />
          </div>
        )}
        <div className="w-full border-t border-highlight/10 p-2 md:px-6">
          <div className="py-2 flex items-center space-x-2">
            <span className="font-semibold text-highlight">Ride Owner: </span>
            <Avatar image={listing.owner.image} />
            <span>{listing.owner.name}</span>
          </div>
        </div>
        <div className="w-full border-t border-highlight/10 p-2 md:px-6">
          <div className="py-2 lg:flex lg:items-center">
            <span className="font-semibold text-highlight whitespace-nowrap md:mr-2">
              Already signed in:{' '}
            </span>
            <UsersSlider currentUser={currentUser} listing={listing} />
          </div>
        </div>
      </div>
      <div className="pt-10">Chat here!!!</div>
    </div>
  );
};

export default Listing;
