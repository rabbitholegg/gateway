import {
  useMutation,
  type UseMutateAsyncFunction,
} from '@tanstack/react-query';
import { useMemo } from 'react';
import { type TransactionReceipt, type Hash } from 'viem';
import { usePublicClient } from 'wagmi';
import { isUnpredictableGasLimitError, isUserRejectedRequestError } from '../errors';

type ContractTransaction = {
  hash: Hash;
  chainId: number;
};

export type OnTransactionSuccessFn = (
  transactionReceipt: TransactionReceipt,
  contractTransaction: ContractTransaction,
) => void;

export type OnTransactionSubmitFn = (
  contractTransaction: ContractTransaction,
) => void;

export type OnTransactionSubmitErrorFn = (err: Error) => void;

export type OnTransactionErrorFn = (
  err: Error,
  contractTransaction?: ContractTransaction,
) => void;

export type OnBeforeTransactionMutationFn<T extends unknown = {}> = (
  args: T,
) => void;

export type ContractInteractionArgs<T extends unknown = {}> = {
  /**
   * The chainID the transaction will occur on. This gets passed to any `onTransaction` callbacks in order to create
   * block explorer URLs.
   */
  chainId: number;

  /**
   * An asynchronous function that takes arguments `P` and returns a promise that resolves to a `Hash`.
   */
  asyncTransactionMutation: UseMutateAsyncFunction<Hash, unknown, T, unknown>;

  /**
   * This callback will fire just before submitting the transaction for approval. Will receive
   * the same arguments as `asyncTransactionMutation`. Use this step for any necessary
   * data validation. This function should throw an error to prevent transaction submission.
   */
  onBeforeTransactionMutation?: OnBeforeTransactionMutationFn<T>;

  /**
   * This callback is fired when the user approves the transaction in their wallet.
   * The transaction has not been submitted to the network at this point.
   */
  onTransactionSubmit?: OnTransactionSubmitFn;

  /**
   * This callback is fired if a user rejects the transaction, or another error occurs during the
   * approval stage before the transaction is submitted to the network.
   */
  onTransactionSubmitError?: OnTransactionSubmitErrorFn;

  /**
   * This callback is fired when transaction has been submitted to the network and succesfully processed.
   */
  onTransactionSuccess?: OnTransactionSuccessFn;

  /**
   * This callback is fired when transaction has been submitted to the network but an error occurred
   * and the interaction failed. Depending on the error, it may or may not have a `contractTransaction` available.
   */
  onTransactionError?: OnTransactionErrorFn;

  /**
   * This callback is fired when user rejects the request.
   */
  onUserRejectedRequestError?: OnTransactionSubmitErrorFn;
};

/**
 * Use this helper type when creating hooks that wrap `useContractInteraction`
 */
export type UseContractInteractionProps<P extends unknown = {}> = Omit<
  ContractInteractionArgs,
  'asyncTransactionMutation'
> &
  P;

/**
 * Use this helper type as the return type when creating hooks that wrap `useContractInteraction`
 */
export type UseContractInteractionHookReturn = {
  isProcessing: boolean;
  isAwaitingApproval: boolean;
  isLoading: boolean;
  handleClick: () => void;
};

/**
 * `useContractInteraction` is a convenience wrapper hook that simplifies dealing with transaction approval
 * and processing flows. Simply pass it a `chainId` and an `asyncTransactionMutation` (a function that takes some
 * arguments and returns a promise that resolves into a `ContractTransaction`) and this hook will expose all of the
 * lifecycle steps in the `on*` callbacks.
 */
export default function useContractInteraction<T extends unknown = {}>({
  chainId,
  asyncTransactionMutation,
  onBeforeTransactionMutation,
  onTransactionError,
  onTransactionSubmitError,
  onTransactionSubmit,
  onTransactionSuccess,
  onUserRejectedRequestError,
}: ContractInteractionArgs<T>) {
  const publicClient = usePublicClient({ chainId });

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: async (args: T) => {
      try {
        // Do any necessary validation beforehand
        if (typeof onBeforeTransactionMutation === 'function') {
          onBeforeTransactionMutation(args);
        }

        // This will throw an error unless the user approves the txn
        const hash = await asyncTransactionMutation(args);

        // Sometimes `chainId` is undefined inside of the ContractTransaction so this normalizes the value
        const contractTransaction = { hash, chainId };

        if (typeof onTransactionSubmit === 'function') {
          onTransactionSubmit(contractTransaction);
        }

        try {
          // Transaction is now being processed on the network.
          const receipt = await publicClient.waitForTransactionReceipt({
            hash,
          });
          if (typeof onTransactionSuccess === 'function') {
            onTransactionSuccess(receipt, contractTransaction);
          }
          return receipt;
        } catch (err: any) {
          if (err == null) {
            console.error(
              'Caught error during transaction processing but there was no error object.',
            )
          } else {
            console.error(err);
          }

          if (typeof onTransactionError === 'function') {
            onTransactionError(
              err instanceof Error
                ? err
                : new Error('An unknown error occurred'),
              contractTransaction,
            );
          }
        }
      } catch (err: any) {
        // We don't need to treat this as an actual error so just swallow it.
        if (isUserRejectedRequestError(err)) {
          if (typeof onUserRejectedRequestError === 'function') {
            onUserRejectedRequestError(err);
          }
          return;
        }

        if (typeof onTransactionSubmitError === 'function') {
          onTransactionSubmitError(
            err instanceof Error ? err : new Error('An unknown error occurred'),
          );
        }

        if (err == null) {
          console.error(
            'Caught error during transaction submission but there was no error object.',
          )
        } else {
          console.error(err);
        }
      }
    },
  });

  return useMemo(
    () => ({ execTransaction: mutateAsync, isLoading }),
    [mutateAsync, isLoading],
  );
}
