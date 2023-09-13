import { FC } from 'react';
import Image from 'next/image';

interface AvatarProps {
  image: string | null | undefined;
  highlight?: boolean;
}

const Avatar: FC<AvatarProps> = ({ image, highlight }) => {
  return (
    <div className="w-10 h-10 relative">
      <Image
        className={`rounded-full hover:shadow-md hover:shadow-highlight/80 ${
          highlight && 'shadow-md shadow-highlight/80'
        }`}
        src={`${image || '/images/placeholder.jpg'}`}
        alt="avatar"
        fill
      />
    </div>
  );
};

export default Avatar;
