
import { parseAddresses } from "@/lib"
import { useGetQuestById } from "../../data/hooks/getQuestById/useGetQuestById"
import Button from "../Button/Button"
import CopyAddressButton from "../CopyAddressButton/CopyAddressButton"
import ErrorState from "../ErrorState/ErrorState"
import ExternalLink from "../ExternalLink/ExternalLink"
import Flex from "../Flex"
import QuestActionDetails from "./QuestActionDetails"
import QuestStep from "./QuestStep"
import QuestStepLoader from "./QuestStepLoader"
import { QuestStepState } from "./useQuestState"

type StartQuestStepProps = {
  questId: string
  stepStatus: QuestStepState
}

export default function StartQuestStep({
  questId,
  stepStatus,
}: StartQuestStepProps) {
  const {
    data: quest,
    isLoading,
    isSuccess,
    error,
  } = useGetQuestById({ questId })

  const isActive = stepStatus === QuestStepState.ACTIVE
  const showError = (isSuccess && quest == null) || error != null

  if (isLoading) {
    return <QuestStepLoader />
  }

  if (showError || quest == null) {
    return (
      <QuestStep hideCheckBox>
        <ErrorState error={error} title="Could not load quest details." />
      </QuestStep>
    )
  }
  
  const description = quest.description || quest.task.description
  const parsedAddresses = parseAddresses(description)

  return (
    <QuestStep label="Action Details" status={stepStatus}>
      {parsedAddresses.length > 0 && (
        <Flex align="center" className="gap-1 mt-2 mb-6">
          {parsedAddresses.map((address) => (
            <CopyAddressButton
              address={address}
              key={address}
              color="tertiary"
              variant="outline"
              size="xs"
              spacing="xs"
            />
          ))}
        </Flex>
      )}

      <QuestActionDetails quest={quest} />

      {isActive && (
        <Flex align="center" className="gap-2 mt-3">
          <ExternalLink href={quest.appLink}>
            <Button
              size="xs"
              spacing="sm"
              color="primary"
              variant="gradient"
            >
              Start Quest
            </Button>
          </ExternalLink>
        </Flex>
      )}
    </QuestStep>
  )
}
