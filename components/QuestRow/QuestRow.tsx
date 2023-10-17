import {
  NETWORK_TO_CHAIN_ID,
  generateBlockExplorerUrl,
  isErc1155,
  isNonEmptyString,
  truncateEnsName,
  truncateEthAddress
} from "@/lib"
import { QuestStatus } from "@/lib/types"
import { type EnsData } from '@/services/ens'
import classNames from "classnames"
import { motion } from "framer-motion"
import Image from "next/image"
import { useCallback, useMemo, type PropsWithChildren } from "react"
import { BsChevronRight } from "react-icons/bs"


// import { getQuestActionNetworkDetails } from "../../utils/getQuestActionNetworkDetails"
import { SPRING_TRANSITION } from "@/lib/constants"
import { Quest, Reward } from "@/lib/schemas/quests"
import AnimatedLiveIndicator from "../AnimatedLiveIndicator/AnimatedLiveIndicator"
import ChainIcon from "../ChainIcon/ChainIcon"
import Countdown from "../Countdown/Countdown"
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary"
import ExternalLink from "../ExternalLink/ExternalLink"
import Flex from "../Flex"
import GlassCard from "../GlassCard/GlassCard"
import StatusPill from "../Pills/StatusPill"
import RewardAmountWithSymbol from "../RewardAmountWithSymbol/RewardAmountWithSymbol"
import RewardsRemaining from "../RewardsRemaining/RewardsRemaining"
import RewardsRemainingWithProgressBar from "../RewardsRemaining/RewardsRemainingWithProgressBar"

function QuestName({
  highlight = false,
  children,
}: PropsWithChildren & { highlight?: boolean }) {
  return (
    <p
      className={classNames(
        "font-semibold text-primary-text text-sm truncate w-full",
        {
          "text-secondary-highlight": highlight,
        }
      )}
    >
      {children}
    </p>
  )
}

type QuestAndNetworkIconsProps = {
  chainId: string
  questImage: string
}

function QuestAndNetworkIcons({
  chainId,
  questImage,
}: QuestAndNetworkIconsProps) {
  return (
    <div className="relative flex-shrink-0">
      <div className="absolute right-0 bottom-0 z-10 scale-[0.5] md:scale-[.6666666667] origin-bottom-right">
        <ChainIcon id={Number(chainId)} />
      </div>

      <div className="w-6 h-6 md:w-10 md:h-10 rounded-full overflow-clip relative">
        <Image src={questImage} fill alt="task_icon" className="object-cover" />
      </div>
    </div>
  )
}

type QuestRowContainerProps = PropsWithChildren & {
  onClick: () => void
  highlight?: boolean
  className?: string
}

function QuestRowContainer({
  onClick,
  highlight = false,
  children,
  className,
}: QuestRowContainerProps) {
  const classes = classNames(
    "@container active:bg-black/5",
    className
  )

  return (
    <GlassCard
      spacing="flush"
      className={classes}
      radius="sm"
      color={highlight ? "secondary" : "primary"}
    >
      <button
        onClick={onClick}
        className="grid grid-cols-1 md:grid-cols-[1fr_auto] grid-rows-1 items-center justify-between p-3 md:p-5 gap-5 w-full"
      >
        {children}
      </button>
    </GlassCard>
  )
}

const QuestRowCol = ({
  children,
  align = "left",
}: PropsWithChildren & { align?: "left" | "right" }) => {
  return (
    <div
      className={classNames(
        "w-full text-left whitespace-nowrap text-ellipsis flex items-center",
        {
          "text-left": align === "left",
          "text-right": align === "right",
        }
      )}
    >
      {children}
    </div>
  )
}

type QuestRowProps = {
  quest: Quest
  reward: Reward
  isOpen?: boolean
  className?: string
  creatorEns?: EnsData
  onClick?: (questId: string) => void
}

