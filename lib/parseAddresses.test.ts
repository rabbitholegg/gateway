import { isValidAddress } from './isValidAddress';
import { parseAddresses } from './parseAddresses';

describe('parseAddresses', () => {
  it('should return empty array if input is empty string or undefined', () => {
    expect(parseAddresses('')).toEqual([]);
    expect(parseAddresses('  ')).toEqual([]);
    expect(parseAddresses(undefined)).toEqual([]);
  });

  it('should return empty array if no valid eth addresses are found', () => {
    expect(parseAddresses('lorem ipsum dolor')).toEqual([]);
  });

  it('should return array of eth addresses if matched', () => {
    const validAddress = '0x8113Cc1ab04Fe837C887493a63915782696d9781';
    const result = parseAddresses(`Hey whats up its ya boy ${validAddress}`);

    expect(result[0]).toEqual(validAddress);
    expect(isValidAddress(result[0])).toBe(true);
  });

  it('should not return duplicate addresses', () => {
    expect(
      parseAddresses(
        'Hey whats up its ya boy 0x8113Cc1ab04Fe837C887493a63915782696d9781 oh and also ya gal 0x8113Cc1ab04Fe837C887493a63915782696d9781',
      ),
    ).toEqual(['0x8113Cc1ab04Fe837C887493a63915782696d9781']);
  });

  it('should return multiple valid addresses if matched', () => {
    const result = parseAddresses(
      'Hey whats up its ya boy 0x8113Cc1ab04Fe837C887493a63915782696d9781 oh and also ya gal 0x8F5415415d9200cCd8523F3Ee88F96F476141CC3',
    );
    expect(result).toEqual([
      '0x8113Cc1ab04Fe837C887493a63915782696d9781',
      '0x8F5415415d9200cCd8523F3Ee88F96F476141CC3',
    ]);

    expect(isValidAddress(result[0])).toBe(true);
    expect(isValidAddress(result[1])).toBe(true);
  });
});
