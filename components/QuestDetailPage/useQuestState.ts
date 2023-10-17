import { useSIWE } from "connectkit"
import { useNetwork } from "wagmi"

import { QuestStatus } from "@/lib/types"
import useWallet from "../../hooks/useWallet"

export enum QuestStepState {
  PENDING = "pending",
  ACTIVE = "active",
  COMPLETE = "complete",
  INACTIVE = "inactive",
}

export default function useQuestState(
  status: string = QuestStatus.EXPIRED,
  chainId = "0"
) {
  const { isConnected, isMounted } = useWallet()
  const { isSignedIn, isLoading } = useSIWE()
  const { chain } = useNetwork()

  const isClaimable = status === QuestStatus.CLAIMABLE
  const isActive = status === QuestStatus.ACTIVE
  const isRedeemable = status === QuestStatus.REDEEMABLE

  // Connect and Sign In steps
  let connectStepStatus = QuestStepState.ACTIVE
  if (isConnected && isMounted) {
    connectStepStatus = QuestStepState.COMPLETE
  }

  let signedInStepStatus = QuestStepState.ACTIVE
  if (isSignedIn && !isLoading) {
    signedInStepStatus = QuestStepState.COMPLETE
  }

  const isConnectedAndSignedIn = [connectStepStatus, signedInStepStatus].every(
    (status) => status === QuestStepState.COMPLETE
  )

  // Network, Start, Redeem, and Claim steps
  let startStepStatus = QuestStepState.PENDING
  if (isConnectedAndSignedIn && isActive && chain?.id === Number(chainId)) {
    startStepStatus = QuestStepState.ACTIVE
  } else if (
    [
      QuestStatus.REDEEMABLE,
      QuestStatus.CLAIMABLE,
      QuestStatus.COMPLETED,
    ].includes(status)
  ) {
    startStepStatus = QuestStepState.COMPLETE
  }

  let networkStepStatus = QuestStepState.PENDING
  if (
    startStepStatus === QuestStepState.COMPLETE ||
    (isConnectedAndSignedIn &&
      startStepStatus === QuestStepState.ACTIVE &&
      chain?.id === Number(chainId))
  ) {
    networkStepStatus = QuestStepState.COMPLETE
  } else if (isConnectedAndSignedIn && status !== QuestStatus.EXPIRED) {
    networkStepStatus = QuestStepState.ACTIVE
  }

  let redeemStepStatus = QuestStepState.PENDING
  if (isConnectedAndSignedIn && isRedeemable) {
    redeemStepStatus = QuestStepState.ACTIVE
  } else if ([QuestStatus.CLAIMABLE, QuestStatus.COMPLETED].includes(status)) {
    redeemStepStatus = QuestStepState.COMPLETE
  }

  let claimStepStatus = QuestStepState.PENDING
  if (isConnectedAndSignedIn && isClaimable) {
    claimStepStatus = QuestStepState.ACTIVE
  } else if ([QuestStatus.COMPLETED].includes(status)) {
    claimStepStatus = QuestStepState.COMPLETE
  }

  return {
    connectStepStatus,
    signedInStepStatus,
    networkStepStatus,
    startStepStatus,
    redeemStepStatus,
    claimStepStatus,
  } as const
}
