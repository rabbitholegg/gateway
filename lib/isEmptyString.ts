export const isEmptyString = (maybeString?: unknown) => {
  return typeof maybeString === 'string' && maybeString.trim().length === 0;
};
