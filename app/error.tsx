'use client';

import { FC, useEffect } from 'react';
import Heading from './components/Heading';

interface ErrorStateProps {
  error: Error;
}

const ErrorState: FC<ErrorStateProps> = ({ error }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="h-[70vh] flex flex-col justify-center items-center">
      <Heading center heading="Ops! Something went wrong." />
    </div>
  );
};

export default ErrorState;
