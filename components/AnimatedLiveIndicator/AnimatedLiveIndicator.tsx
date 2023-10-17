import classNames from 'classnames';
import { twMerge } from 'tailwind-merge';

export default function AnimatedLiveIndicator({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      className={twMerge(
        classNames('bg-primary w-1 h-1 rounded-full animate-pulse', className),
      )}
      style={{
        boxShadow: '0 1px 8px #48db80',
      }}
    />
  );
}
