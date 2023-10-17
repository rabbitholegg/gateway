import { atom, useAtom } from 'jotai';
import { useEffect } from 'react';

const mountedAtom = atom(false);

export function useIsMounted() {
  const [mounted, setMounted] = useAtom(mountedAtom);
  useEffect(() => setMounted(true), [setMounted]);
  return mounted;
}
