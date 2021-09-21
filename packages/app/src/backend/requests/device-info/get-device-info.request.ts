/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Adapters from "Backend/adapters/adapters.interface"
import createEndpoint from "Backend/endpoints/create-endpoint"
import DeviceInfo from "Common/interfaces/device-info.interface"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import DeviceResponse, {
  DeviceResponseStatus,
} from "Backend/adapters/device-response.interface"
import { CaseColour } from "@mudita/pure"

const handleDeviceInfoRequest = async ({
  purePhone,
}: Adapters): Promise<DeviceResponse<DeviceInfo>> => {
  const getOsVersionResponse = await purePhone.getOsVersion()
  const getSerialNumberResponse = await purePhone.getSerialNumber()
  const getCaseColourResponse = await purePhone.getCaseColour()
  if (
    getOsVersionResponse.status === DeviceResponseStatus.Ok &&
    getOsVersionResponse.data !== undefined &&
    getSerialNumberResponse.status === DeviceResponseStatus.Ok &&
    getSerialNumberResponse.data !== undefined
  ) {
    return {
      status: DeviceResponseStatus.Ok,
      data: {
        modelName: purePhone.getModelName(),
        modelNumber: purePhone.getModelNumber(),
        name: purePhone.getName(),
        osUpdateDate: purePhone.getOsUpdateDate(),
        osVersion: getOsVersionResponse.data,
        serialNumber: getSerialNumberResponse.data,
        caseColour:
          getCaseColourResponse.data !== undefined
            ? getCaseColourResponse.data
            : CaseColour.Gray,
      },
    }
  } else {
    return {
      status: DeviceResponseStatus.Error,
    }
  }
}

const registerDeviceInfoRequest = createEndpoint({
  name: IpcRequest.GetDeviceInfo,
  handler: handleDeviceInfoRequest,
})

export default registerDeviceInfoRequest
