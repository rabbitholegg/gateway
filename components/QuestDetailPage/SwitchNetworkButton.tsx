import { useCallback } from "react"
import { useSwitchNetwork } from "wagmi"

import { showErrorToast } from "@/lib/showCustomToast"
import { type ButtonProps } from "../Button/Button"
import LoadingButton from "../Button/LoadingButton"

type SwitchNetworkButtonProps = Omit<
  ButtonProps,
  "onClick" | "trackEventName"
> & {
  targetChainId: number
}

export default function SwitchNetworkButton({
  targetChainId,
  ...rest
}: SwitchNetworkButtonProps) {
  const { switchNetworkAsync, isLoading } = useSwitchNetwork()

  const handleClick = useCallback(async () => {
    // Some wallet apps do not support programmatic network switching and switchNetwork will be undefined.
    // see https://wagmi.sh/react/hooks/useSwitchNetwork#usage
    if (typeof switchNetworkAsync === "function") {
      try {
        await switchNetworkAsync(targetChainId)
      } catch (err) {

        showErrorToast({
          title: "Unable to switch network",
          body: "Your wallet may not support automatic network switching. Please change network manually.",
        })
      }

      return
    }

    showErrorToast({
      title: "Unable to switch network",
      body: "Your wallet may not support automatic network switching. Please change network manually.",
    })
  }, [switchNetworkAsync, targetChainId])

  if (targetChainId == null) {
    return (
      <LoadingButton {...rest} disabled>
        Missing chainId
      </LoadingButton>
    )
  }

  return (
    <LoadingButton
      onClick={handleClick}
      loading={isLoading}
      {...rest}
    >
      Switch Network
    </LoadingButton>
  )
}
