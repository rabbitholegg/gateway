import useWallet from "@/hooks/useWallet"
import { isNonEmptyString } from "@/lib"
import { EthAddress } from "@/lib/schemas"
import { QuestStatus } from "@/lib/types"
import { useQuery } from "@tanstack/react-query"
import { secondsToMilliseconds } from "date-fns"
import QuestService, {
  type GetQuestByIdResponse,
} from "../../../services/questService"
import { queryClient } from "../../queryClient"

const refetchInterval = secondsToMilliseconds(30)

export const getQuestByIdKey = ({
  questId,
  address,
}: {
  questId: string
  address?: EthAddress
}) => {
  return ["quests", address, { questId }]
}

export const markQuestAsCompletedForAddress = ({
  questId,
  address,
}: {
  questId: string
  address: EthAddress
}) => {
  const queryKey = getQuestByIdKey({ questId, address })
  queryClient.setQueryData<GetQuestByIdResponse>(queryKey, (oldData: any) => {
    if (oldData == null) {
      return oldData
    }

    return { ...oldData, status: QuestStatus.COMPLETED }
  })
}

/**
 * Fetches a quest by ID. If user has their wallet connected, will show the
 * quest for their user, otherwise the public version
 */
export const useGetQuestById = ({ questId }: { questId: string }) => {
  const { isMounted, address } = useWallet()

  return useQuery({
    queryKey: getQuestByIdKey({ questId, address }),
    queryFn: () => QuestService.getQuestById({ questId, address }),
    enabled: isMounted && isNonEmptyString(questId),
    keepPreviousData: true,
    refetchInterval,
  })
}
