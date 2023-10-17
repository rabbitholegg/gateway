import { useInfiniteQuery } from '@tanstack/react-query';
import { isNonEmptyString } from '../isNonEmptyString';

import { fetchParticipantsByAddressAndQuestId } from '@/services/questService';
import { assert } from '../assert';

export function isValidAddressSearchQuery(queryAddress?: string) {
  const hasInput = isNonEmptyString(queryAddress);

  if (!hasInput) {
    return false;
  }

  return queryAddress.length >= 3 && queryAddress.length <= 42;
}

export default function useSearchParticipantsByQuestId({
  questId,
  queryAddress,
  pageSize = 2,
}: {
  questId: string;
  queryAddress?: string;
  pageSize?: number;
}) {
  return useInfiniteQuery({
    queryKey: ['quest', { questId, pageSize, queryAddress }, 'participants'],
    queryFn: ({ pageParam = 1 }) => {
      assert(isNonEmptyString(queryAddress), 'queryAddress is required');

      return fetchParticipantsByAddressAndQuestId({
        questId,
        queryAddress: queryAddress || '',
        pageSize,
        pageNumber: pageParam,
      });
    },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length >= pageSize) {
        return allPages.length + 1;
      }
      return undefined;
    },
    enabled:
      isNonEmptyString(questId) && isValidAddressSearchQuery(queryAddress),

    staleTime: Infinity,
  });
}
