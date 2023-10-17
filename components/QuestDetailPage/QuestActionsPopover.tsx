import {
  assert,
  generateBlockExplorerUrl,
  isNonEmptyString,
  openInNewWindow,
} from "@/lib"
import copy from "copy-to-clipboard"
import { useCallback } from "react"
import { BiCopy, BiLinkExternal } from "react-icons/bi"
import { FaEllipsisH } from "react-icons/fa"

import { showErrorToast, showSuccessToast } from "@/lib/showCustomToast"
import { useGetQuestById } from "../../data/hooks/getQuestById/useGetQuestById"
import Button from "../Button/Button"
import Flex from "../Flex"
import { Popover, PopoverContent, PopoverTrigger } from "../Popover/Popover"

type QuestActionsPopoverProps = {
  questId: string
}

export default function QuestActionsPopover({
  questId,
}: QuestActionsPopoverProps) {
  const { data: quest, isLoading } = useGetQuestById({ questId })

  const handleCopyClick = useCallback(() => {
    const questId = quest?.id

    try {
      assert(isNonEmptyString(questId), "Quest ID is not a string")

      copy(questId)
      showSuccessToast({ title: `Copied ${questId}!` })
    } catch (_) {
      showErrorToast({ title: `Could not copy quest ID to clipboard.` })
    }
  }, [quest?.id])

  const handleTaskContractClick = useCallback(() => {
    const task = quest?.task
    try {
      assert(task != null, "Task is null")
      assert(
        isNonEmptyString(task.contractAddress),
        "Task contract address is not a string"
      )

      openInNewWindow(
        generateBlockExplorerUrl(
          task.network,
          "address",
          task.contractAddress
        )
      )
    } catch (_) {
      showErrorToast({ title: `Could not open task contract in explorer.` })
    }
  }, [quest?.task])

  if (isLoading) {
    return null
  }

  return (
    <Popover placement="bottom-end">
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          color="tertiary"
          size="sm"
          spacing="flush"
          className="w-9 h-9"
        >
          <FaEllipsisH />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="bg-white">
        <Flex direction="column">
          <Button
            variant="transparent"
            color="white"
            spacing="sm"
            onClick={handleCopyClick}
            tabIndex={0}
          >
            <Flex align="center" justify="between" className="gap-2 w-full">
              <p className="font-medium tracking-normal text-black">
                Copy Quest ID
              </p>
              <BiCopy className="opacity-70" />
            </Flex>
          </Button>
          <Button
            variant="transparent"
            color="white"
            spacing="sm"
            onClick={handleTaskContractClick}
            tabIndex={0}
          >
            <Flex align="center" justify="between" className="gap-2 w-full">
              <p className="font-medium tracking-normal text-black">
                Task Contract
              </p>
              <BiLinkExternal className="opacity-70" />
            </Flex>
          </Button>
        </Flex>
      </PopoverContent>
    </Popover>
  )
}
