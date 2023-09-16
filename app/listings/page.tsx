import ListingCard from '../components/ListingCard';
import getListings from '../actions/getListings';
import Link from 'next/link';

const ListingsPage = async ({
  searchParams,
}: {
  searchParams: { city: string; distring?: string; type: string };
}) => {
  const listings = await getListings(searchParams);

  if (!listings.length) {
    return (
      <p className="mx-auto max-w-[450px] h-[60vh] text-center w-full flex flex-col justify-center items-center text-lg font-semibold tracking-wide">
        There are no exact matching rides.{' '}
        <Link href="/" className="text-highlight">
          Please change your searching cryteria or create ride!
        </Link>
      </p>
    );
  }

  return (
    <div className="pt-32 md:pt40 px-4 md:px-12 pb-10 max-w-contentContainer m-auto">
      <p className="py-20">Search bar</p>
      <div className="grid grid-cold-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
        {listings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
    </div>
  );
};

export default ListingsPage;
