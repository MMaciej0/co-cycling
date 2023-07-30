import { useRef, useEffect, MutableRefObject } from 'react';

const useClickOutside = (
  handler: (a?: unknown) => void
): MutableRefObject<HTMLUListElement | null> => {
  const domNode = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    const listenerHandler = (e: MouseEvent) => {
      if (!domNode.current?.contains(e.target as HTMLElement)) {
        handler();
      }
    };

    document.addEventListener('mousedown', listenerHandler);

    return () => document.removeEventListener('mousedown', listenerHandler);
  });

  return domNode;
};

export default useClickOutside;
