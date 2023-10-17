import React from "react"
import {
  type GetServerSidePropsContext,
  type InferGetServerSidePropsType,
} from "next"
import { add, startOfHour } from "date-fns"
import { P, match } from "ts-pattern"

import QuestDetails from "@/components/pages/QuestDetails"
import { safelyParseRouterQuery } from "@/lib/safelyParseRouterQuery"

// Stateless cache key generator that will trigger new OG image URLs every 15 minutes
function getPinnedOgImageCacheBuster() {
  const now = new Date()
  const quarters = now.getMinutes() / 60

  return match(quarters)
    .with(P.number.between(0, 0.25), () => startOfHour(now).getTime())
    .with(P.number.between(0.26, 0.5), () =>
      add(startOfHour(now), { minutes: 15 }).getTime()
    )
    .with(P.number.between(0.51, 0.75), () =>
      add(startOfHour(now), { minutes: 30 }).getTime()
    )
    .with(P.number.between(0.76, 1), () =>
      add(startOfHour(now), { minutes: 45 }).getTime()
    )
    .otherwise(() => Date.now())
}

export async function getServerSideProps({
  params,
}: GetServerSidePropsContext) {
  const questId = safelyParseRouterQuery(params?.questId)
  const ogImageUrl = `https://${
    process.env.VERCEL_URL
  }/api/og/quest/${questId}/${getPinnedOgImageCacheBuster()}`

  return {
    props: { questId, ogImageUrl },
  }
}

export default function QuestsDetailsPage({
  questId,
  ogImageUrl,
}: InferGetServerSidePropsType<any>) {
  return <QuestDetails questId={questId} ogImageUrl={''} />
}
