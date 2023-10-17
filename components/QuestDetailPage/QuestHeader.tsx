import classNames from "classnames"

import { isNonEmptyString } from "@/lib"
import Flex from "../Flex"
import Skeleton from "../Skeleton/Skeleton"

type QuestHeaderProps = {
  questName?: string
  totalRewards?: number
  numberMinted?: number
  className?: string
}

export default function QuestHeader({
  questName,
  totalRewards,
  numberMinted,
  className,
}: QuestHeaderProps) {
  const showRewards = totalRewards != null && numberMinted != null

  return (
    <Flex
      direction="column"
      align="center"
      className={classNames("w-full gap-1", className)}
    >
      <h2 className="font-bold text-white text-2xl tracking-tight leading-tight w-full text-center">
        {isNonEmptyString(questName) ? questName : <Skeleton />}
      </h2>
      <Flex
        align="center"
        justify="center"
        className="gap-2 text-sm text-gray-400 w-full"
      >
        <div className="w-full text-center">
          {showRewards ? (
            <p>
              Rewards: {totalRewards - numberMinted}/{totalRewards}
            </p>
          ) : (
            <Skeleton width="50%" />
          )}
        </div>
      </Flex>
    </Flex>
  )
}
