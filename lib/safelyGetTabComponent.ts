import { isValidElement } from 'react';

export type TabMap = Record<number, JSX.Element>;

export const safelyGetTabComponent = (index: number, tabMap: TabMap) => {
  const component = tabMap[index];
  if (isValidElement(component)) {
    return component;
  }
  return tabMap[0];
};
