import {
  cn,
  generateBlockExplorerUrl,
  getBlockie,
  isNonEmptyString,
  truncateEnsName,
  truncateEthAddress,
} from "@/lib"
import useGetEnsAddresses from "@/lib/hooks/useGetEnsAddresses"
import useGetParticipantsByQuestId from "@/lib/hooks/useGetParticipantsByQuestId"
import useSearchParticipantsByQuestId, { isValidAddressSearchQuery } from "@/lib/hooks/useSearchParticipantsByQuestId"
import { EnsData } from "@/services/ens"
import { QuestParticipant } from "@/services/questService"
import { useCallback, useMemo, useState } from "react"
import { FaArrowDown } from "react-icons/fa"
import AutoSizer from "react-virtualized-auto-sizer"
import { FixedSizeList as List } from 'react-window'
import { useDebouncedCallback } from "use-debounce"
import { useGetQuestById } from "../../data/hooks/getQuestById/useGetQuestById"
import Button from "../Button/Button"
import { ErrorCard } from "../ErrorCard/ErrorCard"
import ExternalLink from "../ExternalLink/ExternalLink"
import QueryHandler from "../QueryHandler/QueryHandler"
import Skeleton from "../Skeleton/Skeleton"
import TextInputWithIcon from "../TextInputWithIcon/TextInputWithIcon"

function ParticipantRow({
  index,
  participant,
  participantEns,
  isLast,
  network,
}: {
  index: number
  participant: QuestParticipant
  participantEns?: EnsData
  isLast: boolean
  network?: string
}) {
  const ensName = participantEns?.ens
  const ensAvatar = participantEns?.avatar

  const addressOrEnsName = useMemo(
    () =>
      isNonEmptyString(ensName)
        ? truncateEnsName(ensName)
        : truncateEthAddress(participant.address),
    [ensName, participant.address]
  )

  const blockExplorerUrl = useMemo(() => {
    return generateBlockExplorerUrl(
      network || "mainnet",
      "address",
      participant.address
    )
  }, [participant.address, network])

  const avatarSrc = useMemo(() => {
    if (isNonEmptyString(ensAvatar)) {
      return ensAvatar
    }
    return getBlockie(participant.address)
  }, [ensAvatar, participant.address])

  return (
    <div
      className={cn("w-full flex items-center py-2 gap-4", {
        ["border-primary-stroke border-b"]: !isLast,
      })}
    >
      <div className="flex items-center w-20 text-sm">{index + 1}</div>

      <div className="flex items-center gap-4 w-1/2">
        <img
          src={avatarSrc}
          alt={participant.address}
          width={32}
          height={32}
          className="rounded-full"
        />
        <ExternalLink href={blockExplorerUrl} className="underline text-sm">
          {addressOrEnsName}
        </ExternalLink>
      </div>
    </div>
  )
}

export default function ParticipantsList({
  participants,
  network,
}: {
  participants: QuestParticipant[]
  network?: string
}) {
  const participantAddresses = useMemo(
    () => participants.map((participant) => participant.address),
    [participants]
  )
  const { data: participantEnsAddressData } =
    useGetEnsAddresses(participantAddresses)

  return (
    <div className="flex-1 w-full h-full border border-primary-stroke rounded-xl px-4 py-2">
      <AutoSizer>
        {({ height = 100, width = 100 }) => (
          <List
            height={height}
            width={width}
            itemCount={participants.length}
            itemSize={57}
          >
            {({ index, style }) => {
              const isLast = index === participants.length - 1
              return (
                <div style={style}>
                  <ParticipantRow
                    index={index}
                    participant={participants[index]}
                    isLast={isLast}
                    network={network}
                    participantEns={
                      participantEnsAddressData?.[participants[index].address]
                    }
                  />
                </div>
              )
            }}
          </List>
        )}
      </AutoSizer>
    </div>
  )
}

