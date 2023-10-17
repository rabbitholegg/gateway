import { referrerAddressAtom } from '@/hooks/useReferrerAddress';
import { NetworkName, assert, isValidAddress } from '@/lib';
import { ERROR } from '@/lib/constants';
import { useMutation } from '@tanstack/react-query';
import useWallet from 'hooks/useWallet';
import { useAtomValue } from 'jotai';
import QuestFactoryService from 'services/questFactoryService';
import { usePublicClient, useWalletClient } from 'wagmi';

export type ClaimRewardProps = {
  questAddress: string;
  questId: string;
  network: NetworkName;
};

export const useMutateClaimReward = ({ chainId }: { chainId: number }) => {
  const { address } = useWallet();
  const { data: walletClient } = useWalletClient();
  const publicClient = usePublicClient({ chainId });
  const referrer = process.env.NEXT_PUBLIC_REFERRAL_REWARDS_ADDRESS || useAtomValue(referrerAddressAtom);

  return useMutation({
    mutationKey: ['mutate-claim-reward'],
    mutationFn: async (req: ClaimRewardProps) => {
      assert(isValidAddress(address), ERROR.INVALID_ADDRESS);
      assert(walletClient != null, ERROR.INVALID_SIGNER);

      return QuestFactoryService.claimReward({
        publicClient,
        walletClient,
        address,
        questId: req.questId,
        referrer: referrer || undefined,
      });
    },
  });
};
