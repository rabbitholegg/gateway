import { NETWORK_TO_CHAIN_ID, NetworkName, safelyGetNetworkDetails } from "@/lib"
import { ChainIcon } from "connectkit"
import Flex from "../Flex"
import QuestStep from "./QuestStep"
import QuestStepLoader from "./QuestStepLoader"
import SwitchNetworkButton from "./SwitchNetworkButton"
import { QuestStepState } from "./useQuestState"

type QuestNetworkStepProps = {
  network: NetworkName 
  networkStepStatus: QuestStepState
}

export default function QuestNetworkStep({
  network,
  networkStepStatus,
}: QuestNetworkStepProps) {
  if (network == null) {
    return <QuestStepLoader />
  }

  const chainId = NETWORK_TO_CHAIN_ID[network]
  const { name } = safelyGetNetworkDetails(network)
  
  return (
    <QuestStep label="Network" status={networkStepStatus}>
      <Flex align="center" className="text-lg gap-2 mb-3 text-primary-text">
        <ChainIcon id={Number(chainId)} />
        {name}
      </Flex>

      {networkStepStatus === QuestStepState.ACTIVE && (
        <SwitchNetworkButton
          targetChainId={Number(chainId)}
          size="xs"
          spacing="sm"
          color="primary"
          variant="gradient"
        />
      )}
    </QuestStep>
  )
}
