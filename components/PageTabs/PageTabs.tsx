import Button from "../Button/Button"
import Flex from "../Flex"

type PageTabsProps = {
  activeTab: number
  tabs: string[]
  onTabChange: (_: number) => void
}

export default function PageTabs({
  activeTab,
  tabs,
  onTabChange,
}: PageTabsProps) {
  return (
    <Flex align="center" className="gap-2">
      {tabs.map((text, index) => (
        <Button
          key={index}
          onClick={() => onTabChange(index)}
          variant={activeTab === index ? "outline" : "transparent"}
          color="white"
          spacing="xs"
          size="lg"
          className="capitalize"
        >
          {text}
        </Button>
      ))}
    </Flex>
  )
}
