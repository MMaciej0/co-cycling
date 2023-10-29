import { NextResponse } from 'next/server';
import { prisma } from '@/app/libs/db';
import countriesDB from 'world-countries';
import getCurrentUser from '@/app/actions/getCurrentUser';

const countries = countriesDB.map((country) => ({
  name: country.name.common,
  value: country.cca2,
  flag: country.flag,
}));

const getByValue = (value: string) =>
  countries.find((country) => country.value === value);

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
    departure,
    description,
    distance,
  } = await request.json();

  const country = getByValue(city.country);

  const newRide = await prisma.listing.create({
    data: {
      title,
      city: city.value.toLowerCase(),
      district: district.toLowerCase(),
      meetingDescription,
      startDate,
      departure,
      bikeType: bikeType.value.toLowerCase(),
      rideType: rideType.value.toLowerCase(),
      pace,
      route,
      description,
      ownerId: currentUser.id,
      countryName: country?.name,
      flag: country?.flag,
      distance: Number(distance),
      meetingPoint: {
        create: {
          lat: Number(meetingPoint.lat),
          lng: Number(meetingPoint.lng),
        },
      },
    },
    include: {
      meetingPoint: true,
      owner: true,
    },
  });

  return NextResponse.json(newRide);
}
