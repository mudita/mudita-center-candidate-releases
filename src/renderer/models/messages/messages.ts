import { Slicer } from "@rematch/select"
import { StateProps } from "Renderer/models/messages/messages.interface"
import { rowsMessages } from "Renderer/components/core/table/table.fake-data"
import {
  filterTopics,
  searchTopics,
  sortTopics,
} from "Renderer/models/messages/utils/topics-utils"

const initialState: StateProps = {
  topics: rowsMessages,
  searchValue: "",
}

export default {
  state: initialState,
  reducers: {
    changeSearchValue(
      state: StateProps,
      searchValue: StateProps["searchValue"]
    ) {
      return { ...state, searchValue }
    },
    changeVisibilityFilter(
      state: StateProps,
      visibilityFilter: StateProps["visibilityFilter"]
    ) {
      return { ...state, visibilityFilter }
    },
    deleteConversation(state: StateProps, ids: string[]) {
      const toBeDeletedConversationsIds = ids
      const topics = state.topics.filter(
        ({ id }) => !toBeDeletedConversationsIds.includes(id)
      )
      return { ...state, topics }
    },
  },
  selectors: (slice: Slicer<StateProps>) => ({
    filteredList() {
      return slice(state => {
        let list = state.topics
        list = searchTopics(list, state.searchValue)
        list = filterTopics(list, state.visibilityFilter)
        return sortTopics(list)
      })
    },
  }),
}
