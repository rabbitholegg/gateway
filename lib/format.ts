import { z } from 'zod';
import { assert } from './assert';

const Numberish = z.string().or(z.number());

/**
 * Splits a numeric input into two strings: the first string containing all leading zeros and/or decimal points,
 * and the second string containing the remaining digits starting from the first non-zero digit.
  @returns A tuple containing two strings: the first string with leading zeros and/or decimal points, and the second string with the remaining digits.
  @example
  splitSignificantFigures(0.00123); // ['0.00', '123']
  splitSignificantFigures('00045.678'); // ['000', '45.678']
  splitSignificantFigures('123.000'); // ['', '123.000']
  splitSignificantFigures('0.0'); // ['0.', '0']
*/
export function splitSignificantFigures(value: string | number) {
  const result = Numberish.safeParse(value);

  assert(
    result.success === true,
    'splitSignificantFigures: value must be a number',
  );

  assert(
    value !== Infinity,
    'splitSignificantFigures: value must not be Infinity',
  );

  const number = String(result.data);
  const split = number.split('');
  const firstNonZeroDigitIndex = split.findIndex(
    (digit) => digit !== '0' && digit !== '.' && digit !== '-',
  );

  if (firstNonZeroDigitIndex === -1) {
    return [number, ''] as const;
  }

  return [
    number.substring(0, firstNonZeroDigitIndex),
    number.substring(firstNonZeroDigitIndex, number.length),
  ] as const;
}
