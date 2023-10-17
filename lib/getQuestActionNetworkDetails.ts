import { CHAIN_ID_TO_NETWORK, NetworkName, NETWORK_TO_CHAIN_ID } from "./networks"
import { Quest, QuestDetails } from "./schemas/quests"

export const getQuestActionNetworkDetails = (
  quest: QuestDetails | Quest
) => {
  if (typeof quest.actionParams !== "undefined") {
    const chainId = String(quest.actionParams.data.sourceChainId)
    const name = CHAIN_ID_TO_NETWORK[chainId]
    return {
      chainId,
      name,
    }
  }

  return {
    chainId: String(NETWORK_TO_CHAIN_ID[quest.task.network]),
    name: quest.task.network,
  }
}
