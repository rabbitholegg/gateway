import {
  NetworkName,
  generateBlockExplorerUrl,
  getBlockExplorerLabel,
  safelyGetNetworkDetails,
} from "@/lib"
import { BiLinkExternal } from "react-icons/bi"

import Button from "../Button/Button"
import ExternalLink from "../ExternalLink/ExternalLink"

type RewardButtonProps = {
  txHash: string
  questNetwork: NetworkName
}

export default function RewardButton({
  txHash,
  questNetwork,
}: RewardButtonProps) {
  const { name } = safelyGetNetworkDetails(questNetwork)
  const networkName = name.toLowerCase()
  const label = getBlockExplorerLabel(networkName)

  return (
    <ExternalLink
      href={generateBlockExplorerUrl(networkName, "tx", txHash)}
      preventPropagation
    >
      <Button variant="outline" uppercase className="w-52">
        {label}
        <BiLinkExternal />
      </Button>
    </ExternalLink>
  )
}
