
const ASSETS_URL = 'https://assets.rabbithole.gg';

export type NetworkObject = {
  name: string;
  imagePath: string;
  marketPlaceUrl?: string;
  blockExplorerUrl?: string;
  blockExplorerLabel?: string;
};

// TODO update icons
export const NETWORKS: Record<string, NetworkObject> = {
  'eth-mainnet': {
    name: 'Ethereum',
    imagePath: `${ASSETS_URL}/networks/ethereum.png`,
    marketPlaceUrl: 'https://opensea.io/assets/ethereum',
    blockExplorerUrl: 'https://etherscan.io',
    blockExplorerLabel: 'Etherscan',
  },
  mainnet: {
    name: 'Ethereum',
    imagePath: `${ASSETS_URL}/networks/ethereum.png`,
    marketPlaceUrl: 'https://opensea.io/assets/ethereum',
    blockExplorerUrl: 'https://etherscan.io',
    blockExplorerLabel: 'Etherscan',
  },
  'polygon-mainnet': {
    name: 'Polygon',
    imagePath: `${ASSETS_URL}/networks/polygon.png`,
    marketPlaceUrl: 'https://opensea.io/assets/matic',
    blockExplorerUrl: 'https://polygonscan.com',
    blockExplorerLabel: 'Polygonscan',
  },
  polygon: {
    name: 'Polygon',
    imagePath: `${ASSETS_URL}/networks/polygon.png`,
    marketPlaceUrl: 'https://opensea.io/assets/matic',
    blockExplorerUrl: 'https://polygonscan.com',
    blockExplorerLabel: 'Polygonscan',
  },
  xdai: {
    name: 'xDai',
    imagePath: `${ASSETS_URL}/networks/xdai.png`,
  },
  'eth-goerli': {
    name: 'Goerli',
    imagePath: `${ASSETS_URL}/networks/goerli.png`,
    marketPlaceUrl: 'https://testnets.opensea.io/assets/goerli',
    blockExplorerUrl: 'https://goerli.etherscan.io',
    blockExplorerLabel: 'Etherscan',
  },
  goerli: {
    name: 'Goerli',
    imagePath: `${ASSETS_URL}/networks/goerli.png`,
    marketPlaceUrl: 'https://testnets.opensea.io/assets/goerli',
    blockExplorerUrl: 'https://goerli.etherscan.io',
    blockExplorerLabel: 'Etherscan',
  },
  'opt-mainnet': {
    name: 'Optimism',
    imagePath: `${ASSETS_URL}/networks/optimism.png`,
    marketPlaceUrl: 'https://opensea.io/assets/optimism',
    blockExplorerUrl: 'https://optimistic.etherscan.io',
    blockExplorerLabel: 'Etherscan',
  },
  optimism: {
    name: 'Optimism',
    imagePath: `${ASSETS_URL}/networks/optimism.png`,
    marketPlaceUrl: 'https://opensea.io/assets/optimism',
    blockExplorerUrl: 'https://optimistic.etherscan.io',
    blockExplorerLabel: 'Etherscan',
  },
  'opt-goerli': {
    name: 'Optimism Goerli',
    imagePath: `${ASSETS_URL}/networks/optimism.png`,
    marketPlaceUrl: 'https://testnets.opensea.io/assets/optimism-goerli',
    blockExplorerUrl: 'https://goerli-optimism.etherscan.io',
    blockExplorerLabel: 'Etherscan',
  },
  'optimism-goerli': {
    name: 'Optimism Goerli',
    imagePath: `${ASSETS_URL}/networks/optimism.png`,
    marketPlaceUrl: 'https://testnets.opensea.io/assets/optimism-goerli',
    blockExplorerUrl: 'https://goerli-optimism.etherscan.io',
    blockExplorerLabel: 'Etherscan',
  },
  'arb-mainnet': {
    name: 'Arbitrum',
    imagePath: `${ASSETS_URL}/networks/arbitrum.jpeg`,
    marketPlaceUrl: 'https://opensea.io/assets/arbitrum',
    blockExplorerUrl: 'https://arbiscan.io',
    blockExplorerLabel: 'Arbiscan',
  },
  arbitrum: {
    name: 'Arbitrum',
    imagePath: `${ASSETS_URL}/networks/arbitrum.jpeg`,
    blockExplorerUrl: 'https://arbiscan.io',
    blockExplorerLabel: 'Arbiscan',
  },
  celo: {
    name: 'Celo',
    imagePath: `${ASSETS_URL}/networks/celo.png`,
    blockExplorerUrl: 'https://explorer.celo.org/mainnet',
    blockExplorerLabel: 'Celo Explorer',
  },
  avalanche: {
    name: 'Avalanche',
    imagePath: `${ASSETS_URL}/networks/avalanche.png`,
    blockExplorerUrl: 'https://snowtrace.io',
    blockExplorerLabel: 'Snowtrace',
  },
  sepolia: {
    name: 'Sepolia',
    imagePath: `${ASSETS_URL}/networks/sepolia.png`,
    blockExplorerUrl: 'https://sepolia.etherscan.io',
    blockExplorerLabel: 'Etherscan',
    marketPlaceUrl: 'https://testnets.opensea.io/assets/sepolia',
  },
  'eth-sepolia': {
    name: 'Sepolia',
    imagePath: `${ASSETS_URL}/networks/sepolia.png`,
    blockExplorerUrl: 'https://sepolia.etherscan.io',
    blockExplorerLabel: 'Etherscan',
    marketPlaceUrl: 'https://testnets.opensea.io/assets/sepolia',
  },
  'zora-mainnet': {
    name: 'Zora Network',
    imagePath: `${ASSETS_URL}/ourzora.png`,
    blockExplorerUrl: 'https://explorer.zora.energy',
    blockExplorerLabel: 'Etherscan',
  },
  'zksync-mainnet': {
    name: 'zkSync Era',
    imagePath: `${ASSETS_URL}/networks/zksync.png`,
    blockExplorerUrl: 'https://explorer.zksync.io',
    blockExplorerLabel: 'Etherscan',
  },
  'base-mainnet': {
    name: 'Base',
    imagePath: `${ASSETS_URL}/networks/base.png`,
    marketPlaceUrl: 'https://opensea.io/assets/base',
    blockExplorerUrl: 'https://basescan.org',
    blockExplorerLabel: 'BaseScan',
  },
};
