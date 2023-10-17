import useClaimReward from '@/data/hooks/claimReward/useClaimReward';
import { markQuestAsCompletedForAddress } from '@/data/hooks/getQuestById/useGetQuestById';
import {
  CHAIN_ID_TO_NETWORK,
  generateBlockExplorerUrl,
  getBlockExplorerLabel,
} from '@/lib';
import {
  type OnTransactionErrorFn,
  type OnTransactionSubmitErrorFn,
  type OnTransactionSubmitFn,
  type OnTransactionSuccessFn,
} from '@/lib/hooks';
import { EthAddress } from '@/lib/schemas';
import {
  showErrorToast,
  showLoadingToast,
  showSuccessToast,
} from '@/lib/showCustomToast';
import ExternalLinkButton from 'components/Button/ExternalLinkButton';
import ContractInteractionButton, {
  type ContractInteractionButtonProps,
} from 'components/ContractInteractionButton/ContractInteractionButton';
import { type ClaimRewardProps } from 'data/hooks/mutateClaimReward/useMutateClaimReward';
import { queryClient } from 'data/queryClient';
import useWallet from 'hooks/useWallet';
import { toast } from 'react-toastify';

type ClaimRewardButtonProps = Omit<
  ContractInteractionButtonProps,
  'onClick' | 'loading'
> &
  ClaimRewardProps & { score: number };

export const onTransactionSubmit =
  (toastId: string): OnTransactionSubmitFn =>
  (txn) => {
    const network = CHAIN_ID_TO_NETWORK[txn.chainId];
    const label = getBlockExplorerLabel(network);
    const href = generateBlockExplorerUrl(network, 'tx', txn.hash);

    showLoadingToast({
      toastOptions: { toastId, autoClose: false },
      title: 'Your transaction is processing.',
      body: 'You have successfully submitted your transaction to the network.',
      children: (
        <ExternalLinkButton href={href} size="xs" uppercase preventPropagation>
          {label}
        </ExternalLinkButton>
      ),
    });
  };

type OnTransactionSuccessArgs = {
  toastId: string;
  address: EthAddress;
  questId: string;
};
const onTransactionSuccess =
  ({
    toastId,
    address,
    questId,
  }: OnTransactionSuccessArgs): OnTransactionSuccessFn =>
  (receipt, txn) => {
    const network = CHAIN_ID_TO_NETWORK[txn.chainId];
    const label = getBlockExplorerLabel(network);
    const href = generateBlockExplorerUrl(
      network,
      'tx',
      receipt.transactionHash,
    );

    toast.dismiss(toastId);

    queryClient.invalidateQueries({ queryKey: ['quests', address] });

    // mark quest as completed
    markQuestAsCompletedForAddress({ address, questId });
    showSuccessToast({
      toastOptions: { autoClose: 5000 },
      title: 'Transaction successful!',
      body: 'Your reward has been claimed!',
      children: (
        <ExternalLinkButton href={href} size="xs" uppercase preventPropagation>
          {label}
        </ExternalLinkButton>
      ),
    });
  };

export const onTransactionError =
  (toastId: string): OnTransactionErrorFn =>
  (err, txn) => {
    if (txn == null) {
      showErrorToast({ title: 'Something went wrong', body: err.message });
      return;
    }

    const network = CHAIN_ID_TO_NETWORK[txn.chainId];
    const label = getBlockExplorerLabel(network);
    const href = generateBlockExplorerUrl(network, 'tx', txn.hash);

    toast.dismiss(toastId);

    showErrorToast({
      title: 'Something went wrong',
      body: 'The transaction has failed or something has gone wrong. Please try again.',
      children: (
        <ExternalLinkButton href={href} size="xs" uppercase preventPropagation>
          {label}
        </ExternalLinkButton>
      ),
    });
  };

const onTransactionSubmitError =
  (toastId: string): OnTransactionSubmitErrorFn =>
  (err) => {
    toast.dismiss(toastId);
    showErrorToast({ title: 'Something went wrong', body: err.message });
  };

export default function ClaimRewardButton({
  chainId,
  questAddress,
  questId,
  children,
  network,
  ...rest
}: ClaimRewardButtonProps) {
  const toastId = `redeem-receipt-${questId}`;
  const { address } = useWallet();
  const { isLoading, handleClick } = useClaimReward({
    questAddress,
    questId,
    chainId,
    network,
    onTransactionSubmit: onTransactionSubmit(toastId),
    onTransactionSubmitError: (err) => {
      onTransactionSubmitError(toastId)(err);
    },
    onTransactionSuccess: (receipt, txn) => {
      onTransactionSuccess({
        toastId,
        address: address || '0x',
        questId,
      })(receipt, txn);
    },
    onTransactionError: (err, txn) => {
      onTransactionError(toastId)(err, txn);
    },
  });

  return (
    <ContractInteractionButton
      chainId={chainId}
      loading={isLoading}
      onClick={handleClick}
      variant="gradient"
      color="primary"
      size="xs"
      spacing="sm"
      {...rest}
    >
      {children}
    </ContractInteractionButton>
  );
}
