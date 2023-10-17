import { isEmptyString } from './isEmptyString';

describe('isEmptyString', () => {
  it('should return true if input is a string with zero length', () => {
    expect(isEmptyString('')).toBe(true);
  });

  it('should return true if input is a string with only spaces', () => {
    expect(isEmptyString('   ')).toBe(true);
  });

  it('should return false if input is not a string', () => {
    expect(isEmptyString(true)).toBe(false);
    expect(isEmptyString({})).toBe(false);
    expect(isEmptyString(undefined)).toBe(false);
    expect(isEmptyString(null)).toBe(false);
    expect(isEmptyString()).toBe(false);
    expect(isEmptyString(() => {})).toBe(false);
    expect(isEmptyString([])).toBe(false);
  });
});
