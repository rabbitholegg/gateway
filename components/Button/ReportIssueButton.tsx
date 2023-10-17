import { useState } from "react"
import { FiAlertTriangle } from "react-icons/fi"

import { useGetUser } from "../../data/hooks/getUser/useGetUser"
import useWallet from "../../hooks/useWallet"
import Button, { type ButtonProps } from "./Button"

type ReportIssueButtonProps = ButtonProps & {
  questId: string
}

export default function ReportIssueButton({
  questId,
  children,
  ...rest
}: ReportIssueButtonProps) {
  const { address } = useWallet()
  const { data: userData } = useGetUser(address)
  const [open, setOpen] = useState(false)

  if (!address || !userData || !questId) {
    return null
  }

  return (
    <>
      <Button
        size="sm"
        spacing="sm"
        color="tertiary"
        variant="flat"
        onClick={() => setOpen(true)}
        {...rest}
      >
        {children}
        <FiAlertTriangle size={14} color="rgba(110, 113, 126, 0.63)" /> Report
        Issue
      </Button>
      {/* <QuestIssueModal open={open} questId={questId} setOpen={setOpen} /> */}
    </>
  )
}
