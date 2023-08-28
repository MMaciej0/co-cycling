import { User } from '@prisma/client';

export type SafeUser = Omit<User, 'hashedPassword'>;

export interface Location {
  lat: number;
  lng: number;
}
