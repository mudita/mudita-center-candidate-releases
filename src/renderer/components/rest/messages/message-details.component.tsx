import React from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import {
  Sidebar,
  SidebarHeaderIcon,
} from "Renderer/components/core/table/table.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import { noop } from "Renderer/utils/noop"
import { ActiveRow } from "Renderer/components/rest/messages/messages-list.component"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import styled from "styled-components"
import InputComponent from "Renderer/components/core/input-text/input-text.component"
import Icon from "Renderer/components/core/icon/icon.component"

interface Props {
  details: ActiveRow
  onClose?: () => void
}

const PhoneNumberText = styled(Text)`
  margin-top: 0.8rem;
`

const MessagesWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`

const Textarea = styled(InputComponent)`
  margin-bottom: 1.6rem;
`

const leadingIcons = [
  <Icon type={Type.AttachContact} key={Type.AttachContact} />,
  <Icon type={Type.Template} key={Type.Template} />,
]

const trailingIcon = [<Icon type={Type.Send} key={Type.Send} />]

const MessageDetails: FunctionComponent<Props> = ({
  details,
  onClose = noop,
}) => {
  const icons = (
    <>
      <SidebarHeaderIcon Icon={Type.Calls} onClick={noop} />
      <SidebarHeaderIcon Icon={Type.Contacts} onClick={noop} />
      <SidebarHeaderIcon Icon={Type.BorderCheckIcon} onClick={noop} />
      <SidebarHeaderIcon Icon={Type.Delete} onClick={noop} />
    </>
  )
  return (
    <Sidebar
      show
      headerLeft={
        <>
          <Text displayStyle={TextDisplayStyle.LargeBoldText}>
            {details.caller.firstName} {details.caller.lastName}
          </Text>
          <PhoneNumberText displayStyle={TextDisplayStyle.MediumFadedLightText}>
            {details.caller.phoneNumber}
          </PhoneNumberText>
        </>
      }
      headerRight={icons}
      onClose={onClose}
      appColorSidebarHeader
    >
      <MessagesWrapper>
        <Textarea
          type="textarea"
          value={""}
          onChange={noop}
          leadingIcons={leadingIcons}
          trailingIcons={trailingIcon}
          disabled
        />
      </MessagesWrapper>
    </Sidebar>
  )
}

export default MessageDetails
