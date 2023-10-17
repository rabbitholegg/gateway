import { assert } from "./assert";

export function getUserLocales() {
  try {
    assert(window.navigator !== undefined);
    assert(Array.isArray(window.navigator.languages));
    assert(window.navigator.languages.length >= 1);

    return [...window.navigator.languages];
  } catch (_) {
    return ['en-US', 'en'];
  }
}