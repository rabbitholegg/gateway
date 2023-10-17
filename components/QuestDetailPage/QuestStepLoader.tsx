import Skeleton from "../Skeleton/Skeleton"
import QuestStep from "./QuestStep"

export default function QuestStepLoader() {
  return (
    <QuestStep>
      <Skeleton count={2} />
      <div className="mt-3">
        <Skeleton width={150} height={30} />
      </div>
    </QuestStep>
  )
}
