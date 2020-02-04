import DisconnectInfo from "Common/interfaces/disconnect-info"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import { ipcRenderer } from "electron-better-ipc"

const disconnectDevice = (): Promise<DisconnectInfo> =>
  ipcRenderer.callMain(IpcRequest.DisconnectDevice) as Promise<DisconnectInfo>

export default disconnectDevice