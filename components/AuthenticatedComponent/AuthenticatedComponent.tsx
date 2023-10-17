import { useSIWE } from "connectkit"
import { useCallback } from "react"

import useWallet from "../../hooks/useWallet"
import LoadingButton from "../Button/LoadingButton"
import CenteredContent from "../CenteredContent/CenteredContent"
import EmptyState, { type EmptyStateProps } from "../EmptyState/EmptyState"
import WalletRequired from "../WalletRequired/WalletRequired"

type AuthenticatedComponentProps = Partial<EmptyStateProps> & {
  className?: string
}

export default function AuthenticatedComponent({
  title = "Please sign in to view this page.",
  body = "Sign in with your wallet to continue.",
  image = "sphere",
  children,
  className,
}: AuthenticatedComponentProps) {
  const { openSIWE, isConnected } = useWallet()
  const { isSignedIn, isLoading } = useSIWE()

  const handleSignIn = useCallback(() => {
    try {
      openSIWE(true)
    } catch (err) {
      console.error(err)
    }
  }, [openSIWE])

  if (!isConnected) {
    return <WalletRequired />
  }

  if (!isSignedIn) {
    return (
      <CenteredContent centerVertically className={className}>
        <EmptyState title={title} body={body}>
          <LoadingButton
            size="xs"
            variant="gradient"
            color="secondary"
            onClick={handleSignIn}
            loading={isLoading}
          >
            Sign In
          </LoadingButton>
        </EmptyState>
      </CenteredContent>
    )
  }

  return <>{children}</>
}
