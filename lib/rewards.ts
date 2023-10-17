export function isErc20(type: unknown): type is 'erc20' {
  return typeof type === 'string' && type.toLowerCase() === 'erc20';
}

export function isErc1155(type: unknown): type is 'erc1155' {
  return typeof type === 'string' && type.toLowerCase() === 'erc1155';
}

export function formatRewardsRemaining(total: number, claimed: number) {
  // Dont allow this to be a negative number for whatever reason
  const absTotal = Math.abs(total);

  // Constrain this value to between 0 to `max`
  return Math.min(Math.max(0, absTotal - claimed), absTotal);
}
