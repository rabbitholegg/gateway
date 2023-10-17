import useWallet from "../../hooks/useWallet"
import Button from "../Button/Button"
import ConnectWalletButton from "../ConnectWalletButton/ConnectWalletButton"
import Flex from "../Flex"
import QuestStep from "./QuestStep"
import { QuestStepState } from "./useQuestState"

type QuestConnectStepProps = {
  signedInStepStatus: QuestStepState
  connectStepStatus: QuestStepState
}

export enum ConnectStepState {
  SIGNIN = "signin",
  CONNECT = "connect",
}

export default function QuestConnectStep({
  signedInStepStatus,
  connectStepStatus,
}: QuestConnectStepProps) {
  const { openSIWE } = useWallet()

  const stepState =
    connectStepStatus === QuestStepState.ACTIVE
      ? ConnectStepState.CONNECT
      : ConnectStepState.SIGNIN

  if (stepState === ConnectStepState.SIGNIN) {
    return (
      <QuestStep label="Sign In" status={signedInStepStatus}>
        <Flex align="center" className="text-lg gap-2 mb-3 text-primary-text">
          Sign in to your wallet to complete this quest
        </Flex>

        <Button
          size="xs"
          spacing="sm"
          color="primary"
          variant="gradient"
          uppercase
          onClick={() => openSIWE()}
        >
          Sign in
        </Button>
      </QuestStep>
    )
  }

  return (
    <QuestStep label="Connect Wallet" status={connectStepStatus}>
      <Flex align="center" className="text-lg gap-2 mb-3 text-primary-text">
        Connect your wallet to complete this quest
      </Flex>

      <ConnectWalletButton
        hasAvatar={false}
        size="xs"
        spacing="sm"
        color="primary"
        variant="gradient"
      />
    </QuestStep>
  )
}
