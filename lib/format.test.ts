import { splitSignificantFigures } from './format';

describe('format', () => {
  describe('splitSignificantFigures', () => {
    it('splits a number with leading zeros and/or decimal points', () => {
      expect(splitSignificantFigures(0.00123)).toEqual(['0.00', '123']);
      expect(splitSignificantFigures('00045.678')).toEqual(['000', '45.678']);
      expect(splitSignificantFigures('123.000')).toEqual(['', '123.000']);
      expect(splitSignificantFigures('01')).toEqual(['0', '1']);
      expect(splitSignificantFigures('0123004')).toEqual(['0', '123004']);
      expect(splitSignificantFigures('0.0')).toEqual(['0.0', '']);
      expect(splitSignificantFigures(9)).toEqual(['', '9']);
    });

    it('works with negative numbers', () => {
      expect(splitSignificantFigures(-0.00123)).toEqual(['-0.00', '123']);
      expect(splitSignificantFigures('-1.337')).toEqual(['-', '1.337']);
    });

    it('throws an error if value is not string or number', () => {
      // @ts-expect-error
      expect(() => splitSignificantFigures(() => {})).toThrow();
      // @ts-expect-error
      expect(() => splitSignificantFigures(true)).toThrow();
      // @ts-expect-error
      expect(() => splitSignificantFigures({})).toThrow();
      // @ts-expect-error
      expect(() => splitSignificantFigures([])).toThrow();
    });

    it('throws an error if value is not finite', () => {
      expect(() => splitSignificantFigures(Infinity)).toThrow();
    });
  });
});
