import { useEffect, useState } from 'react';

export function useDebounce(value: string, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      const newValue = value;
      setDebouncedValue(newValue);
    }, delay);
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
