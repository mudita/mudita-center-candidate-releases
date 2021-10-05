/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import { Provider } from "react-redux"
import { Router } from "react-router"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import Overview from "App/overview/components/overview/overview.component"
import {
  DataState,
  UpdatingState,
} from "Renderer/models/basic-info/basic-info.typings"
import {
  ConversionFormat,
  Convert,
} from "Renderer/components/rest/settings/audio-conversion-radio-group.enum"
import store from "Renderer/store"
import history from "Renderer/routes/history"
import { DeviceResponseStatus } from "Backend/adapters/device-response.interface"
import { NetworkTestIds } from "App/overview/components/network/network-test-ids.enum"
import { SystemTestIds } from "App/overview/components/system/system-test-ids.enum"
import { CaseColour } from "@mudita/pure"
import { BackupDeviceDataState } from "App/backup-device/reducers"
import { BackupDeviceFlowTestIds } from "App/overview/components/backup-device-flow/backup-device-flow-test-ids.component"

type Props = ComponentProps<typeof Overview>

jest.mock("electron", () => ({
  remote: {
    Menu: () => ({
      popup: jest.fn(),
      append: jest.fn(),
    }),
    MenuItem: () => jest.fn(),
  },
}))

jest.mock("Renderer/requests/get-device-info.request", () =>
  jest.fn(() => ({
    status: DeviceResponseStatus.Ok,
    data: {
      name: "Ziemniaczek",
      modelName: "U12300000",
      modelNumber: "A1239999",
      serilaNumber: "a-b-3d",
      osVersion: "0.123v",
      osUpdateDate: "12-12-2003",
    },
  }))
)

jest.mock("Renderer/requests/get-network-info.request", () =>
  jest.fn(() => ({
    status: DeviceResponseStatus.Ok,
    data: {
      simCards: [
        {
          active: true,
          network: "Y-Mobile",
          networkLevel: 0.5,
          number: 12345678,
          slot: 1,
        },
        {
          active: false,
          network: "X-Mobile",
          networkLevel: 0.69,
          number: 7001234523,
          slot: 2,
        },
      ],
    },
  }))
)

jest.mock("Renderer/requests/get-storage-info.request", () =>
  jest.fn(() => ({
    status: DeviceResponseStatus.Ok,
    data: {
      capacity: 9001,
      available: 99999999999999,
      categories: [
        { label: "music", filesCount: 1233333, size: 999999999 },
        { label: "storage", filesCount: 100000, size: 999999999 },
      ],
    },
  }))
)

jest.mock("Renderer/requests/get-battery-info.request", () =>
  jest.fn(() => ({
    status: DeviceResponseStatus.Ok,
    data: {
      level: 9001,
      charging: false,
      maximumCapacity: 99999,
    },
  }))
)

const defaultProps: Props = {
  backupDeviceState: BackupDeviceDataState.Empty,
  diagnosticSentTimestamp: 0,
  networkLevel: "",
  phoneLockTime: 0,
  deviceType: undefined,
  appLatestVersion: "",
  appUpdateAvailable: undefined,
  appUpdateStepModalDisplayed: false,
  appUpdateStepModalShow: false,
  lowestSupportedOsVersion: undefined,
  lowestSupportedCenterVersion: undefined,
  settingsLoaded: false,
  deviceUnlocked: undefined,
  appAutostart: false,
  appCollectingData: undefined,
  appConversionFormat: ConversionFormat.FLAC,
  appConvert: Convert.ConvertAutomatically,
  appIncomingCalls: false,
  appIncomingMessages: false,
  appLowBattery: false,
  appNonStandardAudioFilesConversion: false,
  appOsUpdates: false,
  appTethering: false,
  appTray: false,
  batteryLevel: 0,
  changeSim: jest.fn(),
  disconnectDevice: jest.fn(),
  deviceConnected: true,
  language: "en-US",
  loadData: jest.fn(),
  networkName: "network name",
  osUpdateDate: "2020-01-14T11:31:08.244Z",
  osVersion: "release-1.0.0",
  pureNeverConnected: false,
  pureOsBackupLocation: "path/location/backup",
  pureOsDownloadLocation: "path/location/download",
  basicInfoDataState: DataState.Empty,
  serialNumber: undefined,
  initialDataLoaded: false,
  appVersion: undefined,
  setCollectingData: jest.fn(),
  simCards: [
    {
      active: true,
      network: "Y-Mobile",
      networkLevel: 0.2,
      number: 12345678,
      slot: 1,
    },
  ],
  toggleDeviceUpdating: jest.fn(),
  updatePhoneOsInfo: jest.fn(),
  updatingState: UpdatingState.Standby,
  memorySpace: {
    free: 100,
    full: 200,
  },
  caseColour: CaseColour.Gray,
}

