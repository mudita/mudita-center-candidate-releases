/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import { AnyAction } from "@reduxjs/toolkit"
import { DeviceType } from "App/device/constants"
import { lockedDevice } from "./locked-device.action"
import getDeviceLockTime from "App/__deprecated__/renderer/requests/get-device-lock-time.request"
import getUnlockDeviceStatus from "App/__deprecated__/renderer/requests/get-unlock-device-status.request"
import { flags } from "App/feature-flags"
import { DeviceEvent } from "App/device"
import { RequestResponseStatus } from "App/core/types/request-response.interface"

jest.mock("App/feature-flags")
jest.mock("App/__deprecated__/renderer/requests/get-device-lock-time.request")
jest.mock(
  "App/__deprecated__/renderer/requests/get-unlock-device-status.request"
)

describe("Device: MuditaHarmony", () => {
  describe("Get Device Lock Time request returns `success` status", () => {
    test("fire async `lockedDevice` do not call `getDeviceLockTime`", async () => {
      const mockStore = createMockStore([thunk])({
        device: {
          deviceType: DeviceType.MuditaHarmony,
        },
      })
      const {
        meta: { requestId },
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/await-thenable
      } = await mockStore.dispatch(lockedDevice() as unknown as AnyAction)

      expect(mockStore.getActions()).toEqual([
        lockedDevice.pending(requestId),
        lockedDevice.fulfilled(undefined, requestId, undefined),
      ])

      expect(getDeviceLockTime).not.toHaveBeenCalled()
    })
  })
})

describe("Device: MuditaPure", () => {
  describe("Get Device Lock Time request returns `success` status", () => {
    test("fire async `lockedDevice` set device lock time", async () => {
      jest.spyOn(flags, "get").mockReturnValueOnce(true)
      ;(getDeviceLockTime as jest.Mock).mockReturnValueOnce({
        status: RequestResponseStatus.Ok,
        data: {
          phoneLockTime: 123456789,
        },
      })
      ;(getUnlockDeviceStatus as jest.Mock).mockReturnValueOnce({
        status: RequestResponseStatus.Ok,
      })
      const mockStore = createMockStore([thunk])({
        device: {
          deviceType: DeviceType.MuditaPure,
        },
      })
      const {
        meta: { requestId },
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/await-thenable
      } = await mockStore.dispatch(lockedDevice() as unknown as AnyAction)

      expect(mockStore.getActions()).toEqual([
        lockedDevice.pending(requestId),
        {
          type: DeviceEvent.SetLockTime,
          payload: { phoneLockTime: 123456789 },
        },
        lockedDevice.fulfilled(undefined, requestId, undefined),
      ])

      expect(getDeviceLockTime).toHaveBeenCalled()
    })
  })

  describe("Get Device Lock Time request returns `unprocessable-entity` status", () => {
    test("fire async `lockedDevice` removes device lock time", async () => {
      jest.spyOn(flags, "get").mockReturnValueOnce(true)
      ;(getDeviceLockTime as jest.Mock).mockReturnValueOnce({
        status: RequestResponseStatus.UnprocessableEntity,
      })
      ;(getUnlockDeviceStatus as jest.Mock).mockReturnValueOnce({
        status: RequestResponseStatus.Ok,
      })
      const mockStore = createMockStore([thunk])({
        device: {
          deviceType: DeviceType.MuditaPure,
        },
      })
      const {
        meta: { requestId },
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/await-thenable
      } = await mockStore.dispatch(lockedDevice() as unknown as AnyAction)

      expect(mockStore.getActions()).toEqual([
        lockedDevice.pending(requestId),
        {
          type: DeviceEvent.SetLockTime,
          payload: undefined,
        },
        lockedDevice.fulfilled(undefined, requestId, undefined),
      ])

      expect(getDeviceLockTime).toHaveBeenCalled()
    })
  })

  describe("Get Device Lock Status request returns `agreement-is-not-accepted` status", () => {
    test("fire async `lockedDevice` calls `setAgreementStatus` action", async () => {
      jest.spyOn(flags, "get").mockReturnValueOnce(true)
      ;(getDeviceLockTime as jest.Mock).mockReturnValueOnce({
        status: RequestResponseStatus.UnprocessableEntity,
      })
      ;(getUnlockDeviceStatus as jest.Mock).mockReturnValueOnce({
        status: RequestResponseStatus.NotAcceptable,
      })
      const mockStore = createMockStore([thunk])({
        device: {
          deviceType: DeviceType.MuditaPure,
        },
      })
      const {
        meta: { requestId },
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/await-thenable
      } = await mockStore.dispatch(lockedDevice() as unknown as AnyAction)

      expect(mockStore.getActions()).toEqual([
        lockedDevice.pending(requestId),
        {
          type: DeviceEvent.AgreementStatus,
          payload: false,
        },
        {
          type: DeviceEvent.SetLockTime,
          payload: undefined,
        },
        lockedDevice.fulfilled(undefined, requestId, undefined),
      ])

      expect(getDeviceLockTime).toHaveBeenCalled()
      expect(getUnlockDeviceStatus).toHaveBeenCalled()
    })
  })
})
