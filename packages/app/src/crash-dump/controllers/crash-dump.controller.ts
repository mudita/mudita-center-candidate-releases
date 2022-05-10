/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Controller, IpcEvent } from "App/core/decorators"
import { RequestResponse } from "App/core/types"
import { AppSettingsService } from "App/app-settings/services"
import { ControllerPrefix, IpcCrashDumpEvent } from "App/crash-dump/constants"
import { CrashDumpService } from "App/crash-dump/services"

@Controller(ControllerPrefix)
export class CrashDumpController {
  constructor(
    private crashDumpService: CrashDumpService,
    private settingsService: AppSettingsService
  ) {}

  @IpcEvent(IpcCrashDumpEvent.DownloadFiles)
  public async downloadFile(): Promise<RequestResponse<string[]>> {
    const result = await this.crashDumpService.downloadDeviceCrashDumpFiles()
    this.settingsService.updateAppSettings({
      key: "ignoredCrashDumps",
      value: [],
    })
    return result
  }

  @IpcEvent(IpcCrashDumpEvent.GetFiles)
  public async getFiles(): Promise<RequestResponse<string[]>> {
    return this.crashDumpService.getDeviceCrashDumpFiles()
  }

  @IpcEvent(IpcCrashDumpEvent.Ignore)
  public async ignoreFile(url: string): Promise<void> {
    const ignoredCrashDumps =
      this.settingsService.getAppSettings().ignoredCrashDumps || []
    const updatedUniqueList = [...new Set([...ignoredCrashDumps, url])]
    this.settingsService.updateAppSettings({
      key: "ignoredCrashDumps",
      value: updatedUniqueList,
    })
  }
}