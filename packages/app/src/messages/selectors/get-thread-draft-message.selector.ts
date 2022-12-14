/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "reselect"
import { MessageType } from "App/messages/constants"
import { Message } from "App/messages/dto"
import { messagesStateSelector } from "App/messages/selectors/messages-state.selector"
import { Feature, flags } from "App/feature-flags"

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getThreadDraftMessageSelector = (threadId: string) =>
  createSelector(
    messagesStateSelector,
    ({ data: { messageIdsInThreadMap, messageMap } }) => {
      if (!flags.get(Feature.MessagesDraftStatus)) {
        return
      }

      const messageIds = messageIdsInThreadMap[threadId] ?? []
      const messages = [
        ...messageIds.map((messageId) => messageMap[messageId]),
      ].reverse()

      return messages.find(
        (message: Message) => message.messageType === MessageType.DRAFT
      )
    }
  )
