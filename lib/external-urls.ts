import { isNonEmptyString } from './isNonEmptyString';
import { NetworkName } from './networks';
import { safelyGetNetworkDetails } from './safelyGetNetworkDetails';

export type Network =
  | 'local'
  | 'mainnet'
  | 'ethereum'
  | 'optimism'
  | 'optimism-goerli'
  | 'goerli'
  | 'sepolia'
  | 'polygon';

export function getNFTMarketplaceUrl(
  network: string,
  rewardContractAddress: string,
  tokenId: number | string,
): string {
  const matchingNetwork = safelyGetNetworkDetails(network);
  return `${matchingNetwork.marketPlaceUrl}/${rewardContractAddress}/${tokenId}`;
}

export function generateBlockExplorerUrl(
  network: NetworkName | string,
  type: 'tx' | 'address' | 'block',
  value: string,
): string {
  try {
    const { blockExplorerUrl } = safelyGetNetworkDetails(network);
    if (isNonEmptyString(blockExplorerUrl)) {
      return `${blockExplorerUrl}/${type}/${value}`;
    }
  } catch (err) {
    console.error(err);
  }

  return '';
}

export function getBlockExplorerLabel(network: NetworkName | string) {
  try {
    const { blockExplorerLabel } = safelyGetNetworkDetails(network);
    return blockExplorerLabel;
  } catch (err) {
    console.error(err);
  }

  return 'Etherscan';
}
