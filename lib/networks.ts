import { z } from 'zod';

export const NetworkNameSchema = z.union([
  z.literal('ethereum'),
  z.literal('eth-mainnet'),
  z.literal('eth-goerli'),
  z.literal('opt-mainnet'),
  z.literal('optimism'),
  z.literal('opt-goerli'),
  z.literal('arbitrum'),
  z.literal('arb-mainnet'),
  z.literal('arb-goerli'),
  z.literal('polygon'),
  z.literal('polygon-mainnet'),
  z.literal('polygon-mumbai'),
  z.literal('eth-sepolia'),
  z.literal('zora-mainnet'),
  z.literal('zksync-mainnet'),
  z.literal('base'),
  z.literal('base-mainnet'),
]);

export type NetworkName = z.infer<typeof NetworkNameSchema>;

export const NETWORK_TO_CHAIN_ID: Record<NetworkName, number> = {
  ethereum: 0x1,
  'eth-mainnet': 0x1,
  'eth-goerli': 0x5,
  optimism: 0xa,
  'opt-mainnet': 0xa,
  'opt-goerli': 0x1a4,
  arbitrum: 0xa4b1,
  'arb-mainnet': 0xa4b1,
  'arb-goerli': 0x66eed,
  polygon: 0x89,
  'polygon-mainnet': 0x89,
  'polygon-mumbai': 0x13881,
  'eth-sepolia': 0xaa36a7,
  'zora-mainnet': 0x76adf1,
  'zksync-mainnet': 0x144,
  base: 0x2105,
  'base-mainnet': 0x2105,
} as const;

export const NETWORK_TO_NAME: Record<NetworkName, string> = {
  ethereum: 'Ethereum',
  'eth-mainnet': 'Ethereum',
  'eth-goerli': 'Goerli',
  optimism: 'Optimism',
  'opt-mainnet': 'Optimism',
  'opt-goerli': 'Optimism Goerli',
  arbitrum: 'Arbitrum',
  'arb-mainnet': 'Arbitrum',
  'arb-goerli': 'Arbitrum Goerli',
  polygon: 'Polygon',
  'polygon-mainnet': 'Polygon',
  'polygon-mumbai': 'Polygon Mumbai',
  'eth-sepolia': 'Sepolia',
  'zora-mainnet': 'Zora Network',
  'zksync-mainnet': 'zkSync Era',
  base: 'Base',
  'base-mainnet': 'Base',
} as const;

export const CHAIN_ID_TO_NETWORK: Record<string, NetworkName> = Object.keys(
  NETWORK_TO_CHAIN_ID,
).reduce((acc, network) => {
  const chainId = NETWORK_TO_CHAIN_ID[network as NetworkName];
  return {
    ...acc,
    [chainId]: network,
  };
}, {});

export function networkStringToChainId(network?: string | null) {
  const result = NetworkNameSchema.safeParse(network);

  if (!result.success) {
    return undefined;
  }

  return NETWORK_TO_CHAIN_ID[result.data];
}

export function networkStringToName(network?: string) {
  const result = NetworkNameSchema.safeParse(network);

  if (!result.success) {
    return undefined;
  }

  return NETWORK_TO_NAME[result.data];
}
