import { prisma } from '../libs/db';

interface ListingParams {
  city?: string;
  district?: string;
  type?: string;
}

const getListings = async (params: ListingParams) => {
  let query: any = {};

  if (params.city) {
    query.city = params.city;
  }

  if (params.district) {
    query.district = params.district;
  }

  if (params.type) {
    query.bikeType = params.type;
  }

  try {
    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        departure: 'desc',
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
