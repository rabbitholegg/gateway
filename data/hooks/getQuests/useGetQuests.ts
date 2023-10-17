import { useInfiniteQuery } from "@tanstack/react-query"
import { minutesToMilliseconds } from "date-fns"
import { match } from "ts-pattern"

import { isNonEmptyString } from "@/lib"
import { EthAddress } from "@/lib/schemas"
import {
  type FilterableQuestStatus,
  type QuestFilter,
} from "../../../components/pages/questsState"
import QuestService from "../../../services/questService"

const defaultRefetchInterval = minutesToMilliseconds(5)

export const getQuestsKey = ({
  address,
  ...params
}: Partial<{
  pageSize: number
  status: string[]
  address: EthAddress
  ethValue: string
  searchQuery: string
}>) => {
  return ["quests", address, { ...params }]
}

export const statusFilterToApiMap: Record<
  FilterableQuestStatus,
  QuestFilter[]
> = {
  active: ["active", "redeemable"],
  completed: ["completed", "claimable"],
  expired: ["expired"],
}

export const useGetQuests = ({
  address,
  pageSize = 50,
  status,
  enabled = false,
  ethValue,
  questNetwork,
  taskNetwork,
  searchQuery,
}: {
  address?: EthAddress
  pageSize?: number
  status?: string[]
  enabled?: boolean
  refetchInterval?: number
  ethValue?: string
  questNetwork?: string
  taskNetwork?: string
  searchQuery?: string
}) => {
  const hasSearchQuery = isNonEmptyString(searchQuery)
  const hasStatuses = Array.isArray(status) && status.length > 0

  const params = match(hasSearchQuery)
    .with(true, () => ({
      pageSize,
      ethValue,
      searchQuery,
      questNetwork, 
      taskNetwork,
      address,
      // If a user has filters applied already we should search amongst them, otherwise we should assume they want to
      // search across all statuses
      status: hasStatuses ? status : [],
    }))
    .otherwise(() => ({
      pageSize,
      ethValue,
      searchQuery,
      questNetwork, 
      taskNetwork,
      address, 
      // If there is no search query, set default filters if none are applied
      status: hasStatuses ? status : statusFilterToApiMap.active,
    }))

    return useInfiniteQuery({
    queryKey: getQuestsKey({ ...params, address }),
    queryFn: ({ pageParam = 1 }) =>
      QuestService.getQuests({ pageNo: pageParam, ...params }),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length >= pageSize) {
        return allPages.length + 1
      }
      return undefined
    },
    enabled,
    refetchInterval: defaultRefetchInterval,
    staleTime: defaultRefetchInterval,
    keepPreviousData: true,
  })
}
