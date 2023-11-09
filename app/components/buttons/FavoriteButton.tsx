'use client';

import { FC, useMemo, useState } from 'react';
import axios from 'axios';
import { RxColorWheel } from 'react-icons/rx';
import useLoginModal from '@/app/hooks/useLoginModal';
import { SafeUser } from '@/app/types';

interface FavoriteButtonProps {
  userFavorites: string[] | null;
  currentUser: SafeUser | null;
  listingId: string;
}

const FavoriteButton: FC<FavoriteButtonProps> = ({
  userFavorites,
  currentUser,
  listingId,
}) => {
  const [favoritedIds, setFavoritedIds] = useState(userFavorites || []);
  const loginModal = useLoginModal();

  const hasFavorited = useMemo(() => {
    return favoritedIds?.includes(listingId);
  }, [listingId, favoritedIds]);

  const toggleFavorite = async () => {
    if (!currentUser) return loginModal.onOpen();

    let newFavIds;
    if (hasFavorited) {
      newFavIds = favoritedIds.filter((id) => id !== listingId);
      setFavoritedIds(newFavIds);
    } else {
      newFavIds = [...favoritedIds, listingId];
      setFavoritedIds(newFavIds);
    }
    axios.post(`/api/favorites/${listingId}`, newFavIds);
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
