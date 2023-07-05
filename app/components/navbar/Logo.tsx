'use client';

import { useRouter } from 'next/navigation';
import { RxColorWheel } from 'react-icons/rx';

const Logo = () => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push('/')}
      className="text-highlight cursor-pointer"
    >
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
