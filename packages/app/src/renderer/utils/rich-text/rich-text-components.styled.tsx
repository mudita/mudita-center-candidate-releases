/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import styled from "styled-components"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { fontWeight } from "Renderer/styles/theming/theme-getters"

export const RichTextSecondaryHeading = styled(Text).attrs(() => ({
  displayStyle: TextDisplayStyle.TertiaryHeading,
}))`
  font-weight: ${fontWeight("default")};
  margin-bottom: 4rem;
`

export const RichTextTertiaryHeading = styled(Text).attrs(() => ({
  displayStyle: TextDisplayStyle.TertiaryHeading,
}))`
  margin-top: 4rem;
  margin-bottom: 1.6rem;
`

export const RichTextParagraph = styled(Text).attrs(() => ({
  displayStyle: TextDisplayStyle.MediumLightText,
}))`
  margin-bottom: 1.6rem;
`
