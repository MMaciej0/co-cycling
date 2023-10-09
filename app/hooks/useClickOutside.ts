import { useEffect, MutableRefObject } from 'react';

type Handler = (e: MouseEvent) => void;

const useClickOutside = <T extends HTMLElement>(
  handler: Handler,
  ref: MutableRefObject<T | null>
) => {
  useEffect(() => {
    const listenerHandler = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as HTMLElement)) {
        handler(e);
      }
    };

    document.addEventListener('mousedown', listenerHandler);

    return () => document.removeEventListener('mousedown', listenerHandler);
  });
};

export default useClickOutside;
