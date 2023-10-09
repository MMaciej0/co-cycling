'use client';

import { useState, useRef } from 'react';
import { signOut } from 'next-auth/react';
import { BiSolidChevronDown } from 'react-icons/bi';
import UserMenuItem from './UserMenuItem';
import Avatar from '../Avatar';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import useClickOutside from '@/app/hooks/useClickOutside';
import { SafeUser } from '@/app/types';

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const userMenuRef = useRef(null);
  useClickOutside(() => {
    setIsOpen(false);
  }, userMenuRef);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="relative bg-primary z-50" ref={userMenuRef}>
      <div
        onClick={toggleOpen}
        className="relative group cursor-pointer transition duration-200"
      >
        <BiSolidChevronDown
          className={`absolute -left-3 -bottom-2 group-hover:text-highlight ${
            isOpen && 'text-highlight'
          }`}
        />
        <Avatar image={currentUser?.image} highlight={isOpen} />
      </div>
      {isOpen && (
        <ul className="absolute top-16 right-3 bg-primary border-[1px] border-highlight rounded-md overflow-hidden">
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
