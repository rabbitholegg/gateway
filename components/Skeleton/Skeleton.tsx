import BaseSkeleton, { type SkeletonProps } from 'react-loading-skeleton';

type RHSkeletonProps = Omit<SkeletonProps, 'baseColor' | 'highlightColor'>;

export default function Skeleton(props: RHSkeletonProps) {
  return (
    <BaseSkeleton
      baseColor="rgba(0, 0, 0, .03)"
      highlightColor="rgba(0, 0, 0, .06)"
      {...props}
    />
  );
}
