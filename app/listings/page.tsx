import Link from 'next/link';
import ListingsNav from './ListingsNav';
import ListingCard from '../components/ListingCard';
import getListings, { ListingParams } from '../actions/getListings';

interface ListingProps {
  searchParams: ListingParams;
}

const ListingsPage = async ({ searchParams }: ListingProps) => {
  const listings = await getListings(searchParams);

  return (
    <div className="pt-20 px-4 md:px-12 pb-10 max-w-contentContainer m-auto">
      <div className="py-10 md:py-20">
        <ListingsNav listings={listings} />
      </div>
      {!listings.length ? (
        <p className="mx-auto max-w-[450px] h-[20vh] text-center w-full flex flex-col justify-center items-center text-lg font-semibold tracking-wide">
          There are no exact matching rides.{' '}
          <Link href="/" className="text-highlight">
            Please change your searching cryteria or create ride!
          </Link>
        </p>
      ) : (
        <div className="grid grid-cold-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          {listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ListingsPage;
