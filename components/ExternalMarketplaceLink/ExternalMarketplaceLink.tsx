import { useMemo } from "react"

import ExternalLinkButton, {
  type ExternalLinkButtonProps,
} from "../Button/ExternalLinkButton"
import { getNFTMarketplaceUrl } from "@/lib"

type ExternalMarketplaceLinkProps = Omit<ExternalLinkButtonProps, "href"> & {
  networkName: string
  contractAddress: string
  tokenId: string
}

export default function ExternalMarketplaceLink({
  networkName,
  contractAddress,
  tokenId,
  ...rest
}: ExternalMarketplaceLinkProps) {
  const href = useMemo(
    () => getNFTMarketplaceUrl(networkName, contractAddress, tokenId),
    [contractAddress, networkName, tokenId]
  )

  return (
    <ExternalLinkButton href={href} size="xs" fullWidth uppercase {...rest}>
      View on Opensea
    </ExternalLinkButton>
  )
}
