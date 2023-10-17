import copy from "copy-to-clipboard"
import { useCallback, type MouseEvent } from "react"
import { BiCopy } from "react-icons/bi"

import { truncateEthAddress } from "@/lib"
import { showErrorToast, showSuccessToast } from "@/lib/showCustomToast"
import Button, { type ButtonProps } from "../Button/Button"

type CopyAddressButtonProps = Omit<ButtonProps, "onClick" | "children"> & {
  address: string
  hideAddress?: boolean
}

export default function CopyAddressButton({
  address,
  hideAddress = false,
  ...rest
}: CopyAddressButtonProps) {
  const handleClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation()
      event.preventDefault()

      try {
        copy(address)
        showSuccessToast({ title: `Copied ${address}!` })
      } catch (_) {
        showErrorToast({ title: `Could not copy ${address} to clipboard.` })
      }
    },
    [address]
  )

  return (
    <Button {...rest} onClick={handleClick} title="Copy address to clipboard">
      {!hideAddress && truncateEthAddress(address)}
      <BiCopy className="opacity-50" />
    </Button>
  )
}
