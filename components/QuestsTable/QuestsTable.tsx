import { isValidAddress } from "@/lib"
import useGetEnsAddresses from "@/lib/hooks/useGetEnsAddresses"
import { QuestAndReward } from "@/lib/schemas/quests"
import classNames from "classnames"
import { useMemo } from "react"
import Flex from "../Flex"
import QuestRow from "../QuestRow/QuestRow"

function QuestTableHeader() {
  return (
    <div className="w-full hidden md:flex items-center justify-between text-primary-text text-xs pr-11 font-semibold">
      <p className="truncate">Task Name</p>

      <div className="w-2/3 gap-3 hidden md:grid grid-cols-4">
        <p className="truncate">Creator</p>
        <p className="truncate">Reward</p>
        <p className="truncate">Rewards Remaining</p>
        <p className="truncate">Time Remaining</p>
      </div>
    </div>
  )
}

type QuestsTableProps = {
  quests: QuestAndReward[]
  activeQuestId?: string
  onRowClick?: (questId: string) => void
}

const QuestsTable = ({
  activeQuestId,
  quests,
  onRowClick,
}: QuestsTableProps) => {
  const allCreatorAddresses = useMemo(
    () =>
      quests.map(({ quest }) => quest.creatorAddress).filter(isValidAddress),
    [quests]
  )

  const { getDataForAddress } = useGetEnsAddresses(allCreatorAddresses)

  return (
    <Flex direction="column" className="gap-3">
      <QuestTableHeader />
      <Flex direction="column" className="pb-5 overflow-x-auto">
        {quests.map(({ quest, reward }, index) => {
          const classes = classNames("text-black", {
            "border-t-0": index !== 0,
            "rounded-tl-xl rounded-tr-xl": index === 0,
            "rounded-bl-xl rounded-br-xl border-b-1":
              index === quests.length - 1,
          })
          return (
            <QuestRow
              quest={quest}
              reward={reward}
              key={quest.id}
              isOpen={activeQuestId === quest.id}
              onClick={onRowClick}
              className={classes}
              creatorEns={getDataForAddress(quest.creatorAddress)}
            />
          )
        })}
      </Flex>
    </Flex>
  )
}

export default QuestsTable
