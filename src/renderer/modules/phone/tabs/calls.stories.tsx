import { storiesOf } from "@storybook/react"
import { calls } from "Renderer/components/core/table/table.fake-data"
import React from "react"
import Calls from "Renderer/modules/phone/tabs/calls.component"

const isTopicThreadOpened = () => true

storiesOf("Views/Calls", module).add("Calls", () => (
  <div style={{ maxWidth: "97.5rem" }}>
    <Calls isTopicThreadOpened={isTopicThreadOpened} calls={calls} />
  </div>
))
