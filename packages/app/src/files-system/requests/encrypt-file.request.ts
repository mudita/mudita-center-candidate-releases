/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { IpcFilesSystem } from "App/files-system/constants/ipc-files-system.enum"
import { CryptoFileOption } from "App/files-system/services/crypto-file-service/crypto-file-service"

const encryptFile = async (
  option: CryptoFileOption
): Promise<Buffer | undefined> => {
  return await ipcRenderer.callMain(IpcFilesSystem.EncryptFile, option)
}

export default encryptFile
