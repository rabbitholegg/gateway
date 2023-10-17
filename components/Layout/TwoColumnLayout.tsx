import { type PropsWithChildren, type ReactNode } from "react"
import GlassCard from "../GlassCard/GlassCard"
import { MainNav, MobileNav } from "./MainNav"

function GridContainer({ children }: PropsWithChildren) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] grid-rows-1 w-full h-full relative z-10">
      {children}
    </div>
  )
}

function MainNavContainer({ children }: PropsWithChildren) {
  return (
    <div className="hidden md:block h-full overflow-y-auto w-16 xl:w-max">
      {children}
    </div>
  )
}

function MobileNavContainer({ children }: PropsWithChildren) {
  return (
    <GlassCard
      className="md:hidden w-full relative"
      radius="none"
      spacing="flush"
    >
      <div className="px-4 py-6">{children}</div>
    </GlassCard>
  )
}

type MainContentContainerProps = PropsWithChildren

function MainContentContainer({ children }: MainContentContainerProps) {
  return (
    <div className="bg-[#fafafa] grid grid-cols-1 grid-rows-[auto_auto_1fr] w-full h-full overflow-hidden">
      {children}
    </div>
  )
}

type TwoColumnLayoutProps = PropsWithChildren & {
  header?: ReactNode
}

export default function TwoColumnLayout({
  header,
  children,
}: TwoColumnLayoutProps) {
  return (
    <GridContainer>
      <MainNavContainer>
        <MainNav />
      </MainNavContainer>
      <MainContentContainer>
        {header}
        <div className="h-full overflow-y-auto">{children}</div>
      </MainContentContainer>
      <MobileNavContainer>
        <MobileNav />
      </MobileNavContainer>
    </GridContainer>
  )
}
