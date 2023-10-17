import { useEffect, useRef } from 'react';

/**
 * This utility hook takes a value of type T and will fire a callback whenever
 * the value changes. Will only run once for any changes, including in react dev mode.
 */
export function useOnValueChange<T extends unknown>(
  value: T,
  callback: (newValue: T) => void,
) {
  const prevValue = useRef<T>();

  useEffect(() => {
    if (value == null) return;
    if (prevValue?.current === value) return;
    if (prevValue.current != null && typeof callback === 'function') {
      callback(value);
    }
    prevValue.current = value;
  }, [callback, value]);
}
