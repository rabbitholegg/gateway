import { zodResolver } from "@hookform/resolvers/zod"
import { useCallback, useState } from "react"
import { useForm } from "react-hook-form"
import { BsCheckCircleFill } from "react-icons/bs"
import { z } from "zod"

import { isNonEmptyString } from "@/lib"
import { showErrorToast } from "@/lib/showCustomToast"
import { useGetUser } from "../../data/hooks/getUser/useGetUser"
import { useMutateIssue } from "../../data/hooks/mutateIssue/useMutateIssue"
import useWallet from "../../hooks/useWallet"
import Button from "../Button/Button"
import LoadingButton from "../Button/LoadingButton"
import Flex from "../Flex/Flex"
import TextArea from "../Input/TextArea"
import Typography from "../Typography/Typography"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"

const issueTypes = [
  "Issue with protocol site",
  "Issue with RabbitHole app",
  "Issue claiming reward",
  "Reward amount",
  "Quest eligibility",
  "Other",
] as const

const QuestIssueFormValidationSchema = z.object({
  type: z.enum(issueTypes, { required_error: "Please select a type." }),
  description: z
    .string({ required_error: "Please enter a description." })
    .max(250, "Description must be less than 250 characters."),
})

type QuestIssueFormProps = {
  questId: string
  setOpen: (modalOpen: boolean) => void
}

export default function QuestIssueForm({
  questId,
  setOpen,
}: QuestIssueFormProps) {
  const { address } = useWallet()
  const { data: userData, isSuccess: isUserLoaded } = useGetUser(address)
  const { isLoading: isMutating, mutateAsync } = useMutateIssue()
  const [displayIssueSubmissionSuccess, setDisplayIssueSubmissionSuccess] =
    useState(false)

  const {
    handleSubmit,
    register,
    setValue,
    reset,
    watch,
    formState: { isValid, isDirty },
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: zodResolver(QuestIssueFormValidationSchema),
    defaultValues: {
      type: "",
      description: "",
    },
  })

  const isDisabled = isMutating || !isValid || !isDirty
  const fieldLength = watch("description").length

  const closeModal = useCallback(() => {
    reset()
    setOpen(false)
    setDisplayIssueSubmissionSuccess(false)
  }, [reset, setOpen])

  const mutateIssue = useCallback(
    async (formData: { type: string; description: string }) => {
      if (!userData?.user || !isNonEmptyString(questId)) {
        return
      }

      try {
        await mutateAsync({
          questId: questId,
          userId: userData.user,
          ...formData,
        })
        setDisplayIssueSubmissionSuccess(true)
      } catch (err) {
        const body = err instanceof Error ? err.message : ""
        showErrorToast({ title: "Issue failed to submit", body })
      }
    },
    [userData, questId, mutateAsync, setDisplayIssueSubmissionSuccess]
  )

  const submitIssue = useCallback(
    async (formData: { type: string; description: string }) => {
      mutateIssue(formData)
    },
    [mutateIssue]
  )

  if (displayIssueSubmissionSuccess) {
    return (
      <>
        <Flex
          direction="column"
          align="center"
          className="w-full gap-1 text-center"
        >
          <div className="aspect-square max-w-[40px] w-full relative mb-3">
            <BsCheckCircleFill
              color="#8044FF"
              size="3em"
              style={{
                background: "white",
                borderRadius: "50%",
              }}
            />
          </div>
          <Typography variant="title1">Issue successfully submitted</Typography>
          <Typography variant="body">
            Thank you for reporting the issue to the RabbitHole team.
          </Typography>
        </Flex>
        <Flex justify="end">
          <Button color="primary" variant="gradient" onClick={closeModal}>
            Close
          </Button>
        </Flex>
      </>
    )
  }

  return (
    <form
      className="flex flex-col w-full gap-1"
      onSubmit={handleSubmit(submitIssue)}
    >
      {isUserLoaded && (
        <>
          <Typography variant="body" className="text-left">
            Issue Type
          </Typography>
          <Select onValueChange={(value) => setValue("type", value)}>
            <SelectTrigger className="bg-base-100">
              <SelectValue placeholder="Select a type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {issueTypes.map((type) => (
                  <SelectItem key={type} value={type} className="bg-base-100">
                    {type}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Flex justify="between" className="w-full mt-3">
            <Typography variant="body" className="text-left">
              Description
            </Typography>
            <Typography variant="body" className="text-right">
              {fieldLength} / 250
            </Typography>
          </Flex>
          <TextArea
            placeholder="Explain your issue..."
            {...register("description")}
          />

          <Flex justify="end" className="mt-3">
            <Button color="tertiary" className="mr-2" onClick={closeModal}>
              Cancel
            </Button>
            <LoadingButton
              color="primary"
              variant="gradient"
              disabled={isDisabled}
              type="submit"
            >
              Submit
            </LoadingButton>
          </Flex>
        </>
      )}
    </form>
  )
}
