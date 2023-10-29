import { FC, ReactNode } from 'react';

interface HighlightedInfoProps {
  title: string;
  content: ReactNode | string;
  border?: boolean;
}

const HighlightedInfo: FC<HighlightedInfoProps> = ({
  title,
  content,
  border,
}) => {
  return (
    <div
      className={`py-2 ${
        border && 'w-full border-t border-highlight/10 p-2 md:px-6'
      }`}
    >
      <span className="font-semibold text-highlight">{title}</span>
      {content}
    </div>
  );
};

export default HighlightedInfo;
