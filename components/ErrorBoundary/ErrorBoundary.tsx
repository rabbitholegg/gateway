import { type ReactNode } from 'react';
import {
  ErrorBoundary as DefaultErrorBoundary,
  type ErrorBoundaryProps as CustomErrorBoundaryProps,
} from 'react-error-boundary';

type ErrorBoundaryProps = CustomErrorBoundaryProps & {
  id?: string;
  children: ReactNode;
};

export default function ErrorBoundary({
  children,
  id = 'unset',
  ...props
}: ErrorBoundaryProps) {
  return (
    <DefaultErrorBoundary
      {...props}
    >
      {children}
    </DefaultErrorBoundary>
  );
}
