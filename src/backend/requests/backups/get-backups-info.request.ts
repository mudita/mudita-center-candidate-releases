import Adapters from "Backend/adapters/adapters.interface"
import createEndpoint from "Backend/endpoints/create-endpoint"
import BackupInfo from "Common/interfaces/backup-info"
import { IpcRequest } from "Common/requests/ipc-request.enum"

const handleBackupsInfoRequest = ({ pureBackups }: Adapters): BackupInfo => ({
  backups: pureBackups.getBackups(),
})

const registerBackupsInfoRequest = createEndpoint({
  name: IpcRequest.GetBackupsInfo,
  handler: handleBackupsInfoRequest,
})

export default registerBackupsInfoRequest