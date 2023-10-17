import Image from "next/image"
import { formatUnits } from "viem"

import { cn, isNonEmptyString } from "@/lib"
import Flex from "../Flex"

type RewardAmountWithSymbolProps = {
  isNft?: boolean
  tokenAmount?: string | number
  tokenSymbol?: string | null
  rewardIcon?: string | null
  decimals?: number
  className?: string
}

export default function RewardAmountWithSymbol({
  isNft = false,
  tokenAmount,
  tokenSymbol,
  rewardIcon,
  decimals = 18,
  className,
}: RewardAmountWithSymbolProps) {
  const formattedTokenAmount = tokenAmount ? String(tokenAmount) : null
  const label = isNft ? "NFT" : tokenSymbol
  const showUnits = formattedTokenAmount != null && !isNft

  return (
    <Flex
      align="center"
      className={cn("gap-1 md:gap-2 inline-flex max-w-full w-full", className)}
    >
      {isNonEmptyString(rewardIcon) && (
        <div className="flex-shrink-0 relative w-3 h-3 md:w-4 md:h-4">
          <Image
            className="rounded-full"
            fill
            src={rewardIcon}
            alt="reward_icon"
          />
        </div>
      )}

      <div className="flex uppercase text-primary-text truncate text-xs md:text-sm gap-1 w-full">
        {showUnits && (
          <span>{formatUnits(BigInt(formattedTokenAmount), decimals)}</span>
        )}
        <span
          className={cn("text-secondary-text", {
            ["italic font-bold"]: isNft,
          })}
        >
          {label}
        </span>
      </div>
    </Flex>
  )
}
