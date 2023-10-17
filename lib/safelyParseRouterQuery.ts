export const safelyParseRouterQuery = (query?: string[] | string) => {
  if (query == null) {
    return '';
  }
  return Array.isArray(query) ? query[0] : query;
};
