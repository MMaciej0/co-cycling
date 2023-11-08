'use client';

import React, { FC } from 'react';
import UserMenuClient from './UserMenuClient';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';

const UserLoginMenu: FC = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const loginMenuContent = (
    <>
      <li
        onClick={registerModal.onOpen}
        className="tracking-wider px-4 py-2 border-b-[1px] last:border-0 cursor-pointer hover:bg-highlight hover:text-primary"
      >
        Register
      </li>
      <li
        onClick={loginModal.onOpen}
        className="tracking-wider px-4 py-2 border-b-[1px] last:border-0 cursor-pointer hover:bg-highlight hover:text-primary"
      >
        Login
      </li>
    </>
  );

  return <UserMenuClient listContent={loginMenuContent} />;
};

export default UserLoginMenu;
