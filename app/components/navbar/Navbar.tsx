import Logo from './Logo';
import UserMenu from './UserMenu';
import { ImSearch } from 'react-icons/im';

const Navbar = () => {
  return (
    <div className="px-6 pt-4 fixed left-0 top-0 w-full bg-primary z-50">
      <div className="max-w-contentContainer mx-auto relative">
        <div className="flex justify-between items-center">
          <Logo />
          <div className="flex space-x-10 items-center">
            <button className="text-2xl hover:text-highlight transition duration-200">
              <ImSearch />
            </button>
            <UserMenu />
          </div>
        </div>
        <div className="border-b-[1px] border-highlight/10 mx-6 pt-4" />
      </div>
    </div>
  );
};

export default Navbar;
