'use client';

interface HeadingProps {
  heading: string;
  subheading?: string;
  center?: boolean;
  light?: boolean;
}

const Heading: React.FC<HeadingProps> = ({
  heading,
  subheading,
  center,
  light,
}) => {
  return (
    <div className={`w-full ${center ? 'text-center' : 'text-start'}`}>
      <h2
        className={`tracking-wide ${
          light ? 'font-semibold py-2 text-lg' : 'font-bold py-4 text-xl '
        } `}
      >
        {heading}
      </h2>
      {subheading && (
        <h3 className="text-normal font-normal py-2">{subheading}</h3>
      )}
    </div>
  );
};

export default Heading;
