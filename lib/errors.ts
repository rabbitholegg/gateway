import {
  EstimateGasExecutionError,
  TransactionExecutionError,
  UserRejectedRequestError,
} from 'viem';

export function isUserRejectedRequestError(
  err: unknown,
): err is UserRejectedRequestError {
  return (
    err instanceof TransactionExecutionError &&
    err.walk((e) => e instanceof UserRejectedRequestError) instanceof
      UserRejectedRequestError
  );
}

export function isUnpredictableGasLimitError(
  err: unknown,
): err is EstimateGasExecutionError {
  return (
    err instanceof TransactionExecutionError &&
    err.walk((e) => e instanceof EstimateGasExecutionError) instanceof
      EstimateGasExecutionError
  );
}
