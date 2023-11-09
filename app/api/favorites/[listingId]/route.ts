import { NextResponse } from 'next/server';
import { prisma } from '@/app/libs/db';
import getCurrentUser from '@/app/actions/getCurrentUser';
import getUserFavorites from '@/app/actions/getUserFavorites';

interface ListingParams {
  listingId: string;
}

export const POST = async (
  request: Request,
  { params }: { params: ListingParams }
) => {
  const currentUser = await getCurrentUser();
  const { newFavIds } = await request.json();
  const { listingId } = params;

  if (!currentUser) {
    throw new Error('No user');
  }

  if (!listingId || typeof listingId !== 'string') {
    throw new Error('Invalid ID');
  }

  const updatedUser = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoriteIds: newFavIds,
    },
  });

  return NextResponse.json(updatedUser);
};
