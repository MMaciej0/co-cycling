import { useCallback, useMemo } from 'react';
import { prisma } from '../libs/db';
import { SafeUser } from '../types';

interface FavoritesProps {
  userId: SafeUser | null;
  listingId: string;
}

const useFavorites = ({ userId, listingId }: FavoritesProps) => {
  const hasFavorited = true;

  return {
    hasFavorited,
  };
};

export default useFavorites;
