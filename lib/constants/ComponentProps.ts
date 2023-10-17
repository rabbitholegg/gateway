export type ComponentSpacing = 'flush' | 'xxs' | 'xs' | 'sm' | 'md' | 'lg';
export const componentSpacingValues: Record<ComponentSpacing, string> = {
  flush: 'py-0 px-0',
  xxs: 'p-1',
  xs: 'py-1 px-3',
  sm: 'py-2 px-3',
  md: 'py-2 px-7',
  lg: 'py-8 px-6',
} as const;

export type ComponentSize = 'xs' | 'sm' | 'md' | 'lg';
export const componentSizingValues: Record<ComponentSize, string> = {
  xs: 'text-xs ',
  sm: 'text-sm ',
  md: 'text-sm ',
  lg: 'text-base',
} as const;

export type ComponentRadii = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
export const componentRadiiValues: Record<ComponentRadii, string> = {
  none: 'rounded-none',
  xs: 'rounded-xs',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  full: 'rounded-full',
} as const;
