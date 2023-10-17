import { isValidAddress } from './isValidAddress';

const matcher = /0x[a-fA-F0-9]{40}/gm;
export function parseAddresses(text?: string) {
  if (typeof text !== 'string' || text.trim().length === 0) {
    return [];
  }

  const maybeMatches = text.match(matcher);
  if (maybeMatches == null || maybeMatches.length === 0) {
    return [];
  }

  return [
    ...new Set(maybeMatches.map((address) => address).filter(isValidAddress)),
  ];
}
