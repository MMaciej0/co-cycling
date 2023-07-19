'use client';

import { Toaster } from 'react-hot-toast';

const ToasterProvider = () => {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        style: {
          border: '1px solid #FFFF00',
          color: '#EEEEEE',
          backgroundColor: '#222831',
          fontWeight: 600,
          letterSpacing: '1px',
          minWidth: 'max-content',
        },
      }}
    />
  );
};

export default ToasterProvider;
