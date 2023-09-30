import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import useLoginModal from './useLoginModal';
import { SafeListing, SafeUser } from '../types';

interface RegisterToRideProps {
  listing: SafeListing;
  currentUser: SafeUser | null;
}

const useRegisterToRide = ({ listing, currentUser }: RegisterToRideProps) => {
  const loginModal = useLoginModal();
  const router = useRouter();

  const hasSignedIn = useMemo(() => {
    return listing.participants.find(
      (participant) => participant.userId === currentUser?.id
    )
      ? true
      : false;
  }, [listing, currentUser]);

  const isOwner = useMemo(
    () => currentUser?.id === listing.ownerId,
    [currentUser?.id, listing.ownerId]
  );

  const toggleToRide = useCallback(async () => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    try {
      let request;

      if (hasSignedIn) {
        request = () => axios.delete(`/api/ride-register/${listing.id}`);
      } else {
        request = () => axios.post(`/api/ride-register/${listing.id}`);
      }

      await request();
      router.refresh();
      toast('Success');
    } catch (error) {
      toast('Something went wrong');
    }
  }, [currentUser, listing, router, loginModal, hasSignedIn]);

  return { hasSignedIn, toggleToRide, isOwner };
};

export default useRegisterToRide;
