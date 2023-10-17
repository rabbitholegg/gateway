import { isAddress, type Address } from 'viem';
import { isNonEmptyString } from './isNonEmptyString';

export const isValidAddress = (
  maybeAddress?: unknown,
): maybeAddress is Address => {
  return isNonEmptyString(maybeAddress) && isAddress(maybeAddress);
};
