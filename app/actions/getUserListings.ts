import { Listing } from '@prisma/client';
import { prisma } from '../libs/db';

const getUserListings = async (
  userId: string,
  userListingProp: 'owner' | 'favourites' | 'participations'
) => {
  const requests = {
    owner: async () => {
      try {
        const ownedListings: Listing[] = await prisma.listing.findMany({
          where: {
            ownerId: userId,
          },
          include: {
            owner: true,
          },
        });

        return ownedListings;
      } catch (error: any) {
        throw new Error(error);
      }
    },
    participations: async () => {
      try {
        const rideParticipations = await prisma.participant.findMany({
          where: {
            userId,
          },
          select: {
            listing: true,
          },
        });
        const rideParticipationsFormatted = rideParticipations.map(
          (listing) => listing.listing
        ) as Listing[];
        return rideParticipationsFormatted;
      } catch (error: any) {
        throw new Error(error);
      }
    },
    favourites: async () => {
      try {
        const ownedListings = await prisma.listing.findMany({
          where: {
            ownerId: userId,
          },
          include: {
            owner: true,
          },
        });

        return ownedListings;
      } catch (error: any) {
        throw new Error(error);
      }
    },
  };

  const result = await requests[userListingProp]();

  return result;
};

export default getUserListings;
