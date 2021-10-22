/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Adapters from "Backend/adapters/adapters.interface"
import createEndpoint from "Backend/endpoints/create-endpoint"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import DeviceResponse from "Backend/adapters/device-response.interface"
import { UploadFileLocallyPayload } from "Backend/device-file-system-service/device-file-system-service"

const handleUploadDeviceFileLocally = async (
  { purePhone }: Adapters,
  payload: UploadFileLocallyPayload
): Promise<DeviceResponse> => {
  return purePhone.uploadDeviceFileLocally(payload)
}

const registerUploadDeviceFileLocallyRequest = createEndpoint({
  name: IpcRequest.UploadDeviceFileLocally,
  handler: handleUploadDeviceFileLocally,
})

export default registerUploadDeviceFileLocallyRequest