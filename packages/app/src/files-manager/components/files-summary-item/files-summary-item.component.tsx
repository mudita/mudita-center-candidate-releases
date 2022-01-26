/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { DiskSpaceCategory } from "App/files-manager/components/files-manager/files-manager.interface"
import { backgroundColor } from "Renderer/styles/theming/theme-getters"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import styled from "styled-components"
import Icon, { IconSize } from "Renderer/components/core/icon/icon.component"
import { FilesSummaryItemTestIds } from "App/files-manager/components/files-summary-item/files-summary-item-test-ids.enum"
import { convertFromBytesToDecimal } from "Renderer/utils/convert-from-bytes-to-decimal/convert-from-bytes-to-decimal"

const FilesSummaryItemContainer = styled.div`
  display: flex;
  align-items: flex-start;
  background-color: ${backgroundColor("row")};
  padding: 1.6rem;
  width: 28rem;
`

const SummaryIcon = styled(Icon)<{ fileColor: string }>`
  margin-right: 1.6rem;
  background-color: ${({ fileColor }) => fileColor};
  border-radius: 0.4rem;
  padding: 1.2rem;
`

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`

const FilesSummaryItem: FunctionComponent<DiskSpaceCategory> = ({
  color,
  filesAmount,
  fileType,
  size = 0,
  icon,
}) => {
  return (
    <FilesSummaryItemContainer data-testid={FilesSummaryItemTestIds.Wrapper}>
      <SummaryIcon fileColor={color} type={icon} size={IconSize.Medium} />
      <TextWrapper>
        <Text
          displayStyle={TextDisplayStyle.LargeText}
          element={"p"}
          data-testid={FilesSummaryItemTestIds.Title}
        >
          {fileType}
        </Text>
        <Text
          displayStyle={TextDisplayStyle.MediumFadedText}
          element={"p"}
          data-testid={FilesSummaryItemTestIds.Description}
        >
          {filesAmount
            ? `${filesAmount} files (${convertFromBytesToDecimal(size)})`
            : `(${convertFromBytesToDecimal(size)})`}
        </Text>
      </TextWrapper>
    </FilesSummaryItemContainer>
  )
}

export default FilesSummaryItem
