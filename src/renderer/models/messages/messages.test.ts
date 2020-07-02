import { init } from "@rematch/core"
import messages from "Renderer/models/messages/messages"
import { VisibilityFilter } from "Renderer/models/messages/messages.interface"

let store = init({
  models: { messages },
})

beforeEach(() => {
  store = init({
    models: { messages },
  })
})

test("search value changes correctly", () => {
  const desiredSearchValue = "Laladsaidh hsd"
  store.dispatch.messages.changeSearchValue(desiredSearchValue)
  expect(store.getState().messages.searchValue).toBe(desiredSearchValue)
})

test("visibility filter changes correctly", () => {
  const desiredVisibilityFilter = VisibilityFilter.All
  store.dispatch.messages.changeVisibilityFilter(desiredVisibilityFilter)
  expect(store.getState().messages.visibilityFilter).toBe(
    desiredVisibilityFilter
  )
})

test("deletes one of the conversations", () => {
  const messagesIdsToDelete = store.getState().messages.topics[0].id
  const initialConversationsAmount = store.getState().messages.topics.length
  store.dispatch.messages.deleteConversation([messagesIdsToDelete])
  const conversationAmountAfterDeleting = store.getState().messages.topics
    .length
  expect(conversationAmountAfterDeleting).toEqual(
    initialConversationsAmount - 1
  )
})

test("deletes multiple conversations", () => {
  const messagesIdsToDelete = [
    store.getState().messages.topics[0].id,
    store.getState().messages.topics[1].id,
  ]
  const initialConversationsAmount = store.getState().messages.topics.length
  store.dispatch.messages.deleteConversation(messagesIdsToDelete)
  const conversationAmountAfterDeleting = store.getState().messages.topics
    .length
  expect(conversationAmountAfterDeleting).toEqual(
    initialConversationsAmount - messagesIdsToDelete.length
  )
})
