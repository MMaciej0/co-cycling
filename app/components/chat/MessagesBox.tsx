import { Message, SafeUser } from '@/app/types';
import React, { FC } from 'react';
import Avatar from '../Avatar';

interface MessagesBoxProps {
  messages: Message[];
  currentUser: SafeUser | null;
}

const MessagesBox: FC<MessagesBoxProps> = ({ messages, currentUser }) => {
  return (
    <div className="pt-4 px-2 h-full overflow-y-auto">
      {messages.map((message: Message) => {
        const isOwn = message.userId === currentUser?.id;
        return (
          <div key={message.id} className={`flex ${isOwn && 'justify-end'}`}>
            <div className="p-4 my-4 flex items-start">
              <div className="mr-6">
                <Avatar image={message.user.image} />
              </div>
              <div className="relative w-full md:max-w-[450px] lg:max-w-[660px]">
                <p
                  className={` ${
                    isOwn ? 'bg-highlight text-primary' : 'bg-secondary'
                  } px-4 py-2 rounded-lg font-medium`}
                >
                  {message.text}
                </p>
                <p className="absolute left-4 -top-6 font-light text-sm">
                  {message.user.name}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MessagesBox;
