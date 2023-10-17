import { isFuture, isPast } from "date-fns"
import { BsFillStopFill } from "react-icons/bs"
import { GoCheck } from "react-icons/go"

import { cn, isNonEmptyString } from "@/lib"
import { QuestStatus } from "@/lib/types"
import { useGetQuestById } from "../../data/hooks/getQuestById/useGetQuestById"
import AnimatedLiveIndicator from "../AnimatedLiveIndicator/AnimatedLiveIndicator"
import Countdown from "../Countdown/Countdown"
import Skeleton from "../Skeleton/Skeleton"

const statusClasses = "text-md text-primary-text flex items-center gap-2"

export default function QuestHeaderStatus({ questId }: { questId: string }) {
  const { data: quest, isLoading: isLoadingQuestById } = useGetQuestById({
    questId,
  })

  if (isLoadingQuestById) {
    return (
      <div className="w-1/2 h-10">
        <Skeleton />
      </div>
    )
  }

  const { status, questEnd, questStart, eligibility } = quest || {}
  const isIneligible = eligibility?.eligible === false

  if (isIneligible) {
    return <div className={statusClasses}>Ineligible</div>
  }

  if (
    status === QuestStatus.UPCOMING ||
    (isNonEmptyString(questStart) && isFuture(new Date(questStart)))
  ) {
    return (
      <div className={cn(statusClasses, "text-[#FFD066]")}>Coming Soon</div>
    )
  }

  if (status === QuestStatus.EXPIRED) {
    return (
      <div className={cn(statusClasses, "text-app-red")}>
        <BsFillStopFill size={14} />
        Expired
      </div>
    )
  }

  if (status === QuestStatus.COMPLETED || isPast(new Date(questEnd || ""))) {
    return (
      <div className={statusClasses}>
        <GoCheck size={12} />
        Completed
      </div>
    )
  }

  return (
    <div className={statusClasses}>
      <AnimatedLiveIndicator />
      {isNonEmptyString(questEnd) && <Countdown questEnd={questEnd} />}
    </div>
  )
}
