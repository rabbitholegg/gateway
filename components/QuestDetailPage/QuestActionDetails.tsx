import { formatUnits } from "viem"

import { CHAIN_ID_TO_NETWORK, networkStringToName } from "@/lib"
import useGetTokenDetailsForContractAddress from "@/lib/hooks/useGetTokenDetailsForContractAddress"
import { EthAddress } from "@/lib/schemas"
import { BridgeActionDetail, QuestDetails } from "@/lib/schemas/quests"
import Skeleton from "../Skeleton/Skeleton"

const cardClasses = "rounded-lg border border-primary-stroke px-5 py-4"

const TokenDetails = ({
  contractAddress,
  chainId,
}: {
  contractAddress: EthAddress
  chainId: number
}) => {
  const { data: token, isLoading: isLoadingTokenDetails } =
    useGetTokenDetailsForContractAddress({
      contractAddress,
      chainId,
    })

  return (
    <div className={cardClasses}>
      <div className="text-sm font-semibold text-secondary-text mb-2">
        Token
      </div>
      {isLoadingTokenDetails ? (
        <Skeleton height={14} width="100%" />
      ) : (
        <div className="text-primary-text">{token?.symbol}</div>
      )}
    </div>
  )
}

const NetworkDetails = ({
  chainId,
  label = "Network",
}: {
  chainId: number
  label: string
}) => {
  const networkString = CHAIN_ID_TO_NETWORK[chainId]
  const networkName = networkStringToName(networkString)

  return (
    <div className={cardClasses}>
      <div className="text-sm font-semibold text-secondary-text mb-2">
        {label}
      </div>
      <div className="text-primary-text">{networkName}</div>
    </div>
  )
}

const AmountDetails = ({
  chainId,
  contractAddress,
  amount,
  label = "Amount",
}: {
  contractAddress: EthAddress
  chainId: number
  amount: string
  label: string
}) => {
  const { data: token, isLoading: isLoadingTokenDetails } =
    useGetTokenDetailsForContractAddress({
      contractAddress,
      chainId,
    })

  const formattedAmount = formatUnits(BigInt(amount), token?.decimals ?? 18)

  return (
    <div className={cardClasses}>
      <div className="text-sm font-semibold text-secondary-text mb-2">
        {label}
      </div>

      {isLoadingTokenDetails ? (
        <Skeleton height={14} width="100%" />
      ) : (
        <div className="text-primary-text">{formattedAmount}</div>
      )}
    </div>
  )
}

const BridgeActionDetails = (actionParams: BridgeActionDetail) => {
  const { sourceChainId, destinationChainId, tokenAddress, amount } =
    actionParams

  return (
    <div className="grid grid-cols-2 gap-2 2xl:grid-cols-4 2xl:gap-4">
      <TokenDetails
        chainId={sourceChainId}
        contractAddress={tokenAddress as EthAddress}
      />
      <AmountDetails
        chainId={sourceChainId}
        contractAddress={tokenAddress as EthAddress}
        amount={amount}
        label="Minimum Amount"
      />
      <NetworkDetails chainId={sourceChainId} label="Origination Network" />
      <NetworkDetails
        chainId={destinationChainId}
        label="Destination Network"
      />
    </div>
  )
}

const QuestActionDetails = ({ quest }: { quest?: QuestDetails }) => {
  switch (quest?.actionParams?.type) {
    case "bridge":
      return <BridgeActionDetails {...quest.actionParams.data} />
    default:
      return (
        <p className="text-black text-lg leading-tight">{quest?.description}</p>
      )
  }
}

export default QuestActionDetails
