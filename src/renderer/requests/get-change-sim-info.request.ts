import DisconnectInfo from "Common/interfaces/disconnect-info"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import { ipcRenderer } from "electron-better-ipc"

const getChangeSimRequest = (): Promise<DisconnectInfo> =>
  ipcRenderer.callMain(IpcRequest.GetChangeSimInfo) as Promise<DisconnectInfo>

export default getChangeSimRequest
