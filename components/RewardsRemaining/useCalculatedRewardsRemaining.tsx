import { formatRewardsRemaining } from '@/lib';
import { useMemo } from 'react';

export type CalculatedRewardsRemainingOptions = {
  value: number;
  max: number;
};

export function useCalculatedRewardsRemaining({
  value,
  max,
}: CalculatedRewardsRemainingOptions) {
  // Dont allow this to be a negative number for whatever reason
  const absoluteMax = Math.abs(max);

  // Constrain this value to between 0 to `max`
  const rewardsRemaining = formatRewardsRemaining(absoluteMax, value);

  return useMemo(
    () => ({ absoluteMax, rewardsRemaining }),
    [absoluteMax, rewardsRemaining],
  );
}
