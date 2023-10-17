import { useInfiniteQuery } from '@tanstack/react-query';
import { minutesToMilliseconds } from 'date-fns';
import { isNonEmptyString } from '../isNonEmptyString';
import { fetchParticipantsByQuestId } from '@/services/questService';

function getParticipantsByQuestIdQueryKey({
  questId,
  pageSize,
  status,
}: {
  questId: string;
  pageSize: number;
  status?: string[];
}) {
  return ['quest', { questId, pageSize, status }, 'participants'];
}

export default function useGetParticipantsByQuestId({
  questId,
  pageSize = 2,
  status = [],
}: {
  questId: string;
  pageSize?: number;
  status?: string[];
}) {
  return useInfiniteQuery({
    queryKey: getParticipantsByQuestIdQueryKey({ questId, pageSize, status }),
    queryFn: ({ pageParam = 1 }) => {
      return fetchParticipantsByQuestId({
        questId,
        pageSize,
        pageNumber: pageParam,
        status,
      });
    },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length >= pageSize) {
        return allPages.length + 1;
      }
      return undefined;
    },
    enabled: isNonEmptyString(questId),
    staleTime: minutesToMilliseconds(2),
  });
}
