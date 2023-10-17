'use client'

import React, { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useResetAtom } from "jotai/utils"

import Quests from "../../components/pages/Quests"
import { questsSearchAtom } from "../../components/pages/questsState"

export default function QuestsPage() {
  const resetSearch = useResetAtom(questsSearchAtom)
  const router = useRouter()

  const query = useSearchParams()

  useEffect(() => {
    return () => {
      resetSearch()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Temporary redirect to the new quests page which has changed from /quests?quest= to /quests/:questId
  useEffect(() => {
    const questId = query.get('quest')
    if (questId != undefined) {
      router.replace(`/quests/${questId}`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.get('quest')])

  return <Quests />
}
