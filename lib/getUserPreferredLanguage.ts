export const getUserPreferredLanguage = (defaultLanguage = 'en'): string => {
  if (typeof window === 'undefined') {
    return defaultLanguage;
  }

  const language = window.navigator.language.split('-')[0];
  return language || defaultLanguage;
};
