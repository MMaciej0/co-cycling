'use client';

import { FC, useState } from 'react';
import { BsChatDots } from 'react-icons/bs';
import { AiOutlineClose } from 'react-icons/ai';
import Button from '../buttons/Button';
import useRegisterToRide from '@/app/hooks/useRegisterToRide';
import { SafeListing, SafeUser } from '@/app/types';
import Heading from '../Heading';
import SlidingContentButton from '../buttons/SlidingContentButton';
import PrimaryInput from '../inputs/PrimaryInput';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';
import MessagesBox from './MessagesBox';

interface ChatProps {
  listing: SafeListing;
  currentUser: SafeUser | null;
}

const Chat: FC<ChatProps> = ({ listing, currentUser }) => {
  const { hasSignedIn, isOwner } = useRegisterToRide({ listing, currentUser });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    axios
      .post(`/api/message/${listing.id}`, data)
      .then(() => {
        reset();
      })
      .catch(() => toast('Something went wrong.'));
  };

  const chatBody = (
    <div className="pb-24">
      {!listing.messages.length ? (
        <p className="pt-20 text-center text-xl">No one has commented yet.</p>
      ) : (
        <MessagesBox messages={listing.messages} currentUser={currentUser} />
      )}
      <div className="fixed bottom-0 right-0 left-0 max-w-contentContainer mx-auto px-4 md:px-12">
        <div className="flex items-center bg-primary border-t border-highlight/20">
          <div className="basis-4/5">
            <PrimaryInput
              id="message"
              label="Your message"
              register={register}
              error={errors}
            />
          </div>
          <div className="basis-1/5 ml-4">
            <Button
              type="submit"
              label="Send"
              outline
              onClick={handleSubmit(onSubmit)}
            />
          </div>
        </div>
      </div>
    </div>
  );

  if (!hasSignedIn && !isOwner) {
    return null;
  }

  return (
    <>
      <SlidingContentButton
        buttonLabel="Open Chat"
        buttonIcon={BsChatDots}
        heading={`${listing.title} chat`}
        content={chatBody}
      />
    </>
  );
};

export default Chat;
