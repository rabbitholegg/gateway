import { type NextApiRequest, type NextApiResponse } from "next"

import { isNotProduction } from "../../lib/constants"

const allowedMethods = ["GET"]

const disallowed = ["User-agent: *", "Disallow: /"].join("\n")
const allowed = ["User-agent: *", "Allow: /"].join("\n")

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (!allowedMethods.includes(req.method || "")) {
      return res.status(405).send({ message: "Method not allowed" })
    }

    res.setHeader("Content-Type", "text/plain")

    return res.status(200).send(isNotProduction ? disallowed : allowed)
  } catch (err) {
    console.error(err)
    return res.status(200).send(disallowed)
  }
}
