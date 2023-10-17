import {
  cn,
  formatRewardsRemaining,
  generateBlockExplorerUrl,
  isErc1155,
  isNonEmptyString,
  isValidAddress,
  networkStringToChainId,
  networkStringToName,
  truncateEnsName,
  truncateEthAddress
} from "@/lib"
import { isFuture, minutesToMilliseconds } from "date-fns"
import Head from "next/head"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useMemo } from "react"
import { FormattedNumber } from "react-intl"
import { useContractRead } from "wagmi"

import erc20Quest from "@/lib/abi/erc20-quest"
import { getQuestActionNetworkDetails } from "@/lib/getQuestActionNetworkDetails"
import useGetEnsAddresses from "@/lib/hooks/useGetEnsAddresses"
import { QuestStatus } from "@/lib/types"
import { useGetQuestById } from "../../data/hooks/getQuestById/useGetQuestById"
import Button from "../Button/Button"
import ExternalLinkButton from "../Button/ExternalLinkButton"
import ReportIssueButton from "../Button/ReportIssueButton"
import ChainIcon from "../ChainIcon/ChainIcon"
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary"
import { ErrorCard } from "../ErrorCard/ErrorCard"
import ExternalLink from "../ExternalLink/ExternalLink"
import Flex from "../Flex"
import GlobalErrorFallback from "../GlobalErrorFallback/GlobalErrorFallback"
import Layout from "../Layout/Layout"
import ClaimRewardStep from "../QuestDetailPage/ClaimRewardStep"
import QuestActionsPopover from "../QuestDetailPage/QuestActionsPopover"
import QuestConnectStep from "../QuestDetailPage/QuestConnectStep"
import QuestDetailCallout from "../QuestDetailPage/QuestDetailCallout"
import QuestHeaderStatus from "../QuestDetailPage/QuestHeaderStatus"
import QuestNetworkStep from "../QuestDetailPage/QuestNetworkStep"
import { QuestRedemptions } from "../QuestDetailPage/QuestRedemptions"
import StartQuestStep from "../QuestDetailPage/StartQuestStep"
import useQuestState from "../QuestDetailPage/useQuestState"
import RewardAmountWithSymbol from "../RewardAmountWithSymbol/RewardAmountWithSymbol"
import Skeleton from "../Skeleton/Skeleton"
import { TerminalLogoIcon } from "../TerminalLogo/TerminalLogo"

const QuestDetailsControls = ({ questId }: { questId: string }) => {
  const { data: quest } = useGetQuestById({ questId })

  const router = useRouter()

  const showReportIssueButton =
    quest?.status === QuestStatus.ACTIVE ||
    quest?.status === QuestStatus.REDEEMABLE ||
    (quest?.status === QuestStatus.COMPLETED &&
      isFuture(new Date(quest.questEnd!)))

  return (
    <div className="flex-col-reverse gap-4 sm:flex-row sm:items-center justify-center sm:justify-between overflow-x-auto py-4 px-7 hidden md:flex">
      <div className="items-center justify-between hidden w-full gap-4 md:flex">
        <Button
          color="secondary"
          className="mr-auto w-fit"
          spacing="sm"
          size="sm"
          onClick={() => router.push("/quests")}
        >
          <i className="fa-solid fa-angle-left mr-1" /> All Quests
        </Button>
        <div className="flex gap-2 items-center">
          <ExternalLinkButton
            color="secondary"
            className="w-fit"
            spacing="sm"
            size="sm"
            href={`https://terminal.rabbithole.gg/quests/${questId}`}
          >
            <TerminalLogoIcon size={18} /> View on Terminal
          </ExternalLinkButton>
          {showReportIssueButton ? (
            <ReportIssueButton color="secondary" questId={questId} />
          ) : null}
          <QuestActionsPopover questId={questId} />
        </div>
      </div>
    </div>
  )
}

