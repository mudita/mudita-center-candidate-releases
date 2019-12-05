import React, { ComponentProps } from "react"
import FunctionComponent from "Renderer/types/function-component.interface"

import { Image as ImageInterface } from "Renderer/interfaces/image.interface"
import { Message as MessageInterface } from "Renderer/interfaces/message.interface"

import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"

import {
  StyledA,
  StyledButton,
  StyledIcon,
  StyledLink,
} from "./button.styled.elements"

export enum DisplayStyle {
  primary,
  secondary,
  iconOnly1,
  iconOnly2,
  iconOnly3,
  link1,
  link2,
  link3,
}

export enum Type {
  button,
  submit,
  reset,
}

export enum Size {
  fixedSmall,
  fixedMedium,
  fixedBig,
}

interface Props {
  disabled?: boolean
  displayStyle?: DisplayStyle
  href?: string
  Icon?: FunctionComponent<ImageInterface>
  label?: string | MessageInterface
  onClick?: () => void
  size?: Size
  target?: string
  to?: string
  type?: Type
}

/** Component for displaying buttons. Other props are passed down (object spread), some are filtered. */
const ButtonComponent: FunctionComponent<Props> = ({
  disabled = false,
  displayStyle = DisplayStyle.primary,
  href,
  Icon,
  label,
  size = Size.fixedBig,
  target,
  to,
  type = Type.button,
  ...rest
}) => {
  let Component: FunctionComponent<ComponentProps<typeof StyledButton>>
  const filteredProps = {}

  if (to) {
    Component = StyledLink
    Object.assign(filteredProps, { to })
  } else if (href) {
    Component = StyledA
    Object.assign(filteredProps, { href, target })
  } else {
    Component = StyledButton
    Object.assign(filteredProps, { type, disabled })
  }
  // @ts-ignore
  return (
    <Component
      {...filteredProps}
      {...rest}
      displayStyle={displayStyle}
      size={size}
      disabled={disabled}
    >
      {Icon && (
        <StyledIcon
          displayStyle={displayStyle}
          isLabel={Boolean(label)}
          Image={Icon}
        />
      )}
      {label && <Text displayStyle={TextDisplayStyle.SmallText}>{label}</Text>}
    </Component>
  )
}

export default ButtonComponent
