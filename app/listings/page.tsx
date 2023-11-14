import ListingsNav from './ListingsNav';
import ListingCard from '../components/ListingCard';
import getListings, { ListingParams } from '../actions/getListings';
import EmptyStateInfo from '../components/EmptyStateInfo';

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
        <EmptyStateInfo
          heading="There are no exact matching rides."
          link={{
            href: '/',
            text: 'Please change your searching cryteria or create ride!',
          }}
        />
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
