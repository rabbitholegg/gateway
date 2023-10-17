import copy from "copy-to-clipboard"
import { useRouter } from "next/navigation"
import { useCallback } from "react"

import { showSuccessToast } from "@/lib/showCustomToast"
import { useGetUser } from "../../data/hooks/getUser/useGetUser"
import useWallet from "../../hooks/useWallet"
import AuthenticatedComponent from "../AuthenticatedComponent/AuthenticatedComponent"
import Card from "../Card/Card"
import Flex from "../Flex"
import Layout from "../Layout/Layout"
import PageContentHeader from "../PageContentHeader/PageContentHeader"
import ScrollingMainContent from "../ScrollingMainContent/ScrollingMainContent"

function SettingsContent() {
  const router = useRouter()
  const { address } = useWallet()
  const { data: userData, isSuccess: isUserLoaded } = useGetUser(address)

  const handleCopy = useCallback(() => {
    copy(address || "")
    showSuccessToast({ title: "Copied address" })
  }, [address])

  return (
    <div className="flex flex-col gap-3 max-w-3xl">
      <h1 className="font-semibold text-foreground text-xl">Settings</h1>

      <Card className="md:hidden w-auto">
        <Card.Body>
          <Flex justify="between" className="py-3">
            <Card.Title>Wallet Address</Card.Title>
            <Flex
              className="w-10 h-10 bg-base-300 rounded-xl"
              justify="center"
              align="center"
              onClick={handleCopy}
            >
              <i className="fa-light fa-copy w-3.5" />
            </Flex>
          </Flex>
        </Card.Body>
      </Card>
    </div>
  )
}

const Settings = () => {
  return (
    <Layout pageTitle="Settings" header={<PageContentHeader />}>
      <ScrollingMainContent>
        <AuthenticatedComponent>
          <SettingsContent />
        </AuthenticatedComponent>
      </ScrollingMainContent>
    </Layout>
  )
}

export default Settings
