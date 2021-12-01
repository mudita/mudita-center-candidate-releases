/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceFileDeprecated } from "Backend/device-file-system-service/device-file-system-service"
import { formatDate } from "Renderer/utils/format-date"
import getAppLogs from "Renderer/requests/get-app-logs.request"
import getDeviceLogFiles from "Renderer/requests/get-device-log-files.request"
import archiveFiles from "Renderer/requests/archive-files.request"
import createFreshdeskTicket from "App/renderer/utils/create-freshdesk-ticket/create-freshdesk-ticket"
import {
  FreshdeskTicketData,
  FreshdeskTicketDataType,
} from "Renderer/utils/create-freshdesk-ticket/create-freshdesk-ticket.types"

export enum CreateBugTicketResponseStatus {
  Ok = "ok",
  Error = "error",
}

interface CreateBugTicketResponseError {
  message: string
  data?: unknown
}

export interface CreateBugTicketResponse {
  status: CreateBugTicketResponseStatus
  error?: CreateBugTicketResponseError
}

const todayFormatDate = formatDate(new Date())
export const attachedFileName = `${todayFormatDate}.zip`

const sendTicketRequest = async (
  freshdeskTicketData: Omit<FreshdeskTicketData, "type" | "attachments">
): Promise<CreateBugTicketResponse> => {
  const mcFileName = `mc-${todayFormatDate}.txt`
  const appLogs = await getAppLogs()
  const appLogFile: DeviceFileDeprecated = {
    data: appLogs,
    name: mcFileName,
  }

  const { data: deviceLogFiles = [] } = await getDeviceLogFiles()

  const buffer = await archiveFiles({
    files: [...deviceLogFiles, appLogFile],
  })

  if (buffer === undefined) {
    return returnResponseError("Create Bug Ticket - ArchiveFiles error")
  }

  const attachments = [
    new File([buffer], attachedFileName, { type: "application/zip" }),
  ]

  const data = {
    attachments,
    ...freshdeskTicketData,
    type: FreshdeskTicketDataType.Problem,
  }

  try {
    await createFreshdeskTicket(data)
    return {
      status: CreateBugTicketResponseStatus.Ok,
    }
  } catch (e) {
    if (e?.response?.data) {
      const error = {
        message: e.response.data.description,
        data: e.response.data.errors,
      }
      return {
        error,
        status: CreateBugTicketResponseStatus.Error,
      }
    } else {
      return returnResponseError("Create Bug Ticket - Bad Request")
    }
  }
}

const returnResponseError = (
  message: string
): {
  status: CreateBugTicketResponseStatus.Error
  error: CreateBugTicketResponseError
} => {
  return {
    status: CreateBugTicketResponseStatus.Error,
    error: {
      message,
    },
  }
}

export default sendTicketRequest