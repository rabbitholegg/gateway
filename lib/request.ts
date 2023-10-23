import axios, { type AxiosRequestConfig } from "axios"
import { isEmpty } from "lodash"
import { type z } from "zod"
import { isNonEmptyString } from "./isNonEmptyString"

export default async function request<Request, Response extends {} | null>({
  config,
  requestSchema,
  responseSchema,
  identifier,
}: {
  config: AxiosRequestConfig
  requestSchema?: z.ZodType<Request>
  responseSchema: z.ZodType<Response>
  identifier: string
}): Promise<Response> {
  if (requestSchema != null && !isEmpty(config.data)) {
    requestSchema.parse(config.data)
  }

  try {
    const data = await axios
      .request({
        headers: {
          "Content-type": "application/json",
        },
        withCredentials: true,
        baseURL: "https://public-api.rabbithole.gg/",
        ...config,
      })
      .then((res) => res.data)

    const parseResult = responseSchema.safeParse(data)

    if (parseResult.success === true) {
      return parseResult.data
    } else {
      const exception = new Error(
        `Schema mismatch error in ${identifier}, this may result in runtime errors. Please verify that the types match what the backend is returning.`
      )

      console.error(exception)

      if (process.env.NODE_ENV === "development") {
        console.error(parseResult.error)
      }

      return data as Response
    }
  } catch (err) {
    // the BE actually returns useful error messages in the response so lets see if we can
    // re-throw the error with that as the body instead of default axios message
    if (axios.isAxiosError(err)) {
    if (err.response != null && isNonEmptyString(err.response.data?.error)) {
        err.message = err.response.data.error
        throw err
      }
      throw err
    }
    throw err
  }
}
