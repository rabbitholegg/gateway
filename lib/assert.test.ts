import { assert } from './assert';

describe('assert', () => {
  it('should not throw an error if condition is truthy', () => {
    expect(() => {
      assert(1 === 1);
    }).not.toThrow();
  });

  it('should throw an error if condition is falsy', () => {
    expect(() => {
      assert([1, 2].length === 3, 'length must be === 3');
    }).toThrowError('length must be === 3');
  });
});
