import createEndpoint from "Backend/endpoints/create-endpoint"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import Adapters from "Backend/adapters/adapters.interface"
import { Contact } from "Renderer/models/phone/phone.interface"
import DeviceResponse from "Backend/adapters/device-response.interface"

const handleGetContactsRequest = ({
  phonebook,
}: Adapters): DeviceResponse<Contact[]> => phonebook.getContacts()

const registerGetContactsRequest = createEndpoint({
  name: IpcRequest.GetContacts,
  handler: handleGetContactsRequest,
})

export default registerGetContactsRequest
