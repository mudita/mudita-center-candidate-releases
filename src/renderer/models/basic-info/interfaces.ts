import { Filename } from "Renderer/interfaces/file-download.interface"

export interface OsUpdateAvailability {
  filename?: Filename
  available?: boolean
  downloaded?: boolean
}

export interface SimCard {
  readonly network?: string
  readonly number: number
  readonly slot: 1 | 2
  readonly active: boolean
}

export interface MemorySpace {
  readonly free: number
  readonly full: number
}

export interface StoreValues {
  readonly batteryLevel: number
  readonly networkName: string
  readonly osVersion: string
  readonly osUpdateDate: number
  readonly memorySpace: MemorySpace
  readonly lastBackup: string
  readonly simCards: SimCard[]
  readonly osUpdateFilename: Filename
  readonly osUpdateAvailable: boolean
  readonly osUpdateAlreadyDownloaded: boolean
}

interface StoreEffects {
  readonly changeSim: (card: SimCard) => void
  readonly loadData: () => void
  readonly disconnectDevice: () => void
  readonly setOsInfo: () => void
}

export type Store = StoreValues & StoreEffects
