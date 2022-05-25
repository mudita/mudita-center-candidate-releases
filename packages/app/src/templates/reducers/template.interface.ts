/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export interface Template {
  id: string
  text: string
  lastUsedAt: string
}

export interface TemplateState {
  data: Template[]
  error: Error | string | null
}