export default function QuestRow({
  quest,
  reward,
  isOpen = false,
  className,
  creatorEns,
  onClick,
}: QuestRowProps) {
  const { status, questEnd, iconOption } = quest
  const { allocations, allocationsClaimed  } = reward

  const { amount, tokenImage, tokenSymbol, decimals } = reward

  const handleOnClick = useCallback(() => {
    if (typeof onClick === "function") {
      onClick(quest.id || '')
    }
  }, [onClick, quest.id])

  const isQuestActive = [
    QuestStatus.ACTIVE,
    QuestStatus.CLAIMABLE,
    QuestStatus.REDEEMABLE,
  ].includes(status || '')

  const isQuestActionable = [
    QuestStatus.CLAIMABLE,
    QuestStatus.REDEEMABLE,
  ].includes(status || '')

  const shouldFadeOut = status === QuestStatus.EXPIRED

  const timeRemainingColumnContent = useMemo(() => {
    debugger
    if (
      isNonEmptyString(questEnd) &&
      (quest.status === QuestStatus.ACTIVE ||
        quest.status === QuestStatus.REDEEMABLE)
    ) {
      return <Countdown questEnd={questEnd} className="text-sm" />
    }

    return <StatusPill status={quest.status || ''} spacing="xs" size="sm" />
  }, [quest.status, questEnd])

  const ensName = creatorEns?.ens

  const addressOrEnsName = useMemo(
    () =>
      isNonEmptyString(ensName)
        ? truncateEnsName(ensName)
        : truncateEthAddress(quest.creatorAddress),
    [ensName, quest.creatorAddress]
  )

  const blockExplorerUrl = useMemo(() => {
    return generateBlockExplorerUrl(
      quest.network,
      "address",
      quest.creatorAddress
    )
  }, [quest.creatorAddress, quest.network])

  const isNft = isErc1155(reward.type)
  
  return (
    <QuestRowContainer
      onClick={handleOnClick}
      highlight={isQuestActionable}
      className={classNames(className, { "opacity-50": shouldFadeOut })}
    >
      <div className="w-full flex items-center justify-between">
        <Flex
          align="center"
          className="gap-3 md:gap-6 text-left w-full md:w-1/3"
        >
          {isQuestActive ? (
            <AnimatedLiveIndicator />
          ) : (
            <div className="w-1 h-1 rounded-full" />
          )}

          <Flex align="center" className="gap-3 md:gap-4 w-full truncate">
            <ErrorBoundary fallbackRender={() => null}>
              <QuestAndNetworkIcons
                chainId={String(NETWORK_TO_CHAIN_ID[quest.network])}
                questImage={iconOption || ''}
              />
            </ErrorBoundary>
            <Flex direction="column" className="w-full min-w-0">
              <QuestName highlight={isQuestActionable}>{quest.name}</QuestName>

              <Flex align="center" justify="between" className="md:hidden">
                <div className="flex items-center gap-3 w-full truncate">
                  <ExternalLink
                    className="hover:underline text-xs"
                    href={blockExplorerUrl}
                  >
                    {addressOrEnsName}
                  </ExternalLink>

                  <RewardsRemaining
                    value={allocationsClaimed ||0}
                    max={allocations || 0}
                  />
                </div>
              </Flex>
            </Flex>
            <div className="md:hidden">
              <RewardAmountWithSymbol
                isNft={isNft}
                tokenAmount={amount}
                tokenSymbol={tokenSymbol}
                decimals={decimals ?? 18}
              />
            </div>
          </Flex>
        </Flex>

        <div className="w-2/3 gap-3 hidden md:grid grid-cols-4">
          <QuestRowCol>
            <ExternalLink
              className="hover:underline truncate"
              href={blockExplorerUrl}
            >
              {addressOrEnsName}
            </ExternalLink>
          </QuestRowCol>

          <QuestRowCol>
            <RewardAmountWithSymbol
              isNft={isNft}
              tokenAmount={amount}
              tokenSymbol={tokenSymbol}
              rewardIcon={tokenImage}
              decimals={decimals ?? 18}
            />
          </QuestRowCol>

          <QuestRowCol>
            <RewardsRemainingWithProgressBar
              value={allocationsClaimed || 0}
              max={allocations || 0}
              variant={shouldFadeOut ? "muted" : undefined}
            />
          </QuestRowCol>

          <QuestRowCol align={isQuestActive ? "left" : "right"}>
            {timeRemainingColumnContent}
          </QuestRowCol>
        </div>
      </div>

      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={SPRING_TRANSITION}
        className={classNames("hidden md:block", {
          "text-secondary-highlight": isQuestActionable,
          "text-white/20": !isQuestActionable,
        })}
      >
        <BsChevronRight size={24} />
      </motion.div>
    </QuestRowContainer>
  )
}
