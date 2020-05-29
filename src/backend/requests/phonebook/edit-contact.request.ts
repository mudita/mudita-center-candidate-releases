import createEndpoint from "Backend/endpoints/create-endpoint"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import Adapters from "Backend/adapters/adapters.interface"
import { Contact } from "Renderer/models/phone/phone.interface"
import DeviceResponse from "Backend/adapters/device-response.interface"

const handleEditContactRequest = (
  { phonebook }: Adapters,
  contact: Contact
): DeviceResponse<Contact> => {
  return phonebook.editContact(contact)
}

const registerEditContactRequest = createEndpoint({
  name: IpcRequest.EditContact,
  handler: handleEditContactRequest,
})

export default registerEditContactRequest