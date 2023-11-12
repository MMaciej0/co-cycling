'use client';

import { FC, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { RxColorWheel } from 'react-icons/rx';
import useLoginModal from '@/app/hooks/useLoginModal';
import { SafeUser } from '@/app/types';
import { useRouter } from 'next/navigation';
import useFavorites from '@/app/hooks/useFavorites';
import { useSession } from 'next-auth/react';

interface FavoriteButtonProps {
  listingId: string;
}

const FavoriteButton: FC<FavoriteButtonProps> = ({ listingId }) => {
  const loginModal = useLoginModal();
  const { data: session, update } = useSession();
  const user = session?.user as SafeUser;

  const hasFavorited = useMemo(() => {
    return user?.favoriteIds.includes(listingId);
  }, [user?.favoriteIds, listingId]);

  const toggleFavorite = async () => {
    if (!user) return loginModal.onOpen();

    if (hasFavorited) {
      console.log(
        'delete',
        listingId,
        user.favoriteIds.filter((id) => id !== listingId)
      );
      update({
        favoriteIds: user.favoriteIds.filter((id) => id !== listingId),
      });
    } else {
      console.log('add', listingId, [...user.favoriteIds, listingId]);
      update({
        favoriteIds: [...user.favoriteIds, listingId],
      });
    }
  };

  return (
    <button
      onClick={toggleFavorite}
      className={`absolute right-2 top-2 cursor-pointer hover:text-highlight ${
        hasFavorited && 'text-highlight'
      }`}
    >
      <RxColorWheel size={25} />
    </button>
  );
};

export default FavoriteButton;
