'use client';

import { useRef, FC, ReactNode } from 'react';
import { BiSolidChevronDown } from 'react-icons/bi';
import Avatar from '../Avatar';
import useClickOutside from '@/app/hooks/useClickOutside';
import { SafeUser } from '@/app/types';
import useUserMenu from '@/app/hooks/useUserMenu';

interface UserMenuClientProps {
  currentUser?: SafeUser;
  listContent: ReactNode;
}

const UserMenuClient: FC<UserMenuClientProps> = ({
  currentUser,
  listContent,
}) => {
  const userMenuState = useUserMenu();
  const userMenuRef = useRef(null);
  useClickOutside(() => {
    userMenuState.onClose();
  }, userMenuRef);

  return (
    <div className="relative bg-primary" ref={userMenuRef}>
      <div
        onClick={() => userMenuState.forceStatus(!userMenuState.isOpen)}
        className="relative group cursor-pointer transition duration-200"
      >
        <BiSolidChevronDown
          className={`absolute -left-3 -bottom-2 group-hover:text-highlight ${
            userMenuState.isOpen && 'text-highlight'
          }`}
        />
        <Avatar image={currentUser?.image} highlight={userMenuState.isOpen} />
      </div>
      {userMenuState.isOpen && (
        <ul className="absolute top-16 right-3 bg-primary border-[1px] border-light rounded-md overflow-hidden z-50">
          {listContent}
        </ul>
      )}
    </div>
  );
};

export default UserMenuClient;
