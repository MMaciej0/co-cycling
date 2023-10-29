import { NextResponse } from 'next/server';
import getCurrentUser from '@/app/actions/getCurrentUser';
import { prisma } from '@/app/libs/db';

interface ListingParams {
  listingId?: string;
}

export const POST = async (
  request: Request,
  { params }: { params: ListingParams }
) => {
  const { message } = await request.json();

  if (!message) {
    return NextResponse.error();
  }

  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;

  if (!listingId) {
    throw new Error('Invalid ID');
  }

  const newMessage = await prisma.message.create({
    data: {
      text: message,
      userId: currentUser.id,
      listingId: listingId,
    },
  });

  return NextResponse.json({ newMessage });
};
