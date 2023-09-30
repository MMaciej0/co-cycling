import getCurrentUser from '@/app/actions/getCurrentUser';
import { prisma } from '@/app/libs/db';
import { NextResponse } from 'next/server';

interface ListingParams {
  listingId?: string;
}

export const POST = async (
  request: Request,
  { params }: { params: ListingParams }
) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;

  if (!listingId) {
    throw new Error('Invalid ID');
  }

  const newParticipant = await prisma.participant.create({
    data: {
      listingId,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(newParticipant);
};

export const DELETE = async (
  request: Request,
  { params }: { params: ListingParams }
) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;

  if (!listingId) {
    throw new Error('Invalid ID');
  }

  await prisma.participant.deleteMany({
    where: {
      listingId: listingId,
      userId: currentUser.id,
    },
  });

  return NextResponse.json({ message: 'participant deleted' });
};
