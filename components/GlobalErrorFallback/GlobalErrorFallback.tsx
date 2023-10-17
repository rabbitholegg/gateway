import { type FallbackProps } from 'react-error-boundary';
import ErrorState from '../ErrorState/ErrorState';

export default function GlobalErrorFallback({ error }: FallbackProps) {
  return (
    <ErrorState
      error={error}
      title="Unable to render this section due to an error."
    />
  );
}
