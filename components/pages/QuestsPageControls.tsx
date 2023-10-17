import { useAtom } from "jotai"
import { GoX } from "react-icons/go"
import { useDebouncedCallback } from "use-debounce"

import Button from "../Button/Button"
import TextInputWithIcon from "../TextInputWithIcon/TextInputWithIcon"
import {
  questsSearchAtom,
  useFilterToggle,
  type FilterableQuestStatus,
} from "./questsState"

const filterToLabelMap: Record<FilterableQuestStatus, string> = {
  active: "Active",
  expired: "Expired",
  completed: "Completed",
}

export function FilterToggle({ filter }: { filter: FilterableQuestStatus }) {
  const toggleFilter = useFilterToggle()

  return (
    <Button
      variant="outline"
      color="tertiary"
      size="sm"
      spacing="sm"
      radius="lg"
      onClick={() => toggleFilter(filter)}
      className="bg-white/5 truncate"
    >
      <p className="font-medium tracking-normal text-white mr-1">
        {filterToLabelMap[filter]}
      </p>
      <GoX
        color="#fff"
        className="opacity-50 group-hover:opacity-100"
        size={14}
      />
    </Button>
  )
}

function SearchControls() {
  const [searchValue, setSearchValue] = useAtom(questsSearchAtom)

  const handleChange = useDebouncedCallback((value: string) => {
    setSearchValue(value)
  }, 250)

  return (
    <div className="rounded-lg w-full">
      <TextInputWithIcon
        onChange={handleChange}
        autoFocus
        placeholder="Search"
        defaultValue={searchValue}
      />
    </div>
  )
}

export default function QuestsPageControls() {
  return (
    <>
      <SearchControls />
      {/* <Flex align="center" className="gap-3">
        <ActiveFilters />
        <FiltersPopover />
      </Flex> */}
    </>
  )
}
