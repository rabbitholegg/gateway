import { useAtomValue } from "jotai"
import { useRouter, useSearchParams } from "next/navigation"
import { useCallback, useMemo } from "react"

import { isNonEmptyString } from "@/lib"
import { safelyParseRouterQuery } from "@/lib/safelyParseRouterQuery"
import { useGetQuests } from "../../data/hooks/getQuests"
import { statusFilterToApiMap } from "../../data/hooks/getQuests/useGetQuests"
import useWallet from "../../hooks/useWallet"
import { MIN_REWARD_VALUE_WEI } from "../../services/questService"
import LoadingButton from "../Button/LoadingButton"
import CenteredContent from "../CenteredContent/CenteredContent"
import ConnectWalletButton from "../ConnectWalletButton/ConnectWalletButton"
import EmptyState from "../EmptyState/EmptyState"
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary"
import ErrorState from "../ErrorState/ErrorState"
import Flex from "../Flex/Flex"
import GlobalErrorFallback from "../GlobalErrorFallback/GlobalErrorFallback"
import Layout from "../Layout/Layout"
import QuestsTable from "../QuestsTable/QuestsTable"
import Skeleton from "../Skeleton/Skeleton"
import QuestsPageControls from "./QuestsPageControls"
import {
  questsFiltersAtom,
  questsSearchAtom,
  showLowRewardQuestsAtom,
} from "./questsState"

const AllQuests = () => {
  const { address, isMounted, isConnected } = useWallet()
  const router = useRouter()
  const query = useSearchParams()
  const questId = safelyParseRouterQuery(query.get('quest') || '')

  const searchQuery = useAtomValue(questsSearchAtom)
  const filters = useAtomValue(questsFiltersAtom)
  const showLowRewardQuests = useAtomValue(showLowRewardQuestsAtom)

  const {
    data,
    isSuccess,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetQuests({
    address,
    taskNetwork: process.env.NEXT_PUBLIC_TASK_NETWORK,
    questNetwork: process.env.NEXT_PUBLIC_REWARD_NETWORK,
    enabled: isMounted,
    status: filters.flatMap((filter) => statusFilterToApiMap[filter]),
    ethValue: showLowRewardQuests ? "0" : MIN_REWARD_VALUE_WEI,
    searchQuery,
  })
  
  const flatQuests = useMemo(() => {
    if (data == null || data.pages.length === 0) return []
    return data.pages.flatMap((page) => page)
  }, [data])

  const handleRowClick = useCallback(
    (clickedQuestId: string) => {
      if (clickedQuestId === questId) {
        router.push(`/quests`)
      } else {
        router.push(`/quests/${clickedQuestId}`)
      }
    },
    [questId, router]
  )

  if (
    (isSuccess && data == null) ||
    (flatQuests.length === 0 && error != null)
  ) {
    return <ErrorState title="Could not load quests." error={error} />
  }

  const hasSearchValue = isNonEmptyString(searchQuery)
  const hasFiltersApplied = filters.length > 0 || hasSearchValue

  // Only show this state if there are filters applied and no quests match
  const showNothingFound = flatQuests.length === 0 && hasFiltersApplied

  // Show a different variation of empty state if there are no filters applied and no quests
  const showEmptyState = flatQuests.length === 0 && !hasFiltersApplied

  // Show the quests table only if there are no empty states
  const showQuestsTable = !showEmptyState && !showNothingFound

  return (
    <Flex direction="column" className="gap-4">
      {/* {onboardingCalloutConfig != null && (
        <div className="mb-4">
          <CalloutBar {...onboardingCalloutConfig} />
        </div>
      )} */}

      {/* {showFiltersAndSearch && (
        <Flex className="w-full gap-2" align="center" justify="between">
          <QuestsPageControls />
        </Flex>
      )} */}

      {isLoading && (
        <div className="flex flex-col gap-1">
          <Skeleton count={5} height={82} />
        </div>
      )}

      {!isLoading && (
        <ErrorBoundary
          FallbackComponent={GlobalErrorFallback}
          id="QuestsTableWrapper"
        >
          {showNothingFound && (
            <CenteredContent centerVertically>
              <EmptyState
                title="Nothing found"
                body={
                  hasSearchValue
                    ? `There were no quests that matched "${searchQuery}"`
                    : ""
                }
              />
            </CenteredContent>
          )}
          {showEmptyState && (
            <CenteredContent centerVertically>
              <EmptyState
                title="No active quests right now"
                body="Try checking back later"
              />
            </CenteredContent>
          )}
          {showQuestsTable && (
            <>
              <QuestsTable
                //@ts-ignore
                quests={flatQuests}
                onRowClick={handleRowClick}
                activeQuestId={questId}
              />
              {isConnected && hasNextPage && (
                <LoadingButton
                  loading={isFetchingNextPage}
                  onClick={() => fetchNextPage()}
                  variant="outline"
                  color="tertiary"
                >
                  Load More
                </LoadingButton>
              )}
            </>
          )}
        </ErrorBoundary>
      )}
    </Flex>
  )
}

const QuestsPageContentHeader = () => {
  const logoUri = process.env.NEXT_PUBLIC_THEME_BRAND_LOGO_URI

  return (
    <div className="flex-col-reverse gap-4 sm:flex-row sm:items-center justify-center sm:justify-between overflow-x-auto py-4 px-7">
      <div className="items-center justify-between hidden w-full gap-4 hidden md:flex">
        <QuestsPageControls />
        <ConnectWalletButton
          spacing="sm"
          color="primary"
          variant="gradient"
          className="w-full max-w-[fit-content]"
        />
      </div>

      {
        logoUri && (
          <div className="flex justify-center md:hidden">
            <img src={logoUri} className="max-w-[180px]" />
          </div>
        )
      }

    </div>
  )
}

const QuestsPage = () => {
  return (
    <Layout pageTitle="Quests" header={<QuestsPageContentHeader />}>
      <ErrorBoundary
        FallbackComponent={GlobalErrorFallback}
        id="QuestsPageContent"
      >
        <div className="px-4 pt-4 md:px-8 md:pt-8">
          <AllQuests />
        </div>
      </ErrorBoundary>
    </Layout>
  )
}

export default QuestsPage
