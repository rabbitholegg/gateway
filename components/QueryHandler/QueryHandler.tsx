import { isEmpty } from 'lodash';
import { type ReactNode } from 'react';

/**
 * Convenience component for dealing with react-query states
 */
export default function QueryHandler<TData extends unknown = {}>({
  data,
  error,
  isLoading,
  onSuccess,
  onEmpty,
  onLoading,
  onError,
}: {
  data: TData;
  error: unknown;
  isLoading: boolean;
  onSuccess?: (data: NonNullable<TData>, isEmpty?: boolean) => ReactNode;
  onEmpty?: () => ReactNode;
  onLoading?: () => ReactNode;
  onError?: (error: Error) => ReactNode;
}) {
  if (isLoading && typeof onLoading === 'function') {
    return <>{onLoading()}</>;
  }

  if (error != null && typeof onError === 'function') {
    return (
      <>
        {onError(error instanceof Error ? error : new Error('unknown error'))}
      </>
    );
  }

  if (data != null) {
    const empty = isEmpty(data);

    if (empty && typeof onEmpty === 'function') {
      return <>{onEmpty()}</>;
    }

    if (typeof onSuccess === 'function') {
      return <>{onSuccess(data, empty)}</>;
    }
  }

  return null;
}
