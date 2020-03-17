import { ipcMain } from "electron-better-ipc"
import { app } from "electron"
import { name } from "../../../package.json"
import {
  DownloadFinished,
  DownloadListener,
} from "Renderer/interfaces/file-download.interface"
import { createDownloadChannels } from "App/main/functions/create-download-listener-registrar"

export const PureOsDownloadChannels = createDownloadChannels("os")

const registerPureOsDownloadListener = (
  registerDownloadListener: (
    params: DownloadListener
  ) => Promise<DownloadFinished>
) => {
  ipcMain.answerRenderer(
    PureOsDownloadChannels.start,
    ({ url }: { url: string }) => {
      return registerDownloadListener({
        url,
        path: `${app.getPath("appData")}/${name}/pure-os/`,
        channels: PureOsDownloadChannels,
      })
    }
  )
}

export default registerPureOsDownloadListener