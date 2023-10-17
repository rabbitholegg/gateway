import { type PropsWithChildren } from "react"
import { useNetwork } from "wagmi"

import { isValidAddress } from "@/lib"
import useWallet from "../../hooks/useWallet"
import LoadingButton, { type LoadingButtonProps } from "../Button/LoadingButton"
import ConnectWalletButton from "../ConnectWalletButton/ConnectWalletButton"
import SwitchNetworkButton from "../QuestDetailPage/SwitchNetworkButton"

export type ContractInteractionButtonProps = PropsWithChildren<
  LoadingButtonProps & { chainId: number }
>

/**
 * A contract interaction button is a Button that requires the user both has their wallet connected and that their
 * active network matches the given `chainId`. If their wallet is not connected the button converts to a `Connect
 * Wallet` button and if their `chainId` is incorrect it converts to a `SwitchNetwork` button.
 */
export default function ContractInteractionButton({
  chainId,
  children,
  loading,
  onClick,
  ...buttonProps
}: ContractInteractionButtonProps) {
  const { address } = useWallet()
  const { chain } = useNetwork()

  const hasValidAddress = isValidAddress(address)
  const chainIdMatches = chain?.id === Number(chainId)

  if (!hasValidAddress) {
    return <ConnectWalletButton {...buttonProps} />
  }

  if (!chainIdMatches) {
    return <SwitchNetworkButton targetChainId={chainId} {...buttonProps} />
  }

  return (
    <LoadingButton onClick={onClick} loading={loading} {...buttonProps}>
      {children}
    </LoadingButton>
  )
}
