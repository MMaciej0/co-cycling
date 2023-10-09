'use client';

import { FC } from 'react';

interface SingleSelectionList {
  bgColor?: string;
  borderColor?: string;
  rounded?: boolean;
  labels: string[];
  hoverBg?: string;
  hoverTxt?: string;
  clickHandler: (value: string) => void;
  activeLabel?: string;
}

const SingleSelectionList: FC<SingleSelectionList> = ({
  bgColor,
  borderColor,
  rounded,
  labels,
  hoverBg,
  hoverTxt,
  clickHandler,
  activeLabel,
}) => {
  return (
    <ul
      className={`${bgColor && `bg-${bgColor}`} ${
        borderColor && `border-[1px]border-${borderColor}`
      } ${rounded && 'rounded-md'} overflow-hidden`}
    >
      {labels.map((label, i) => (
        <li
          onClick={() => {
            clickHandler(label);
          }}
          className={`tracking-wider text-center px-4 py-2 border-b-[1px] border-highlight last:border-0 cursor-pointer transition-all duration-200 ${
            hoverBg &&
            hoverTxt &&
            `hover:bg-${hoverBg} hover:text-${hoverTxt} ${
              activeLabel === label && 'bg-highlight text-primary'
            }`
          }`}
          key={i}
        >
          {label}
        </li>
      ))}
    </ul>
  );
};

export default SingleSelectionList;
