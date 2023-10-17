import { Avatar, ConnectKitButton } from "connectkit"

import { isNonEmptyString, truncateEthAddress } from "@/lib"
import Button from "../Button/Button"
import LoadingButton, { type LoadingButtonProps } from "../Button/LoadingButton"
import ClientOnly from "../ClientOnly/ClientOnly"

type ConnectWalletButtonProps = LoadingButtonProps & {
  hasAvatar?: boolean
}

export default function ConnectWalletButton({
  hasAvatar = true,
  ...props
}: ConnectWalletButtonProps) {
  return (
    <ClientOnly>
      <ConnectKitButton.Custom>
        {({ isConnecting, isConnected, show, address, ensName }) => {
          if (isConnected) {
            return (
              <Button onClick={show} {...props}>
                {hasAvatar && <Avatar address={address} size={20} />}
                <span>
                  {isNonEmptyString(ensName)
                    ? ensName
                    : truncateEthAddress(address)}
                </span>
              </Button>
            )
          }

          return (
            <LoadingButton onClick={show} loading={isConnecting} {...props}>
              Connect Wallet
            </LoadingButton>
          )
        }}
      </ConnectKitButton.Custom>
    </ClientOnly>
  )
}
