import { type InputHTMLAttributes } from "react"
import { BiSearch } from "react-icons/bi"

import Flex from "../Flex"
import Pill from "../Pills/Pill"

type TextInputWithIconProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "onChange"
> & {
  onChange: (value: string) => void
}

export default function TextInputWithIcon({
  onChange,
  placeholder = "Search for an address",
  ...rest
}: TextInputWithIconProps) {
  return (
    <Pill
      as={Flex}
      spacing="flush"
      className="w-full bg-white pl-3 py-0 gap-1 border focus-within:shadow-white/30 h-9"
      align="center"
    >
      <BiSearch size={20} />
      <div className="relative h-9 w-full">
        <input
          type="text"
          className="absolute bg-transparent left-0 top-0 w-full h-full block text-black px-2 outline-none placeholder:text-primary-text font-medium text-sm rounded-lg"
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
          {...rest}
        />
      </div>
    </Pill>
  )
}
