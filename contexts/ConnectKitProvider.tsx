import customChains from '@/lib/constants/chains'
import { type ReactNode } from "react"

import {
  ConnectKitProvider as DefaultConnectKitProvider,
  SIWEProvider,
  getDefaultConfig,
  type SIWEConfig,
} from "connectkit"
import { type CustomAvatarProps } from "connectkit/build/types"
import { SiweMessage } from "siwe/dist/siwe"
import { WagmiConfig, configureChains, createConfig } from "wagmi"
import { alchemyProvider } from "wagmi/providers/alchemy"
import { publicProvider } from "wagmi/providers/public"

import { getBlockie, isNonEmptyString } from "@/lib"
import AuthService from "@/lib/auth"

const siweConfig: SIWEConfig = {
  signOutOnDisconnect: false,
  signOutOnNetworkChange: false,
  signOutOnAccountChange: true,
  createMessage: ({ nonce, address, chainId }) =>
    new SiweMessage({
      version: "1",
      domain: window.location.host,
      uri: window.location.origin,
      address,
      chainId,
      nonce,
      statement: "Sign in With Ethereum.",
    }).prepareMessage(),
  getNonce: AuthService.getNonce,
  getSession: AuthService.getSession,
  verifyMessage: AuthService.login,
  signOut: AuthService.logout,
}

const alchemyId = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY!

const CustomAvatar = ({
  address,
  ensImage,
  ensName,
  size,
  radius,
}: CustomAvatarProps) => {
  const blockieImg = getBlockie(address || "")

  return (
    <div
      style={{
        overflow: "hidden",
        borderRadius: radius,
        height: size,
        width: size,
      }}
    >
      <img
        src={isNonEmptyString(ensImage) ? ensImage : blockieImg}
        alt={ensName ?? address}
        width="100%"
        height="100%"
      />
    </div>
  )
}

const { publicClient, webSocketPublicClient, chains } = configureChains(
  customChains,
  [alchemyProvider({ apiKey: alchemyId }), publicProvider()]
)

const config = createConfig(
  getDefaultConfig({
    autoConnect: true,
    alchemyId,
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
    appName: "RabbitHole",
    appUrl: "https://www.rabbithole.gg",
    chains,
    publicClient,
    webSocketPublicClient,
  })
)

export default function ConnectKitProvider({
  children,
}: {
  children: ReactNode
}) {
  return (
    <WagmiConfig config={config}>
      <SIWEProvider {...siweConfig}>
        <DefaultConnectKitProvider
          mode="light"
          options={{
            customAvatar: CustomAvatar,
            initialChainId: 0,
          }}
        >
          {children}
        </DefaultConnectKitProvider>
      </SIWEProvider>
    </WagmiConfig>
  )
}
