'use client';

import { useRouter } from 'next/navigation';
import { RxColorWheel } from 'react-icons/rx';
import useFilters from '@/app/hooks/useFilters';

const Logo = () => {
  const router = useRouter();
  const filters = useFilters();

  const handleClick = () => {
    filters.resetFilters();
    router.push('/');
  };

  return (
    <div onClick={handleClick} className="text-highlight cursor-pointer">
      <p className="font-semibold text-4xl tracking-tighter">
        <span>C</span>
        <RxColorWheel size={20} className="inline ml-[3px]" />
        <span>C</span>
        <span className="hidden md:inline">ycling</span>
      </p>
    </div>
  );
};

export default Logo;
