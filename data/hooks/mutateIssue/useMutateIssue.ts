import { createIssue } from "@/services/issueService"
import { useMutation } from "@tanstack/react-query"

type MutateIssueProps = {
  questId: string
  userId: string
  type: string
  description: string
}

export const useMutateIssue = () => {
  return useMutation({
    mutationKey: ["mutate-issue"],
    mutationFn: ({ questId, userId, type, description }: MutateIssueProps) => {
      return createIssue({
        questId,
        userId,
        type,
        description,
      })
    },
  })
}