function QuestDetailsHeader({ questId }: { questId: string }) {
  const { data: quest, isLoading } = useGetQuestById({ questId })

  return (
    <div className="bg-backdrop w-full p-4 md:p-8 flex flex-col gap-4 z-20">
      {isLoading && (
        <div>
          <Skeleton height={24} width="100%" />
          <Skeleton height={14} width="100%" />
        </div>
      )}

      {!isLoading && (
        <div className="flex pt-[18px] flex-col items-center sm:flex-row sm:items-center sm:pt-2 sm:justify-start gap-5">
          {quest && (
            <div className="relative">
              <div className="w-14 h-14 rounded-full overflow-clip relative">
                <Image
                  src={quest.iconOption}
                  fill
                  alt="task_icon"
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 z-20">
                <ChainIcon
                  id={networkStringToChainId(quest?.task?.network)}
                />
              </div>
            </div>
          )}

          <div className="flex flex-col">
            <p className="text-secondary-text text-xs text-center sm:text-left sm:mb-2">
              {networkStringToName(quest?.task?.network)}
            </p>
            <p className="w-full text-center text-primary-text text-2xl font-semibold sm:text-left">
              {quest?.name}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

const questDetailsCardClasses =
  "rounded-lg border border-primary-stroke px-5 py-4"

function QuestDetailsContent({ questId }: { questId: string }) {
  const { data: quest, isLoading, error } = useGetQuestById({ questId })

  const questContractAddress = isValidAddress(quest?.contractAddress)
    ? quest?.contractAddress
    : undefined

  const { data: isPaused } = useContractRead({
    abi: erc20Quest,
    address: questContractAddress ?? "0x",
    functionName: "paused",
    chainId: networkStringToChainId(quest?.network),
    enabled: isValidAddress(quest?.contractAddress),
    staleTime: minutesToMilliseconds(1),
  })

  const creatorAddress = useMemo(() => {
    const address = quest?.creatorAddress
    if (isValidAddress(address)) {
      return [address]
    }
    return []
  }, [quest])

  const { data: creatorEnsAddressData } = useGetEnsAddresses(creatorAddress)

  const addressOrEnsName = useMemo(() => {
    const ensAddress = creatorEnsAddressData?.[creatorAddress[0]]?.ens
    return isNonEmptyString(ensAddress)
      ? truncateEnsName(ensAddress)
      : truncateEthAddress(creatorAddress[0])
  }, [creatorAddress, creatorEnsAddressData])

  const questCreatorBlockExplorerUrl = generateBlockExplorerUrl(
    quest?.network || "eth-mainnet",
    "address",
    creatorAddress[0]
  )

  if (error || (!isLoading && quest == null)) {
    return (
      <ErrorCard
        title="Could not load rewards"
        error={error || new Error("quest is null")}
      />
    )
  }

  const isNft = isErc1155(quest?.reward.type)

  return (
    <>
      {isPaused && (
        <ErrorBoundary
          FallbackComponent={GlobalErrorFallback}
          id="QuestDetailCallout"
        >
          <QuestDetailCallout variant="paused" />
        </ErrorBoundary>
      )}
      <div className="bg-white rounded-xl border border-primary-stroke p-5 flex flex-col h-fit">
        <div className="text-sm font-semibold text-primary-text pb-4">
          Details
        </div>
        <div className="grid grid-cols-2 gap-2 2xl:grid-cols-4 2xl:gap-4">
          <div className={questDetailsCardClasses}>
            <div className="text-sm font-semibold text-secondary-text mb-2">
              Created By
            </div>
            {isLoading && <Skeleton height={14} width="100%" />}
            {!isLoading && (
              <div className="text-primary-text">
                <ExternalLink
                  href={questCreatorBlockExplorerUrl}
                  className="underline"
                >
                  {addressOrEnsName}
                </ExternalLink>
              </div>
            )}
          </div>

          <div className={questDetailsCardClasses}>
            <div className="text-sm font-semibold text-secondary-text mb-2">
              Reward
            </div>
            {isLoading && <Skeleton height={14} width="100%" />}
            {!isLoading && (
              <div className="flex items-center">
                <RewardAmountWithSymbol
                  isNft={isNft}
                  rewardIcon={quest.reward.tokenImage}
                  tokenAmount={quest.reward.amount}
                  tokenSymbol={quest.reward.tokenSymbol}
                  decimals={quest.reward.decimals ?? 18}
                />
              </div>
            )}
          </div>

          <div className={questDetailsCardClasses}>
            <div className="text-sm font-semibold text-secondary-text mb-2">
              Rewards Remaining
            </div>
            {isLoading && <Skeleton height={14} width="100%" />}
            {!isLoading && (
              <div className="text-primary-text">
                <FormattedNumber
                  value={formatRewardsRemaining(
                    quest.reward.allocations,
                    quest.reward.allocationsClaimed
                  )}
                />{" "}
                <span className="text-secondary-text">
                  / <FormattedNumber value={quest.reward.allocations} />
                </span>
              </div>
            )}
          </div>

          <div className={questDetailsCardClasses}>
            <div
              className={cn("text-sm font-semibold text-secondary-text mb-2", {
                "text-secondary-highlight":
                  quest?.status != undefined &&
                  quest?.status !== QuestStatus.EXPIRED,
                "text-app-red":
                  quest?.status != undefined &&
                  quest?.status === QuestStatus.EXPIRED,
              })}
            >
              Time Remaining
            </div>
            {isLoading && <Skeleton height={14} width="100%" />}
            {!isLoading && <QuestHeaderStatus questId={questId} />}
          </div>
        </div>
      </div>
    </>
  )
}

const QuestTasks = ({ questId }: { questId: string }) => {
  const { data: questById } = useGetQuestById({ questId })
  const network = questById
    ? getQuestActionNetworkDetails(questById)
    : undefined

  const questContractAddress = isValidAddress(questById?.contractAddress)
    ? questById?.contractAddress
    : undefined

  const { data: isPaused } = useContractRead({
    abi: erc20Quest,
    address: questContractAddress ?? "0x",
    functionName: "paused",
    chainId: networkStringToChainId(questById?.network),
    enabled: isValidAddress(questById?.contractAddress),
    staleTime: minutesToMilliseconds(1),
  })

  const {
    connectStepStatus,
    signedInStepStatus,
    networkStepStatus,
    startStepStatus,
    redeemStepStatus,
  } = useQuestState(questById?.status, String(network?.chainId))

  const isExpired = questById?.status === QuestStatus.EXPIRED

  if (!network || (!isExpired && isPaused)) {
    return null
  }

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      className="gap-4 w-full p-5 border border-primary-stroke rounded-xl bg-white"
    >
      {isExpired && (
        <ErrorBoundary
          FallbackComponent={GlobalErrorFallback}
          id="QuestDetailCallout"
        >
          <QuestDetailCallout variant="expired" />
        </ErrorBoundary>
      )}

      <ErrorBoundary
        FallbackComponent={GlobalErrorFallback}
        id="QuestConnectStep"
      >
        <QuestConnectStep
          connectStepStatus={connectStepStatus}
          signedInStepStatus={signedInStepStatus}
        />
      </ErrorBoundary>

      <ErrorBoundary
        FallbackComponent={GlobalErrorFallback}
        id="QuestNetworkStep"
      >
        <QuestNetworkStep
          network={network.name}
          networkStepStatus={networkStepStatus}
        />
      </ErrorBoundary>

      <ErrorBoundary
        FallbackComponent={GlobalErrorFallback}
        id="StartQuestStep"
      >
        <StartQuestStep questId={questId} stepStatus={startStepStatus} />
      </ErrorBoundary>

      <ErrorBoundary
        FallbackComponent={GlobalErrorFallback}
        id="ClaimRewardStep"
      >
        <ClaimRewardStep questId={questId} stepStatus={redeemStepStatus} />
      </ErrorBoundary>
    </Flex>
  )
}

const QuestsDetailsPage = ({
  questId,
  ogImageUrl,
}: {
  questId: string
  ogImageUrl: string
}) => {
  const { data: questForUser } = useGetQuestById({ questId })
  const isIneligible = questForUser?.eligibility?.eligible === false

  return (
    <Layout
      pageTitle="Quest Details"
      header={<QuestDetailsControls questId={questId} />}
    >
      <Head>
        <meta property="image" key="image" content={ogImageUrl} />
        <meta
          property="twitter:image:src"
          key="twitter:image:src"
          content={ogImageUrl}
        />
        <meta property="og:image" key="og:image" content={ogImageUrl} />
      </Head>

      <ErrorBoundary
        FallbackComponent={GlobalErrorFallback}
        id="QuestsDetailsPageContent"
      >
        <div className="h-full grid grid-rows-[auto_1fr]">
          <QuestDetailsHeader questId={questId} />

          <div className="grid lg:grid-rows-1 grid-cols-1 lg:grid-cols-[1fr_400px] gap-4 px-4 pb-4">
            <div className="flex flex-col flex-grow flex-shrink-0 w-full gap-4">
              {isIneligible && <QuestDetailCallout variant="ineligible" />}
              <QuestDetailsContent questId={questId} />
              {!isIneligible && <QuestTasks questId={questId} />}
            </div>

            <div className="flex flex-col gap-4 max-w-full lg:max-w-[400px]">
              <QuestRedemptions questId={questId} />
            </div>
          </div>
        </div>
      </ErrorBoundary>
    </Layout>
  )
}

export default QuestsDetailsPage