export function QuestRedemptions({ questId }: { questId: string }) {
  const [search, setSearch] = useState("")
  const {
    data: allParticipants,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetParticipantsByQuestId({
    questId,
    status: ["completed", "claimable"],
    pageSize: 50,
  })
  const { data: quest } = useGetQuestById({ questId })

  const handleSearchAddressChange = useDebouncedCallback((value: string) => {
    setSearch(value)
  }, 250)

  const { data: searchParticipants } = useSearchParticipantsByQuestId({
    questId,
    queryAddress: search,
    pageSize: 50,
  })

  // Uses search results if there are any, otherwise uses the full list of participants
  const participants = useMemo(() => {
    if (allParticipants == null) {
      return []
    }

    const participants =
      searchParticipants != null
        ? searchParticipants.pages.flatMap((page) => page)
        : allParticipants.pages.flatMap((page) => page)

    return participants
  }, [allParticipants, searchParticipants])

  const isSearching = isValidAddressSearchQuery(search)
  const showLoadMoreButton =
    !isSearching && hasNextPage && participants.length > 0

  const onEmpty = useCallback(
    () => (
      <div className="flex-1 text-sm p-4 text-center h-full flex flex-col gap-1 items-center justify-center">
        {isSearching ? (
          <p className="text-primary-text font-semibold">
            No matching addresses
          </p>
        ) : (
          <>
            <p className="text-primary-text font-semibold">
              No one&apos;s completed this quest yet
            </p>
            <p className="text-secondary-text">
              The number and address of users who complete this quest will be
              shown here
            </p>
          </>
        )}
      </div>
    ),
    [isSearching]
  )
  const onSuccess = useCallback(
    (participants: QuestParticipant[]) => {
      return (
        <ParticipantsList
          participants={participants}
          network={quest?.network}
        />
      )
    },
    [quest?.network]
  )

  const onLoading = useCallback(() => {
    return (
      <div className="flex flex-col">
        <div className="py-3 px-4 border-b border-b-primary-outline">
          <div className="flex items-center gap-3">
            <Skeleton width={32} height={32} className="rounded-full" />
            <Skeleton width={100} height={16} count={1} />
          </div>
        </div>

        <div className="py-3 px-4">
          <div className="flex items-center gap-3">
            <Skeleton width={32} height={32} className="rounded-full" />
            <Skeleton width={100} height={16} count={1} />
          </div>
        </div>
      </div>
    )
  }, [])

  return (
    <div className="w-full h-full bg-white rounded-xl border border-primary-stroke p-5 flex flex-col text-black">
      <div className="text-sm font-semibold text-primary-text pb-4">
        Participants
      </div>
      <div className="flex gap-5">
        <p className="flex gap-1 items-center">
          <span className="text-sm font-semibold text-primary-text">
            {quest?.reward.allocationsClaimed}
          </span>
          <span className="text-sm text-secondary-text">Total</span>
        </p>
        <div className="flex-1">
          <TextInputWithIcon onChange={handleSearchAddressChange} />
        </div>
      </div>

      {participants.length > 0 && (
        <div className="w-full flex items-center justify-content-start pt-6 pb-2 px-2 gap-4">
          <div className="w-20 text-xs truncate">
            <p>Position</p>
          </div>
          <div className="flex-1 text-xs truncate">
            <p>Address</p>
          </div>
        </div>
      )}

      <div className="flex flex-1 flex-col gap-4 h-full min-h-[100px]">
        <QueryHandler
          data={participants}
          isLoading={isLoading}
          error={error}
          onEmpty={onEmpty}
          onSuccess={onSuccess}
          onLoading={onLoading}
          onError={(error: any) => (
            <ErrorCard title="Could not load participants" error={error} />
          )}
        />
        {showLoadMoreButton && (
          <Button
            className="w-full gap-2"
            variant="outline"
            color="tertiary"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            {!isFetchingNextPage && <FaArrowDown />}
            More
          </Button>
        )}
      </div>
    </div>
  )
}
