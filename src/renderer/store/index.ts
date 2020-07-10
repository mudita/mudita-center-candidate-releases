import {
  init,
  RematchDispatch,
  RematchRootState,
  InitConfig,
} from "@rematch/core"
import selectPlugin from "@rematch/select"
import { models, RootModel } from "Renderer/models/models"

import { filesManagerSeed } from "App/seeds/filesManager"
import { messagesSeed } from "App/seeds/messages"
import { templatesSeed } from "App/seeds/templates"
import { phoneSeed } from "App/seeds/phone"

const config: InitConfig<RootModel> = {
  models,
  plugins: [selectPlugin()],
}

if (process.env.NODE_ENV === "development") {
  config.redux = {
    initialState: {
      filesManager: filesManagerSeed,
      messages: messagesSeed,
      templates: templatesSeed,
      phone: phoneSeed,
    },
  }
}

const store = init(config)

export const { select } = store
export type RootState = RematchRootState<typeof models>
export type Store = typeof store
export type Dispatch = RematchDispatch<RootModel>

export default store
