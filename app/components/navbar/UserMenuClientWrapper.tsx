'use client';

import { FC, useState } from 'react';
import { Listing } from '@prisma/client';
import UserMenuClient from './UserMenuClient';
import SlidingContentButton from '../buttons/SlidingContentButton';
import ListingCard from '../ListingCard';
import { SafeUser } from '@/app/types';
import Button from '../buttons/Button';
import { signOut } from 'next-auth/react';
import useUserMenu from '@/app/hooks/useUserMenu';

interface UserMenuClientWrapperProps {
  userOwnRides: Listing[] | null;
  userParticipations: Listing[] | null;
  currentUser: SafeUser;
}

const UserMenuClientWrapper: FC<UserMenuClientWrapperProps> = ({
  userOwnRides,
  userParticipations,
  currentUser,
}) => {
  const userMenuState = useUserMenu();
  const [ownRidesVisible, setOwnRidesVisible] = useState(false);
  const [participationRidesVisible, setParticipationRidesVisible] =
    useState(false);

  const userMenuBody = (
    <>
      <li className="border-b border-light">
        <SlidingContentButton
          contentLogo
          border={false}
          heading="Profile"
          buttonLabel="Profile"
          content={<div>content</div>}
        />
      </li>
      <li className="border-b border-light">
        <SlidingContentButton
          contentLogo
          border={false}
          heading="Favourites"
          buttonLabel="Favourites"
          content={<div>content</div>}
        />
      </li>
      <li className="border-b border-light">
        <SlidingContentButton
          contentLogo
          externalState={ownRidesVisible}
          setExternalState={setOwnRidesVisible}
          border={false}
          heading="Own Rides"
          buttonLabel="Own Rides"
          content={
            <div className="grid grid-cold-1 md:grid-cols-2 lg:grid-cols-3 gap-16 py-8 px-4 md:px-2">
              {userOwnRides?.map((listing, i) => (
                <div
                  key={i}
                  onClick={() => {
                    setOwnRidesVisible(false);
                    userMenuState.onClose();
                  }}
                >
                  <ListingCard listing={listing} />
                </div>
              ))}
            </div>
          }
        />
      </li>
      <li className="border-b border-light">
        <SlidingContentButton
          contentLogo
          externalState={participationRidesVisible}
          setExternalState={setParticipationRidesVisible}
          border={false}
          heading="Participations"
          buttonLabel="Participations"
          content={
            <div className="grid grid-cold-1 md:grid-cols-2 lg:grid-cols-3 gap-16 py-8 px-4 md:px-2">
              {userParticipations?.map((listing, i) => (
                <div
                  key={i}
                  onClick={() => {
                    setParticipationRidesVisible(false);
                    userMenuState.onClose();
                  }}
                >
                  <ListingCard listing={listing} />
                </div>
              ))}
            </div>
          }
        />
      </li>
      <li>
        <Button
          type="button"
          label="Logout"
          onClick={signOut}
          border={false}
          outline
          small
        />
      </li>
    </>
  );
  return (
    <UserMenuClient listContent={userMenuBody} currentUser={currentUser} />
  );
};

export default UserMenuClientWrapper;
