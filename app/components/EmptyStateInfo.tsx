import { FC } from 'react';
import Heading from './Heading';
import Link from 'next/link';

interface EmptyStateInfoProps {
  heading: string;
  subheading?: string;
  link?: { text: string; href: string };
}

const EmptyStateInfo: FC<EmptyStateInfoProps> = ({
  heading,
  subheading,
  link,
}) => {
  return (
    <div className="mx-auto max-w-[450px] h-[20vh] text-center w-full flex flex-col justify-center items-center text-lg font-semibold tracking-wide">
      <Heading heading={heading} subheading={subheading} center />
      {link && (
        <Link href={link.href} className="text-highlight">
          {link.text}
        </Link>
      )}
    </div>
  );
};

export default EmptyStateInfo;
