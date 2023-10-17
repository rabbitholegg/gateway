import * as blockies from 'blockies-ts';
import { hasWindow } from './hasWindow';

/**
 * Replaces an object in an array based on the `id` value of the provided object
 * @param array - an array of objects where one has been updated
 * @param updatedObject - an object that, was recently updated and, needs to be replaced in the list
 * @returns the array with the updated object replaced
 */
export const getBlockie = (address: string): string => {
  if (hasWindow()) {
    // You now have access to `window`
    return blockies.create({ seed: address }).toDataURL();
  }
  return '';
};
