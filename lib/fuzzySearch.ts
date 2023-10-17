/**
 * A fuzzy search function that returns true if the needle is found in the haystack, or false otherwise.
 */
export function fuzzySearch(needle: string, haystack: string) {
  const hlen = haystack.length;
  const nlen = needle.length;

  // If the needle is longer than the haystack, it can't possibly be a match
  if (nlen > hlen) {
    return false;
  }

  // If the needle is the same length as the haystack, we can just do a strict comparison
  if (nlen === hlen) {
    return needle === haystack;
  }

  // Otherwise, we need to do a fuzzy search
  outer: for (let i = 0, j = 0; i < nlen; i++) {
    const nch = needle.charCodeAt(i);

    while (j < hlen) {
      // If the next character in the haystack matches the current character in the needle, we can move on to the next character in the needle
      if (haystack.charCodeAt(j++) === nch) {
        continue outer;
      }
    }

    return false;
  }

  return true;
}
