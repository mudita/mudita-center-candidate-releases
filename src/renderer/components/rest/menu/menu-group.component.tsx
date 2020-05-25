import * as React from "react"
import Button from "Renderer/components/core/button/button.component"
import { DisplayStyle } from "Renderer/components/core/button/button.config"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { MenuElement } from "Renderer/constants/menu-elements"
import { backgroundColor } from "Renderer/styles/theming/theme-getters"
import FunctionComponent from "Renderer/types/function-component.interface"
import styled from "styled-components"
import Icon from "Renderer/components/core/icon/icon.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import RangeIcon from "Renderer/components/core/icon/range-icon.component"
import BatteryIcon from "Renderer/components/core/icon/battery-icon.component"

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 2.5rem 0 1.6rem 0;
`

const HeaderIconContainer = styled.div`
  display: flex;
`

const HeaderIconBg = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.4rem;
  &:hover {
    background-color: ${backgroundColor("grey2")};
  }
`

const HeaderIcon = styled(Icon)`
  &:not(:last-of-type) {
    margin-right: 1rem;
  }
`

const LinkWrapper = styled.div`
  margin: 0 1rem;
`

const ButtonMenu = styled(Button)`
  margin: 0 0 0.8rem 0;
`

const MenuGroup: FunctionComponent<MenuElement> = ({ label, items, icons }) => {
  return (
    <>
      {label && (
        <HeaderWrapper>
          <Text displayStyle={TextDisplayStyle.SmallText} message={label} />
          {icons && (
            <HeaderIconContainer>
              {icons.map((icon: Type, index) => {
                if (icon === Type.MenuRange) {
                  return (
                    <HeaderIconBg>
                      <RangeIcon strength={21} />
                    </HeaderIconBg>
                  )
                }
                if (icon === Type.MenuBattery) {
                  return (
                    <HeaderIconBg>
                      <BatteryIcon level={0} height={2.4} width={2.4} />
                    </HeaderIconBg>
                  )
                }
                return (
                  <HeaderIconBg key={index}>
                    <HeaderIcon type={icon} width={1.6} />
                  </HeaderIconBg>
                )
              })}
            </HeaderIconContainer>
          )}
        </HeaderWrapper>
      )}

      {items &&
        items.map(({ button, icon }, index) => (
          <LinkWrapper key={index}>
            <ButtonMenu
              nav
              displayStyle={DisplayStyle.Link4}
              labelMessage={button.label}
              Icon={icon}
              to={button.url}
            />
          </LinkWrapper>
        ))}
    </>
  )
}

export default MenuGroup
