import { assert, isValidAddress } from '@/lib';
import { ERROR } from '@/lib/constants';
import {
  type UseContractInteractionHookReturn,
  type UseContractInteractionProps,
} from '@/lib/hooks';
import useContractInteraction from '@/lib/hooks/useContractInteraction';
import { useCallback, useMemo } from 'react';
import { useMutateClaimReward, type ClaimRewardProps } from '../mutateClaimReward/useMutateClaimReward';

type UseClaimRewardArgs = UseContractInteractionProps<ClaimRewardProps>;

const onBeforeTransactionMutation = ({ questAddress }: ClaimRewardProps) => {
  assert(isValidAddress(questAddress), ERROR.INVALID_QUEST_ADDRESS);
};

export default function useClaimReward({
  questAddress,
  questId,
  chainId,
  onTransactionSubmit,
  onTransactionSubmitError,
  onTransactionSuccess,
  onTransactionError,
  onUserRejectedRequestError,
  network,
}: UseClaimRewardArgs): UseContractInteractionHookReturn {
  const { mutateAsync, isLoading: isAwaitingApproval } = useMutateClaimReward({
    chainId,
  });
  const { execTransaction, isLoading: isProcessing } = useContractInteraction({
    chainId,
    asyncTransactionMutation: mutateAsync,
    onBeforeTransactionMutation,
    onTransactionSubmit,
    onTransactionSubmitError,
    onTransactionSuccess,
    onTransactionError,
    onUserRejectedRequestError,
  });

  const handleClick = useCallback(() => {
    execTransaction({ questAddress, questId, network });
  }, [execTransaction, questAddress, questId, network]);

  const isLoading = isAwaitingApproval || isProcessing;

  return useMemo(
    () => ({ isProcessing, isAwaitingApproval, isLoading, handleClick }),
    [isProcessing, isAwaitingApproval, isLoading, handleClick],
  );
}
