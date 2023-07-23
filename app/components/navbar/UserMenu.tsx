'use client';

import Image from 'next/image';
import { useState } from 'react';
import { BiSolidChevronDown } from 'react-icons/bi';
import UserMenuItem from './UserMenuItem';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="relative bg-primary z-50">
      <div
        onClick={toggleOpen}
        className="relative group cursor-pointer transition duration-200"
      >
        <BiSolidChevronDown
          className={`absolute -left-3 -bottom-2 group-hover:text-highlight ${
            isOpen && 'text-highlight'
          }`}
        />
        <div className="w-10 h-10 relative">
          <Image
            className={`rounded-full group-hover:shadow-md group-hover:shadow-highlight/80 ${
              isOpen && 'shadow-md shadow-highlight/80'
            }`}
            src="/images/placeholder.jpg"
            alt="avatar"
            fill
          />
        </div>
      </div>
      {isOpen && (
        <ul className="absolute top-16 right-3 bg-primary border-[1px] border-highlight rounded-md overflow-hidden">
          <UserMenuItem label="Register" onClick={registerModal.onOpen} />
          <UserMenuItem label="Login" onClick={loginModal.onOpen} />
        </ul>
      )}
    </div>
  );
};

export default UserMenu;
