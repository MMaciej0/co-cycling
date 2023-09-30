'use client';

import { FC, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Button from '../Button';
import Avatar from '../Avatar';
import useRegisterToRide from '@/app/hooks/useRegisterToRide';
import { SafeListing, SafeUser } from '@/app/types';

interface UsersSliderProps {
  currentUser: SafeUser | null;
  listing: SafeListing;
}

const UsersSlider: FC<UsersSliderProps> = ({ currentUser, listing }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { isOwner, hasSignedIn, toggleToRide } = useRegisterToRide({
    listing,
    currentUser,
  });
  const [emblaRef] = useEmblaCarousel();

  const handleActionButton = () => {
    setIsLoading(true);
    toggleToRide();
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col lg:flex-row items-center w-full">
      {listing.participants.length === 0 ? (
        <div className="grow w-full">No one has signed up yet.</div>
      ) : (
        <div ref={emblaRef} className="grow w-full overflow-hidden py-4">
          <div className="flex">
            {listing.participants.map((participant) => (
              <div
                className="mr-4 flex items-center space-x-4 px-2 py-1 rounded-md border-secondary border"
                key={participant.id}
              >
                <Avatar image={participant.user.image} />
                <p>{participant.user.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="w-full lg:max-w-[100px] pt-6 lg:pt-0">
        <Button
          small
          label={hasSignedIn ? 'Sign out' : 'Sign in'}
          type="button"
          onClick={handleActionButton}
          disabled={isOwner || isLoading}
        />
      </div>
    </div>
  );
};

export default UsersSlider;
