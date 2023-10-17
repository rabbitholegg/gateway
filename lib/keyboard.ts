export const getOSAppropiateMetaKey = () => {
  if (typeof navigator === 'undefined') return '⌘';
  return navigator.userAgent.includes('Mac') ? '⌘' : 'ctrl';
};

export const isMetaKey = (key: string) => key === '⌘' || key === 'ctrl';
