import {
  NETWORK_TO_CHAIN_ID,
  NETWORK_TO_NAME,
  networkStringToChainId,
  networkStringToName,
} from './networks';

describe('networks', () => {
  describe('networkStringToChainId', () => {
    test('should return undefined when network is not provided', () => {
      expect(networkStringToChainId()).toBeUndefined();
    });

    test('should return the correct chainId when a valid network is provided', () => {
      expect(networkStringToChainId('eth-mainnet')).toBe(
        NETWORK_TO_CHAIN_ID['eth-mainnet'],
      );
      expect(networkStringToChainId('arb-goerli')).toBe(
        NETWORK_TO_CHAIN_ID['arb-goerli'],
      );
    });

    test('should return undefined when an invalid network is provided', () => {
      expect(networkStringToChainId('unknown-network')).toBe(undefined);
    });
  });

  describe('networkStringToName', () => {
    test('should return undefined when network is not provided', () => {
      expect(networkStringToName()).toBeUndefined();
    });

    test('should return the correct network name when a valid network is provided', () => {
      expect(networkStringToName('eth-mainnet')).toBe(
        NETWORK_TO_NAME['eth-mainnet'],
      );
      expect(networkStringToName('arb-goerli')).toBe(
        NETWORK_TO_NAME['arb-goerli'],
      );
    });

    test('should return undefined when an invalid network is provided', () => {
      expect(networkStringToName('unknown-network')).toBe(undefined);
    });
  });
});
