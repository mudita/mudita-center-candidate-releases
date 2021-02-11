import React from "react" // , { useState }
import { FunctionComponent } from "Renderer/types/function-component.interface"
import styled from "styled-components"
import Dropdown from "Renderer/components/core/dropdown/dropdown.component" // , { DropdownPosition, }
// import Icon from "Renderer/components/core/icon/icon.component"
// import { Type } from "Renderer/components/core/icon/icon.config"
import { User } from "Renderer/components/core/avatar/avatar.component"
import { backgroundColor } from "Renderer/styles/theming/theme-getters"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import transition from "Renderer/styles/functions/transition"
// import ButtonComponent from "Renderer/components/core/button/button.component"
// import { noop } from "Renderer/utils/noop"
// import { DisplayStyle } from "Renderer/components/core/button/button.config"

const MessageBubbleDropdown = styled(Dropdown)<{
  interlocutor: boolean
  display: boolean
}>`
  margin-right: ${({ interlocutor }) => (interlocutor ? "0" : "1.1rem")};
  margin-left: ${({ interlocutor }) => (interlocutor ? "1.1rem" : "0")};
  opacity: ${({ display }) => (display ? "1" : "0")};
`

const MessageBubbleContainer = styled.div<{ interlocutor: boolean }>`
  display: flex;
  align-items: center;
  flex-direction: ${({ interlocutor }) =>
    interlocutor ? "row-reverse" : "row"};
  &:hover {
    ${MessageBubbleDropdown} {
      opacity: 1;
      transition: ${transition("opacity", undefined, "ease")};
    }
  }
  margin-bottom: 0.8rem;
  &:last-of-type {
    margin-bottom: 0;
  }
`

const MessageBubbleWrapper = styled.div<{
  interlocutor: boolean
  previousAuthor: boolean
}>`
  display: flex;
  align-items: center;
  flex-direction: ${({ interlocutor }) =>
    interlocutor ? "row-reverse" : "row"};
  justify-content: flex-end;
  margin-top: ${({ previousAuthor }) => (previousAuthor ? "2.4rem" : "0")};
`

const Bubble = styled.div<{ interlocutor: boolean }>`
  padding: 1.1rem 1.2rem;
  margin-top: 0.8rem;
  background-color: ${({ interlocutor }) =>
    interlocutor ? backgroundColor("minor") : backgroundColor("message")};
  border-radius: ${({ interlocutor }) =>
    interlocutor
      ? "1.2rem 1.2rem 1.2rem 0.2rem"
      : "1.2rem 1.2rem 0.2rem 1.2rem"};
  max-width: 38rem;
  box-sizing: border-box;
`

// const ActionsButton = styled.span`
//   cursor: pointer;
// `

interface Props {
  id: string
  user: User
  message: string
  interlocutor?: boolean
  previousAuthor?: boolean
  forwardMessage?: () => void
  removeMessage?: () => void
}

const MessageBubble: FunctionComponent<Props> = ({
  className,
  id,
  user,
  message,
  interlocutor = false,
  previousAuthor = false,
  // forwardMessage = noop,
  // removeMessage = noop,
}) => {
  // const [clicked, setClicked] = useState<string>("")
  // const open = () => setClicked(id)
  // const close = () => setClicked("")
  // const forward = () => forwardMessage(id)
  // const remove = () => removeMessage(id)
  return (
    <MessageBubbleWrapper
      className={className}
      interlocutor={interlocutor}
      previousAuthor={previousAuthor}
    >
      <div>
        <MessageBubbleContainer interlocutor={interlocutor}>
          {/* TODO: Remove when add feature becomes available */}
          {/*<MessageBubbleDropdown*/}
          {/*  toggler={*/}
          {/*    <ActionsButton data-testid="dropdown-action-button">*/}
          {/*      <Icon type={Type.More} />*/}
          {/*    </ActionsButton>*/}
          {/*  }*/}
          {/*  onOpen={open}*/}
          {/*  onClose={close}*/}
          {/*  dropdownPosition={*/}
          {/*    interlocutor ? DropdownPosition.Left : DropdownPosition.Right*/}
          {/*  }*/}
          {/*  interlocutor={interlocutor}*/}
          {/*  display={clicked === id}*/}
          {/*  data-testid="dropdown"*/}
          {/*>*/}
          {/*  <ButtonComponent*/}
          {/*    labelMessage={{*/}
          {/*      id: "view.name.messages.messageDropdownForward",*/}
          {/*    }}*/}
          {/*    Icon={Type.Forward}*/}
          {/*    onClick={forward}*/}
          {/*    displayStyle={DisplayStyle.Dropdown}*/}
          {/*    data-testid="forward-message"*/}
          {/*  />*/}
          {/*  <ButtonComponent*/}
          {/*    labelMessage={{*/}
          {/*      id: "view.name.messages.messageDropdownDelete",*/}
          {/*    }}*/}
          {/*    Icon={Type.Delete}*/}
          {/*    onClick={remove}*/}
          {/*    displayStyle={DisplayStyle.Dropdown}*/}
          {/*    data-testid="delete-message"*/}
          {/*  />*/}
          {/*</MessageBubbleDropdown>*/}
          <Bubble interlocutor={interlocutor} data-testid="message-content">
            <Text displayStyle={TextDisplayStyle.MediumLightText}>
              {message}
            </Text>
          </Bubble>
        </MessageBubbleContainer>
      </div>
    </MessageBubbleWrapper>
  )
}

export default MessageBubble