const render = (extraProps?: Partial<Props>) => {
  const props = {
    ...defaultProps,
    ...extraProps,
  }
  return renderWithThemeAndIntl(
    <Router history={history}>
      <Provider store={store}>
        <Overview {...props} />
      </Provider>
    </Router>
  )
}

describe("`Overview` component", () => {
  describe("when component is render with default props", () => {
    test("loadData is fired when component is mounted", () => {
      const { queryByTestId } = render()
      expect(queryByTestId(NetworkTestIds.BatteryLevel)).toHaveTextContent(
        "0 %"
      )
      expect(queryByTestId(NetworkTestIds.NetworkName)).toHaveTextContent(
        "network name"
      )
      expect(queryByTestId(SystemTestIds.OsVersion)).toHaveTextContent("1.0.0")
    })

    test("any modal from `BackupDeviceFlow` shouldn't be displayed", () => {
      const { queryByTestId } = render()

      expect(
        queryByTestId(BackupDeviceFlowTestIds.BackupDeviceStart)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(BackupDeviceFlowTestIds.BackupDeviceRunning)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(BackupDeviceFlowTestIds.BackupDeviceFinished)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(BackupDeviceFlowTestIds.BackupDeviceError)
      ).not.toBeInTheDocument()
    })
  })

  describe("when `backupDeviceState` property is set to `Running`", () => {
    const extraProps: Partial<Props> = {
      backupDeviceState: BackupDeviceDataState.Running,
    }
    test("should be displayed `BackupModal`", () => {
      const { queryByTestId } = render(extraProps)

      expect(
        queryByTestId(BackupDeviceFlowTestIds.BackupDeviceRunning)
      ).toBeInTheDocument()
      expect(
        queryByTestId(BackupDeviceFlowTestIds.BackupDeviceStart)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(BackupDeviceFlowTestIds.BackupDeviceFinished)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(BackupDeviceFlowTestIds.BackupDeviceError)
      ).not.toBeInTheDocument()
    })
  })

  describe("when `backupDeviceState` property is set to `Finished`", () => {
    const extraProps: Partial<Props> = {
      backupDeviceState: BackupDeviceDataState.Finished,
    }
    test("should be displayed `BackupSuccessModal`", () => {
      const { queryByTestId } = render(extraProps)

      expect(
        queryByTestId(BackupDeviceFlowTestIds.BackupDeviceFinished)
      ).toBeInTheDocument()
      expect(
        queryByTestId(BackupDeviceFlowTestIds.BackupDeviceStart)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(BackupDeviceFlowTestIds.BackupDeviceRunning)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(BackupDeviceFlowTestIds.BackupDeviceError)
      ).not.toBeInTheDocument()
    })
  })

  describe("when `backupDeviceState` property is set to `Error`", () => {
    const extraProps: Partial<Props> = {
      backupDeviceState: BackupDeviceDataState.Error,
    }
    test("should be displayed `BackupFailureModal`", () => {
      const { queryByTestId } = render(extraProps)

      expect(
        queryByTestId(BackupDeviceFlowTestIds.BackupDeviceError)
      ).toBeInTheDocument()
      expect(
        queryByTestId(BackupDeviceFlowTestIds.BackupDeviceStart)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(BackupDeviceFlowTestIds.BackupDeviceRunning)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(BackupDeviceFlowTestIds.BackupDeviceFinished)
      ).not.toBeInTheDocument()
    })
  })
})
