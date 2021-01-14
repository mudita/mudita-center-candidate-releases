import { ipcRenderer } from "electron-better-ipc"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import { Contact } from "App/contacts/store/phone.typings"

export const exportContacts = (contacts: Contact[]) => {
  return ipcRenderer.callMain(IpcRequest.ExportContacts, contacts)
}
