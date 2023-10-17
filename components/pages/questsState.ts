import { atom, useSetAtom } from 'jotai';
import { atomWithReset, atomWithStorage, createJSONStorage } from 'jotai/utils';
import { useCallback } from 'react';
import { z } from 'zod';

export const QuestFilterSchema = z.union([
  z.literal('active'),
  z.literal('redeemable'),
  z.literal('claimable'),
  z.literal('completed'),
  z.literal('expired'),
  z.literal('upcoming'),
]);
export type QuestFilter = z.infer<typeof QuestFilterSchema>;

// Represents the visible filters in the UI, which are a subset of the available API filters.
export const FilterableQuestStatusSchema = z.union([
  z.literal('active'),
  z.literal('completed'),
  z.literal('expired'),
]);
export type FilterableQuestStatus = z.infer<typeof FilterableQuestStatusSchema>;

export const questsSearchAtom = atomWithReset('');

const storage = createJSONStorage<FilterableQuestStatus[]>(() => localStorage);
export const questsFiltersAtom = atomWithStorage(
  'RH-QuestFilters',
  [],
  storage,
);

export const showLowRewardQuestsAtom = atom(false);

export const useFilterToggle = () => {
  const setFilters = useSetAtom(questsFiltersAtom);

  return useCallback(
    (filter: FilterableQuestStatus) => {
      setFilters((prevFilters) => {
        if (prevFilters.includes(filter)) {
          return prevFilters.filter((prevFilter) => prevFilter !== filter);
        }
        return [...prevFilters, filter];
      });
    },
    [setFilters],
  );
};
