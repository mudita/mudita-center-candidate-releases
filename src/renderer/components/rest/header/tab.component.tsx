import * as React from "react"
import Button from "Renderer/components/core/button/button.component"
import { DisplayStyle } from "Renderer/components/core/button/button.config"
import { Image as ImageInterface } from "Renderer/interfaces/image.interface"
import { Message as MessageInterface } from "Renderer/interfaces/message.interface"
import FunctionComponent from "Renderer/types/function-component.interface"

interface TabProps {
  icon: FunctionComponent<ImageInterface>
  tabText?: MessageInterface
  url?: string
}

const Tab: FunctionComponent<TabProps> = ({ icon, tabText, url }) => {
  return (
    <Button
      nav
      displayStyle={DisplayStyle.Primary}
      labelMessage={tabText}
      Icon={icon}
      to={url}
    />
  )
}

export default Tab
