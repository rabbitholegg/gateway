import { fuzzySearch } from './fuzzySearch';

describe('fuzzySearch', () => {
  test('returns true for exact match', () => {
    expect(fuzzySearch('apple', 'apple')).toBe(true);
  });

  test('returns false if target length > query length', () => {
    expect(fuzzySearch('appled', 'apple')).toBe(false);
  });

  test('returns true for fuzzy match', () => {
    expect(fuzzySearch('apple', 'applesauc')).toBe(true);
  });

  test('returns false for non-matching strings', () => {
    expect(fuzzySearch('apple', 'apply')).toBe(false);
    expect(fuzzySearch('apple', 'banana')).toBe(false);
  });
});
