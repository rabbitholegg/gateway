import CenteredContent from "../CenteredContent/CenteredContent"
import ConnectWalletButton from "../ConnectWalletButton/ConnectWalletButton"
import EmptyState from "../EmptyState/EmptyState"

const defaultText = "To use Quest Gateway you need a valid wallet"

type WalletRequiredProps = {
  text?: string
}

export default function WalletRequired({
  text = defaultText,
}: WalletRequiredProps) {
  return (
    <CenteredContent centerVertically>
      <EmptyState title="Please connect your wallet" body={text}>
        <ConnectWalletButton size="sm" variant="gradient" color="primary" />
      </EmptyState>
    </CenteredContent>
  )
}
