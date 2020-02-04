import styled from "styled-components"
import {
  backgroundColor,
  borderRadius,
} from "Renderer/styles/theming/theme-getters"
import ButtonToggler, {
  ButtonTogglerItem,
} from "Renderer/components/core/button-toggler/button-toggler.component"

const Card = styled.section`
  display: grid;
  align-items: center;
  grid-template-areas: "Text Buttons";
  grid-template-columns: auto minmax(17rem, 1fr);
  height: 14.4rem;
  padding: 0 4.8rem;
  box-sizing: border-box;
  border-radius: ${borderRadius("medium")};
  background-color: ${backgroundColor("light")};
`

export const CardText = styled.div`
  grid-area: Text;
`

export const CardAction = styled(ButtonToggler)`
  grid-area: Buttons;
  justify-self: end;
  min-width: 17rem;
`

export const CardActionButton = styled(ButtonTogglerItem)`
  padding: 0 1.6rem;
  width: 50%;
`

export default Card
