import { storiesOf } from "@storybook/react"
import * as React from "react"
import InputRadio from "Renderer/components/input-radio/input-radio.component"

storiesOf("Components|Input", module).add("Radio input", () => {
  return (
    <form action="">
      <InputRadio name={"Example1"} value={"value1"} id={"id1"} />
      <InputRadio name={"Example1"} value={"value2"} id={"id2"} />
    </form>
  )
})
