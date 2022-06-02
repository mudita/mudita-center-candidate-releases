/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { PayloadAction } from "@reduxjs/toolkit"
import { TemplatesEvent, TemplateDeletingState } from "App/templates/constants"
import { Template } from "App/templates/dto"

export interface TemplateState {
  data: Template[]
  error: Error | string | null
  deletingState: TemplateDeletingState | null
}

export type DeleteTemplateAction = PayloadAction<
  string[],
  TemplatesEvent.DeleteTemplates
>
