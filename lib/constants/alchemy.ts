import * as chains from 'viem/chains';

const alchemyApiKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY!;

export const RPC_URLS_BY_ALCHEMY_ID = {
  'base-mainnet': `${chains.base.rpcUrls.alchemy.http[0]}/${alchemyApiKey}`,
  'eth-goerli': `${chains.goerli.rpcUrls.alchemy.http[0]}/${alchemyApiKey}`,
  'eth-mainnet': `${chains.mainnet.rpcUrls.alchemy.http[0]}/${alchemyApiKey}`,
  'opt-goerli': `${chains.optimismGoerli.rpcUrls.alchemy.http[0]}/${alchemyApiKey}`,
  'opt-mainnet': `${chains.optimism.rpcUrls.alchemy.http[0]}/${alchemyApiKey}`,
  'polygon-mainnet': `${chains.polygon.rpcUrls.alchemy.http[0]}/${alchemyApiKey}`,
  'polygon-mumbai': `${chains.polygonMumbai.rpcUrls.alchemy.http[0]}/${alchemyApiKey}`,
  'arb-mainnet': `${chains.arbitrum.rpcUrls.alchemy.http[0]}/${alchemyApiKey}`,
  'arb-goerli': `${chains.arbitrumGoerli.rpcUrls.alchemy.http[0]}/${alchemyApiKey}`,
  'eth-sepolia': `${chains.sepolia.rpcUrls.alchemy.http[0]}/${alchemyApiKey}`,
  'zora-mainnet': 'https://rpc.zora.co',
  'zksync-mainnet': 'https://mainnet.era.zksync.io',
} as const;

export const isValidAlchemyId = (
  maybeAlchemyId?: string,
): maybeAlchemyId is keyof typeof RPC_URLS_BY_ALCHEMY_ID => {
  return Object.hasOwn(RPC_URLS_BY_ALCHEMY_ID, maybeAlchemyId ?? '');
};
