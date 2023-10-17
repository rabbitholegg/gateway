import { type SpyInstance, vi } from 'vitest';
import { getUserLocales } from './getUserLocales';

describe('getUserLocales', () => {
  let navigatorSpy: SpyInstance<[], Navigator>;

  beforeEach(() => {
    navigatorSpy = vi.spyOn(window, 'navigator', 'get');
  });

  afterEach(() => {
    navigatorSpy.mockRestore();
  });

  it('should return english locales if navigator is undefined', () => {
    // @ts-expect-error
    navigatorSpy.mockReturnValue(undefined);
    expect(getUserLocales()).toEqual(['en-US', 'en']);
  });

  it('should return english locales if navigator.languages is not an array', () => {
    navigatorSpy.mockReturnValue({
      ...navigator,
      // @ts-expect-error
      languages: undefined,
    });

    expect(getUserLocales()).toEqual(['en-US', 'en']);
  });

  it('should return english locales if navigator.languages is an empty array', () => {
    navigatorSpy.mockReturnValue({
      ...navigator,
      languages: [],
    });

    expect(getUserLocales()).toEqual(['en-US', 'en']);
  });
});
