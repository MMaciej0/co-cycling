import { prisma } from '../libs/db';

const getListingById = async (id: string) => {
  try {
    const listing = await prisma.listing.findUnique({
      where: {
        id,
      },
      include: {
        meetingPoint: true,
        owner: true,
      },
    });
    if (!listing) {
      throw new Error('No existing listing with such a ID');
    }

    return listing;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export default getListingById;
