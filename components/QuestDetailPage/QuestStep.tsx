import { AnimatePresence, motion } from "framer-motion"
import { isValidElement, type PropsWithChildren, type ReactNode } from "react"
import { GoCheck } from "react-icons/go"

import { isNonEmptyString } from "@/lib"
import Flex from "../Flex"
import GlassCard from "../GlassCard/GlassCard"
import { QuestStepState } from "./useQuestState"

type QuestStepCheckboxProps = {
  checked?: boolean
}

function QuestStepCheckbox({ checked = false }: QuestStepCheckboxProps) {
  return (
    <div className="w-5 h-5 flex items-center justify-center rounded-full border-2 border-white/30 flex-shrink-0">
      <AnimatePresence>
        {checked && (
          <motion.div
            initial={{ scale: 2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
          >
            <GoCheck color="#9FFEBA" size={18} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

type QuestStepProps = PropsWithChildren & {
  label?: string
  status?: QuestStepState
  hideCheckBox?: boolean
  image?: ReactNode
}

export default function QuestStep({
  label,
  image,
  status = QuestStepState.PENDING,
  children,
  hideCheckBox = false,
}: QuestStepProps) {
  const isComplete = status === QuestStepState.COMPLETE
  const isActive = status === QuestStepState.ACTIVE

  return (
    <GlassCard
      className={!isActive ? "opacity-30" : undefined}
      spacing="flush"
      raised={isActive}
    >
      {isValidElement(image) && (
        <div className="w-full bg-app-bg rounded-t-xl flex items-center justify-center">
          {image}
        </div>
      )}
      <Flex
        align={isComplete ? "center" : "start"}
        className="gap-4 w-full pl-4 pr-6 py-5"
      >
        <div className="w-full">
          {isNonEmptyString(label) && (
            <p className="text-sm text-black font-semibold tracking-wide">
              {label}
            </p>
          )}
          {isComplete ? null : <div className="mt-2">{children}</div>}
        </div>
        {!hideCheckBox && <QuestStepCheckbox checked={isComplete} />}
      </Flex>
    </GlassCard>
  )
}
