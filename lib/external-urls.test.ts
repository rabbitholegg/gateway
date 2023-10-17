import { NETWORKS } from '../types';
import {
  generateBlockExplorerUrl,
  getBlockExplorerLabel,
  getNFTMarketplaceUrl,
} from './external-urls';

const address = '0x10851543671491656606E6A49dE32c9cCb41b4F8';

describe('external-urls', () => {
  describe('getBlockExplorerLabel', () => {
    it('should return correct block explorer labels', () => {
      const networkNames = Object.keys(NETWORKS);

      networkNames.forEach((networkName) => {
        const network = NETWORKS[networkName];
        const result = getBlockExplorerLabel(networkName);
        expect(result).toEqual(network.blockExplorerLabel);
      });
    });
  });

  describe('getNFTMarketplaceUrl', () => {
    it('should return correct marketplace urls', () => {
      const networkNames = Object.keys(NETWORKS);

      networkNames.forEach((networkName) => {
        const network = NETWORKS[networkName];
        const result = getNFTMarketplaceUrl(networkName, address, 1);
        expect(result).toEqual(`${network.marketPlaceUrl}/${address}/1`);
      });
    });
  });

  describe('generateBlockExplorerUrl', () => {
    it('should return correct block explorer urls for addresses', () => {
      const networkNames = Object.keys(NETWORKS);

      networkNames.forEach((networkName) => {
        const network = NETWORKS[networkName];
        const result = generateBlockExplorerUrl(
          networkName,
          'address',
          address,
        );

        if (network.blockExplorerUrl) {
          expect(result).toEqual(
            `${network.blockExplorerUrl}/address/${address}`,
          );
        } else {
          expect(result).toEqual('');
        }
      });
    });
    it('should return correct block explorer urls for transactions', () => {
      const networkNames = Object.keys(NETWORKS);

      networkNames.forEach((networkName) => {
        const network = NETWORKS[networkName];
        const result = generateBlockExplorerUrl(networkName, 'tx', address);

        if (network.blockExplorerUrl) {
          expect(result).toEqual(`${network.blockExplorerUrl}/tx/${address}`);
        } else {
          expect(result).toEqual('');
        }
      });
    });
    it('should return correct block explorer urls for blocks', () => {
      const networkNames = Object.keys(NETWORKS);

      networkNames.forEach((networkName) => {
        const network = NETWORKS[networkName];
        const result = generateBlockExplorerUrl(networkName, 'block', address);

        if (network.blockExplorerUrl) {
          expect(result).toEqual(
            `${network.blockExplorerUrl}/block/${address}`,
          );
        } else {
          expect(result).toEqual('');
        }
      });
    });
  });
});
