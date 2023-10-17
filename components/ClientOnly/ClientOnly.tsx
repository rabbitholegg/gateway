import { useIsMounted } from '@/lib/hooks';
import { type PropsWithChildren } from 'react';

export default function ClientOnly({ children }: PropsWithChildren) {
  const isMounted = useIsMounted();

  if (isMounted) {
    return <>{children}</>;
  }

  return null;
}
