'use client';

import { FC, ReactNode, useState } from 'react';
import { BiSolidChevronDown } from 'react-icons/bi';

interface ColapsableContentProps {
  label: string;
  content: string | ReactNode;
}

const ColapsableContent: FC<ColapsableContentProps> = ({ label, content }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="w-full">
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="group cursor-pointer text-highlight font-semibold flex justify-between items-center"
      >
        {label}
        <span
          className={`text-xl group-hover:text-highlight ${
            isExpanded ? 'text-highlight' : 'text-light'
          }`}
        >
          <BiSolidChevronDown />
        </span>
      </div>
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className={`${
          isExpanded ? 'h-full opacity-1' : 'h-0 opacity-0'
        } text-center md:text-start pt-4 max-w-[450px] mx-auto transition-all cursor-pointer`}
      >
        {content}
      </div>
    </div>
  );
};

export default ColapsableContent;
