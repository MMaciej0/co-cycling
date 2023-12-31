import { FC } from 'react';
import UserMenuClientWrapper from './UserMenuClientWrapper';
import getUserListings from '@/app/actions/getUserListings';
import { SafeUser } from '@/app/types';

interface UserMenuProps {
  currentUser: SafeUser;
}

const UserMenu: FC<UserMenuProps> = async ({ currentUser }) => {
  const userOwnRides = await getUserListings(currentUser.id, 'owner');
  const userParticipations = await getUserListings(
    currentUser.id,
    'participations'
  );
  const userFavoritedListings = await getUserListings(
    currentUser.id,
    'favourites'
  );

  return (
    <UserMenuClientWrapper
      userOwnRides={userOwnRides}
      userParticipations={userParticipations}
      userFavoritedListings={userFavoritedListings}
      currentUser={currentUser}
    />
  );
};

export default UserMenu;
