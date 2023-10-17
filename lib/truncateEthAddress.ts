import { isValidAddress } from './isValidAddress';

export function truncateEthAddress(address?: string) {
  if (!isValidAddress(address)) {
    return address;
  }

  return `${address.slice(0, 5)}...${address.slice(-4)}`;
}
