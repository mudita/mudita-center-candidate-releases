import { font } from "Renderer/styles/theming/theme-getters"
import { createGlobalStyle } from "styled-components"
import { Theme } from "./theming/theme"

const GlobalStyle = createGlobalStyle<{ theme: Theme }>`
  html, body  {
    font-family: ${font("primary")};
    font-size: 10px;
    font-weight: 300;
    line-height: 1.5;
  }
`

export default GlobalStyle