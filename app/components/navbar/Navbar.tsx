'use client';

import { SafeUser } from '@/app/types';
import Logo from './Logo';
import UserMenu from './UserMenu';

interface NavbarProps {
  currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  return (
    <div className="px-6 pt-4 fixed left-0 top-0 w-full bg-primary z-50">
      <div className="max-w-contentContainer mx-auto relative">
        <div className="flex justify-between items-center">
          <Logo />
          <div className="flex space-x-10 items-center">
            <UserMenu currentUser={currentUser} />
          </div>
        </div>
        <div className="border-b-[1px] border-highlight/10 mx-6 pt-4" />
      </div>
    </div>
  );
};

export default Navbar;
