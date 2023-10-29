import { FC } from 'react';
import dynamic from 'next/dynamic';
import { format } from 'date-fns';
import Heading from '@/app/components/Heading';
import Avatar from '@/app/components/Avatar';
import Chat from '@/app/components/chat/Chat';
import HighlightedInfo from '@/app/components/HighlightedInfo';
import SlidingContentButton from '@/app/components/buttons/SlidingContentButton';
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
    <div className="pt-32 md:pt40 pb-10 px-4 md:px-12 max-w-contentContainer m-auto flex flex-col space-y-8">
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
            <HighlightedInfo
              title="Date: "
              content={format(new Date(listing.startDate), 'PPPP')}
            />
            <HighlightedInfo title="Departure: " content={listing.departure} />
            <HighlightedInfo
              title="Ride type: "
              content={capitalize(listing.rideType)}
            />
            <HighlightedInfo
              title="Bike type: "
              content={capitalize(listing.bikeType)}
            />
            <HighlightedInfo
              title="Distance: "
              content={`${listing.distance} km`}
            />
            {listing.pace && (
              <HighlightedInfo
                title="Average pace: "
                content={`${listing.pace} km/h`}
              />
            )}
          </div>
        </div>
        {listing.route && (
          <HighlightedInfo title="Route: " content={listing.route} border />
        )}
        <HighlightedInfo
          border
          title="Ride Owner: "
          content={
            <div className="inline-flex items-center space-x-2">
              <span className="font-semibold text-highlight"></span>
              <Avatar image={listing.owner.image} />
              <span>{listing.owner.name}</span>
            </div>
          }
        />
        <div className="w-full border-t border-highlight/10 p-2 md:px-6">
          <div className="py-2 lg:flex lg:items-center">
            <span className="font-semibold text-highlight whitespace-nowrap md:mr-2">
              Already signed in:{' '}
            </span>
            <UsersSlider currentUser={currentUser} listing={listing} />
          </div>
        </div>
        <div className="w-full border-t border-highlight/10 p-2 flex  flex-col md:flex-row md:px-6 py-4 space-y-4 md:space-y-0">
          {listing.description && (
            <div className="w-full mx-2">
              <SlidingContentButton
                buttonLabel="Ride Description"
                heading={`${listing.title} description`}
                content={
                  <div className="max-w-[650px] w-full pt-10 mx-auto text-lg tracking-wide px-6">
                    {listing.description}
                  </div>
                }
              />
            </div>
          )}
          <div className="w-full mx-2">
            <Chat currentUser={currentUser} listing={listing} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Listing;
