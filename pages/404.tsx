import React from "react"

import CenteredContent from "../components/CenteredContent/CenteredContent"
import ErrorState from "../components/ErrorState/ErrorState"
import Layout from "../components/Layout/Layout"

const Custom404Page: React.FC = () => {
  return (
    <Layout pageTitle="Page not found">
      <CenteredContent centerVertically>
        <ErrorState
          title="Nothing to see here."
          error={Error("404: Page not found")}
        />
      </CenteredContent>
    </Layout>
  )
}

export default Custom404Page
