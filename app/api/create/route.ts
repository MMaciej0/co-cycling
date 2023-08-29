import getCurrentUser from '@/app/actions/getCurrentUser';
import { prisma } from '@/app/libs/db';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const {
    title,
    city,
    district,
    startDate,
    meetingPoint,
    meetingDescription,
    bikeType,
    rideType,
    pace,
    route,
    description,
  } = await request.json();

  const newRide = await prisma.listing.create({
    data: {
      title,
      city: city.value,
      district,
      meetingDescription,
      startDate,
      bikeType: bikeType.value,
      rideType: rideType.value,
      pace,
      route,
      description,
      userId: currentUser.id,
      meetingPoint: {
        create: {
          lat: meetingPoint.lat,
          lng: meetingPoint.lng,
        },
      },
    },
  });

  return NextResponse.json(newRide);
}
