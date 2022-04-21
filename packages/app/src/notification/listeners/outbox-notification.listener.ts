/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { v4 as uuid } from "uuid"
import { OutboxEntryType } from "@mudita/pure"
import { ipcRenderer } from "electron-better-ipc"
import store from "Renderer/store"
import { pushNotification } from "App/notification/actions"
import {
  IpcEvent,
  NotificationMethod,
  NotificationType,
  NotificationResourceType,
} from "App/notification/constants"
import { EntryChangesEvent } from "App/outbox/services"

const resourceTypeMap: Record<OutboxEntryType, NotificationResourceType> = {
  [OutboxEntryType.Message]: NotificationResourceType.Message,
  [OutboxEntryType.Thread]: NotificationResourceType.Thread,
  [OutboxEntryType.Contact]: NotificationResourceType.Contact,
}

const newNotifications = (_: any, data: EntryChangesEvent[]): void => {
  data.forEach((item) => {
    store.dispatch(
      pushNotification({
        id: uuid(),
        method: NotificationMethod.Layout,
        type: NotificationType.Info,
        resourceType: resourceTypeMap[item.entry.type],
        content: item.payload,
      })
    )
  })
}

export const registerOutboxNotificationListener = (): (() => void) => {
  ipcRenderer.on(IpcEvent.PushOutboxNotification, newNotifications)

  return () => {
    ipcRenderer.off(IpcEvent.PushOutboxNotification, newNotifications)
  }
}
