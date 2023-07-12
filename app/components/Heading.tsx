'use client';

interface HeadingProps {
  heading: string;
  subheading?: string;
  center?: boolean;
}

const Heading: React.FC<HeadingProps> = ({ heading, subheading, center }) => {
  return (
    <div className={`w-full ${center ? 'text-center' : 'text-start'}`}>
      <h2 className="text-xl font-bold tracking-wide p-4">{heading}</h2>
      {subheading && (
        <h3 className="text-normal font-normal p-2">{subheading}</h3>
      )}
    </div>
  );
};

export default Heading;
