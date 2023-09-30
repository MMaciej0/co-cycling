import { Listing, User } from '@prisma/client';

export type SafeUser = Omit<User, 'hashedPassword'>;

export interface Location {
  lat: number;
  lng: number;
}

interface Participant {
  id: string;
  listingId: string;
  userId: string;
  user: User;
}

export type SafeListing = Listing & { participants: Participant[] };
