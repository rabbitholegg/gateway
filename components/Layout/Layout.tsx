import React from "react"

import { NextSeo } from "next-seo"
import TwoColumnLayout from "./TwoColumnLayout"

type LayoutProps = {
  children: React.ReactNode
  header?: React.ReactNode
  pageTitle: string
}

const Layout = ({ children, pageTitle, header }: LayoutProps) => {
  const metaTitle = `${pageTitle} | Quest Gateway`

  return (
    <div className="font-inter bg-backdrop app-chrome">
      <NextSeo title={metaTitle} />
      <TwoColumnLayout header={header}>{children}</TwoColumnLayout>
    </div>
  )
}

export default Layout
