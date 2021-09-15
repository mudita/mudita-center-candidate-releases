/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export enum DeviceEvent {
  GetConnected = "DEVICE_GET_CONNECTED",
  SetData = "DEVICE_SET_DATA",

  Connected = "DEVICE_CONNECTED",
  Disconnected = "DEVICE_DISCONNECTED",

  Unlock = "DEVICE_UNLOCK",
  Locked = "DEVICE_LOCKED",
  Unlocked = "DEVICE_UNLOCKED",
  SetLockTime = "DEVICE_SET_LOCK_TIME",

  Loading = "DEVICE_DATA_LOADING",

  ChangeSimData = "DEVICE_CHANGE_SIM",
  SetSimData = "DEVICE_SET_SIM_DATA",

  SetOsVersionData = "DEVICE_SET_OS_VERSION_DATA",
  SetUpdateState = "DEVICE_SET_UPDATE_STATE",
  StartOsUpdateProcess = "DEVICE_START_OS_UPDATE_PROCESS",
}
