import { prisma } from '../libs/db';

export interface ListingParams {
  city?: string;
  district?: string;
  type?: string;
  maxDistance?: string;
  rideType?: string;
  sorting?: string;
}

const sorting = [
  { key: 'longest', prop: 'distance', value: 'desc' },
  { key: 'shortest', prop: 'distance', value: 'asc' },
  { key: 'nearest departure', prop: 'startDate', value: 'asc' },
];

const getListings = async (params: ListingParams) => {
  let query: any = {};
  let sort: any = {};

  if (params.city) {
    query.city = params.city.toLowerCase();
  }

  if (params.district) {
    query.district = params.district.toLowerCase();
  }

  if (params.type) {
    query.bikeType = params.type.toLowerCase();
  }

  if (params.rideType) {
    query.rideType = params.rideType.toLowerCase();
  }

  if (params.maxDistance) {
    query.distance = {
      lte: Number(params.maxDistance),
    };
  }

  if (params.sorting) {
    const index = sorting.findIndex(
      (val) => val.key === params.sorting?.toLowerCase()
    );
    sort.prop = sorting[index].prop;
    sort.value = sorting[index].value;
  }

  try {
    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        [sort.prop]: sort.value,
      },
      include: {
        owner: true,
      },
    });
    return listings;
  } catch (error: any) {
    throw new Error(error);
  }
};

export default getListings;
