import { FaBug } from "react-icons/fa"

import CenteredContent from "../CenteredContent/CenteredContent"
import Flex from "../Flex"
import Typography from "../Typography"

type ErrorStateProps = {
  error?: unknown
  title?: string
  centerVertically?: boolean
}

const defaultTitle = "There was an error."

export default function ErrorState({
  error,
  centerVertically = false,
  title = defaultTitle,
}: ErrorStateProps) {
  const isError = error instanceof Error

  return (
    <CenteredContent centerVertically={centerVertically}>
      <Flex direction="column" align="center" className="gap-2">
        <FaBug size={48} />
        <Typography variant="title3" className="text-center">
          {title}
        </Typography>
        {isError && (
          <code className="p-4 bg-black/20 rounded-xl block">
            <Typography variant="caption" className="text-center">
              {error.message}
            </Typography>
          </code>
        )}
      </Flex>
    </CenteredContent>
  )
}
