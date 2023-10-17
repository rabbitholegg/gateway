
import { isValidAddress } from '@/lib';
import { useIsMounted } from '@/lib/hooks';
import { EthAddress } from '@/lib/schemas';
import { useModal } from 'connectkit';
import { atom, useAtom } from 'jotai';
import { useCallback, useEffect, useMemo } from 'react';
import { useAccount } from 'wagmi';

// SSR Hydration mismatch workaround:
// https://github.com/wagmi-dev/wagmi/issues/542#issuecomment-1144178142
const addressAtom = atom<EthAddress | undefined>(undefined);

export default function useWallet() {
  const isMounted = useIsMounted();

  const { setOpen, openSIWE } = useModal();
  const [address, setAddress] = useAtom(addressAtom);

  const {
    address: wagmiAddress,
    isConnected: wagmiIsConnected,
    ...account
  } = useAccount();

  const showConnectModal = useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  useEffect(() => {
    if (isMounted) {
      setAddress(isValidAddress(wagmiAddress) ? wagmiAddress : undefined);
    }
  }, [isMounted, setAddress, wagmiAddress]);

  return useMemo(
    () => ({
      ...account,
      address,
      isMounted: isMounted && !account.isReconnecting,
      isConnected: wagmiIsConnected && isValidAddress(address),
      showConnectModal,
      openSIWE,
    }),
    [account, address, isMounted, wagmiIsConnected, showConnectModal, openSIWE],
  );
}
