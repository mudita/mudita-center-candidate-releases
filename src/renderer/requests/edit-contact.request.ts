import { ipcRenderer } from "electron-better-ipc"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import { Contact } from "App/contacts/store/phone.typings"
import DeviceResponse from "Backend/adapters/device-response.interface"

const editContact = (contact: Contact): Promise<DeviceResponse<Contact>> => {
  return ipcRenderer.callMain(IpcRequest.EditContact, contact)
}

export default editContact
