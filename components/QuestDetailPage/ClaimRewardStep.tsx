import {
  NETWORK_TO_CHAIN_ID,
  generateBlockExplorerUrl,
  getNFTMarketplaceUrl,
  isErc1155,
  isNonEmptyString,
  safelyGetNetworkDetails,
} from "@/lib"
import { BiLinkExternal } from "react-icons/bi"
import { formatUnits } from "viem"

import { useGetQuestById } from "../../data/hooks/getQuestById/useGetQuestById"
import Button from "../Button/Button"
import ChainIcon from "../ChainIcon/ChainIcon"
import ClaimRewardButton from "../ClaimRewardButton/ClaimRewardButton"
import ErrorState from "../ErrorState/ErrorState"
import ExternalLink from "../ExternalLink/ExternalLink"
import Flex from "../Flex"
import OpenSeaIcon from "../Icon/OpenSeaIcon"
import QuestStep from "./QuestStep"
import QuestStepLoader from "./QuestStepLoader"
import { QuestStepState } from "./useQuestState"

type ClaimRewardStepProps = {
  questId: string
  stepStatus: QuestStepState
}

export default function ClaimRewardStep({
  questId,
  stepStatus,
}: ClaimRewardStepProps) {
  const {
    data: quest,
    isLoading,
    isSuccess,
    error,
  } = useGetQuestById({ questId })

  const showError = (isSuccess && quest == null) || error != null

  const isPending = stepStatus === QuestStepState.PENDING
  const isRedeemable = stepStatus === QuestStepState.ACTIVE

  if (isLoading) {
    return <QuestStepLoader />
  }

  if (showError || quest == null) {
    return (
      <QuestStep hideCheckBox>
        <ErrorState error={error} title="Could not load quest claim step." />
      </QuestStep>
    )
  }

  const {
    amount,
    token,
    tokenSymbol,
    tokenId,
    network,
    decimals,
    tokenContractAddress,
    type,
    tokenImage,
  } = quest.reward

  const isNft = isErc1155(type)
  const networkDetails = safelyGetNetworkDetails(network)

  const href = isNft
    ? getNFTMarketplaceUrl(network, tokenContractAddress, String(tokenId))
    : generateBlockExplorerUrl(network, "address", tokenContractAddress)

  const label = isNft
    ? "Claim NFT Reward to Complete Quest"
    : "Claim Rewards"

  const nftImage =
    isNft && isNonEmptyString(tokenImage) ? (
      <ExternalLink href={href} className="max-w-[300px] w-full aspect-square">
        <img
          src={tokenImage}
          className="w-full h-full object-contain"
          alt={label}
        />
      </ExternalLink>
    ) : null

  return (
    <QuestStep label={label} status={stepStatus} image={nftImage}>
      {!isNft && (
        <p className="text-primary-text text-lg mb-3">
          Claim your rewards to complete the quest and earn:
        </p>
      )}

      <div className="flex items-stretch gap-4 pb-4">
        {isNft ? (
          <ExternalLink
            href={href}
            className="hover:bg-white/5 flex items-center gap-3 bg-card border border-primary-stroke py-2 px-4 rounded-xl"
          >
            <div className="text-black text-lg font-semibold">
              {isNonEmptyString(token) ? token : "NFT"}
            </div>
            <OpenSeaIcon size={20} />
          </ExternalLink>
        ) : (
          <ExternalLink
            href={href}
            className="hover:bg-white/5 flex items-center gap-3 bg-card border border-primary-stroke py-2 px-4 rounded-xl"
          >
            <div className="flex flex-col gap-1">
              <div className="text-black text-lg font-semibold">
                {formatUnits(BigInt(amount), decimals ?? 18)} {tokenSymbol}
              </div>
              <Flex align="center" className="text-xs text-black gap-2">
                <ChainIcon id={Number(NETWORK_TO_CHAIN_ID[network])} size={16} />
                <p className="opacity-75">{networkDetails.name} Network</p>
              </Flex>
            </div>
            <BiLinkExternal size={14} color="rgba(110, 113, 126, 0.63)" />
          </ExternalLink>
        )}
      </div>

      <Flex className="w-full items-center gap-2" justify="start">
        {isPending && (
          <Button size="xs" spacing="sm" color="tertiary" uppercase disabled>
            Unavailable
          </Button>
        )}

        {isRedeemable && (
          <ClaimRewardButton
            questId={questId}
            questAddress={quest.contractAddress}
            chainId={Number(NETWORK_TO_CHAIN_ID[quest.reward.network])}
            score={0}
            className="min-w-[120px]"
            network={quest.network}
          >
            {isNft ? "Claim" : "Complete Quest"}
          </ClaimRewardButton>
        )}
      </Flex>
    </QuestStep>
  )
}
