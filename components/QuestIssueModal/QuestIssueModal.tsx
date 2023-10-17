import Modal from "../Modal/Modal"
import QuestIssueForm from "../QuestIssueForm/QuestIssueForm"

export default function QuestIssueModal({
  questId,
  open,
  setOpen,
}: {
  questId: string
  open: boolean
  setOpen: (modalOpen: boolean) => void
}) {
  return (
    <Modal open={open}>
      <Modal.Header className="text-center">Report an Issue</Modal.Header>
      <Modal.Body>
        <div className="flex flex-col gap-4">
          <QuestIssueForm questId={questId} setOpen={setOpen} />
        </div>
      </Modal.Body>
    </Modal>
  )
}
