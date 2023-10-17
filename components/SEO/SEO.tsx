import Head from "next/head"
import { type PropsWithChildren } from "react"

import { hasWindow, isNotProduction } from "../../lib/constants"

const SEO = ({ children }: PropsWithChildren) => (
  <Head>
    <title>Quest Gateway</title>
    <meta charSet="utf-8" />
    {isNotProduction && <meta name="robots" content="noindex, nofollow" />}
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" href="/favicon.png" />
    <meta name="msapplication-TileColor" content="#6FCF97" />
    <meta
      name="description"
      content="Earn tokens by doing on-chain quests in the best crypto apps"
    />
    <meta
      property="image"
      key="image"
      content={process.env.NEXT_PUBLIC_THEME_BRAND_OG_IMAGE_URI}
    />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="Quest Gateway" />
    <meta
      property="og:description"
      content="Earn tokens by doing on-chain quests in the best crypto apps"
    />
    <meta
      property="og:image"
      key="og:image"
      content={process.env.NEXT_PUBLIC_THEME_BRAND_OG_IMAGE_URI}
    />
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:title" content="Quest Gateway" />
    <meta property="twitter:site" content="@rabbithole_gg" />
    <meta
      property="twitter:description"
      content="Earn tokens by doing on-chain quests in the best crypto apps"
    />
    <meta
      property="twitter:image:src"
      key="twitter:image:src"
      content={process.env.NEXT_PUBLIC_THEME_BRAND_OG_IMAGE_URI}
    />
    <meta property="twitter:creator" content="rabbithole_gg" />
    {hasWindow() && (
      <>
        <link rel="canonical" href={window.location.href} />
        <meta property="og:url" content={window?.location?.href} />
        <meta property="twitter:url" content={window?.location?.href} />
      </>
    )}
    {children}
  </Head>
)

export default SEO
