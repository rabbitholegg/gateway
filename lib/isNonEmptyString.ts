export const isNonEmptyString = (
  maybeString?: unknown,
): maybeString is string => {
  return typeof maybeString === 'string' && maybeString.trim().length > 0;
};
