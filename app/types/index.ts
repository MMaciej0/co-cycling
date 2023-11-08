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

export interface Message {
  id: string;
  text: string;
  listingId: string;
  user: User;
  userId: string;
}

export type SafeListing = Listing & {
  participants?: Participant[];
  messages?: Message[];
};
