'use client';

import { FC, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { BsChatDots } from 'react-icons/bs';
import Button from '../buttons/Button';
import SlidingContentButton from '../buttons/SlidingContentButton';
import PrimaryInput from '../inputs/PrimaryInput';
import MessagesBox from './MessagesBox';
import useRegisterToRide from '@/app/hooks/useRegisterToRide';
import { pusherClient } from '@/app/libs/pusher';
import { Message, SafeListing, SafeUser } from '@/app/types';

interface ChatProps {
  listing: SafeListing;
  currentUser: SafeUser | null;
}

const Chat: FC<ChatProps> = ({ listing, currentUser }) => {
  const [messages, setMessages] = useState(listing.messages || []);
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

  useEffect(() => {
    pusherClient.subscribe(listing.id);

    const handler = (message: Message) => {
      setMessages((currentMessages) => {
        return [...currentMessages, message];
      });
    };

    pusherClient.bind('message', handler);

    return () => {
      pusherClient.unsubscribe(listing.id);
      pusherClient.unbind('message', handler);
    };
  }, [listing.id]);

  const chatBody = (
    <div className="flex flex-col">
      <div className="grow h-full overflow-y-auto">
        {!messages.length ? (
          <p className="pt-20 text-center text-xl">No one has commented yet.</p>
        ) : (
          <MessagesBox messages={messages} currentUser={currentUser} />
        )}
      </div>
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
