import { safelyGetNetworkDetails } from '@/lib';
import { type PropsWithChildren } from 'react';

export function NetworkIconWrapper({ children }: PropsWithChildren) {
  return (
    <div className="w-4 h-4 rounded-full overflow-clip border border-black bg-violet-500 relative">
      {children}
    </div>
  );
}

export default function NetworkIcon({ networkName }: { networkName: string }) {
  const networkDetails = safelyGetNetworkDetails(networkName);
  return (
    <NetworkIconWrapper>
      <img
        src={networkDetails.imagePath}
        alt={networkDetails.name}
        className="object-contain w-full h-full"
      />
    </NetworkIconWrapper>
  );
}
