/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcMain } from "electron-better-ipc"
import { IpcFilesSystem } from "App/files-system/constants/ipc-files-system.enum"
import CryptoFileService, {
  CryptoFileOption,
} from "App/files-system/services/crypto-file-service/crypto-file-service"

const registerDecryptFileListener = (): void => {
  ipcMain.answerRenderer<CryptoFileOption, Uint8Array | undefined>(
    IpcFilesSystem.DecryptFile,
    CryptoFileService.decrypt
  )
}

export default registerDecryptFileListener