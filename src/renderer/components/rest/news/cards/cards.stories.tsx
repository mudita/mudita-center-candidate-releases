import { storiesOf } from "@storybook/react"
import * as React from "react"
import styled from "styled-components"
import Cards from "Renderer/components/rest/news/cards/cards.component"
import { newsItems } from "Renderer/components/rest/news/cards/cards-mock-data"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

storiesOf("News|Cards", module).add("Cards", () => {
  return (
    <Container>
      <Cards newsItems={newsItems} />
    </Container>
  )
})
