import { isNonEmptyString } from './isNonEmptyString';

describe('isNonEmptyString', () => {
  it('should return true if input is a string with non-zero length', () => {
    expect(isNonEmptyString('hello')).toBe(true);
  });

  it('should return false if input is a zero length string', () => {
    expect(isNonEmptyString('')).toBe(false);
  });

  it('should trim whitespace', () => {
    expect(isNonEmptyString('   ')).toBe(false);
  });

  it('should return false if input is not a string', () => {
    expect(isNonEmptyString(true)).toBe(false);
    expect(isNonEmptyString({})).toBe(false);
    expect(isNonEmptyString(undefined)).toBe(false);
    expect(isNonEmptyString(null)).toBe(false);
    expect(isNonEmptyString()).toBe(false);
    expect(isNonEmptyString(() => {})).toBe(false);
    expect(isNonEmptyString([])).toBe(false);
  });
});
