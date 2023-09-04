import { FC } from 'react';
import dynamic from 'next/dynamic';
import getListingById from '@/app/actions/getListingById';
import { Location } from '@/app/types';
import { format } from 'date-fns';

interface ListingProps {
  params: {
    listingId: string;
  };
}

// listings/64f62e6ad85f60ce98809200

const Listing: FC<ListingProps> = async ({ params: { listingId } }) => {
  const listing = await getListingById(listingId);

  const Map = dynamic(() => import('@/app/components/map/Map'), { ssr: false });

  return (
    <div className="pt-32 md:pt40 px-6 md:px-12 pb-10 max-w-contentContainer m-auto flex flex-col space-y-8">
      <div className="text-center lg:text-start flex flex-col space-y-4">
        <h1 className="font-black tracking-wide text-2xl xs:text-4xl md:text-6xl  ">
          {listing.title}
        </h1>
        <h3>
          {listing.bikeType[0].toUpperCase() + listing.bikeType.slice(2)} bike
          ride.
        </h3>
      </div>
      <div>
        <h3>
          The ride will start in
          {listing.district
            ? ` ${listing.city}, ${listing.district}.`
            : `${listing.city}`}
        </h3>
        <Map center={listing.meetingPoint as Location} />
        <p>Meeting point: {listing.meetingDescription}</p>
      </div>
      <div>
        Ride info:
        <p>Date: {format(new Date(listing.startDate), 'PPPP')}</p>
      </div>
    </div>
  );
};

export default Listing;
