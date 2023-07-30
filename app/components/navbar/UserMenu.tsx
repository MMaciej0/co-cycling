'use client';

import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { BiSolidChevronDown } from 'react-icons/bi';
import UserMenuItem from './UserMenuItem';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import { SafeUser } from '@/app/types';
import { signOut } from 'next-auth/react';
import useClickOutside from '@/app/hooks/useClickOutside';

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const menuRef = useClickOutside(() => {
    setIsOpen(false);
  });

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
            src={`${currentUser?.image || '/images/placeholder.jpg'}`}
            alt="avatar"
            fill
          />
        </div>
      </div>
      {isOpen && (
        <ul
          ref={menuRef}
          className="absolute top-16 right-3 bg-primary border-[1px] border-highlight rounded-md overflow-hidden"
        >
          {currentUser ? (
            <UserMenuItem label="Logout" onClick={() => signOut()} />
          ) : (
            <>
              <UserMenuItem label="Register" onClick={registerModal.onOpen} />
              <UserMenuItem label="Login" onClick={loginModal.onOpen} />
            </>
          )}
        </ul>
      )}
    </div>
  );
};

export default UserMenu;
