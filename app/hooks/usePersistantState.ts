import { useEffect, useState } from 'react';

const usePersistantState = <T>(
  key: string,
  initialValue: T
): [state: T, setState: (value: T) => void] => {
  const [state, setInternalState] = useState<T>(initialValue);

  useEffect(() => {
    const storageValue = JSON.parse(localStorage.getItem(key) as string);
    if (storageValue) {
      setInternalState(storageValue);
    }
  }, [key]);

  const setState = (value: T) => {
    localStorage.setItem(key, JSON.stringify(value));
    setInternalState(value);
  };

  return [state, setState];
};

export default usePersistantState;
