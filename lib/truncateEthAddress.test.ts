import { zeroAddress } from 'viem';
import { truncateEthAddress } from './truncateEthAddress';

describe('truncateEthAddress', () => {
  it('should truncate a valid ethereum address', () => {
    expect(
      truncateEthAddress('0x8113Cc1ab04Fe837C887493a63915782696d9781'),
    ).toEqual('0x811...9781');
    expect(truncateEthAddress(zeroAddress)).toEqual('0x000...0000');
  });
  it('should return as-is if not a valid address', () => {
    expect(truncateEthAddress('😎')).toEqual('😎');
    expect(
      // one character short
      truncateEthAddress('0x8113Cc1ab04Fe837C887493a63915782696d978'),
    ).toEqual('0x8113Cc1ab04Fe837C887493a63915782696d978');
  });
});
