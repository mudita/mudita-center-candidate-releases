/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createReducer } from "@reduxjs/toolkit"
import {
  fulfilledAction,
  pendingAction,
  rejectedAction,
} from "App/__deprecated__/renderer/store/helpers"
import {
  AddNewMessageAction,
  ChangeSearchValueAction,
  ChangeVisibilityFilterAction,
  DeleteThreadsAction,
  MessageIdsInThreadMap,
  MessageMap,
  MessagesState,
  ResultState,
  ThreadMap,
  MarkThreadsReadStatusPendingAction,
  ToggleThreadsReadStatusPendingAction,
  VisibilityFilter,
  MarkThreadsReadStatusAction,
} from "App/messages/reducers/messages.interface"
import { MessagesEvent, ThreadDeletingState } from "App/messages/constants"
import { DataSyncEvent } from "App/data-sync/constants"
import { ReadAllIndexesAction } from "App/data-sync/reducers"
import { markThreadsReadStatus } from "App/messages/reducers/messages-reducer.helpers"

export const initialState: MessagesState = {
  threadMap: {},
  messageMap: {},
  messageIdsInThreadMap: {},
  searchValue: "",
  threadsState: ResultState.Empty,
  visibilityFilter: VisibilityFilter.All,
  messagesStateMap: {},
  error: null,
  deletingState: null,
}

export const messagesReducer = createReducer<MessagesState>(
  initialState,
  (builder) => {
    builder
      .addCase(
        fulfilledAction(MessagesEvent.AddNewMessage),
        (state, action: AddNewMessageAction) => {
          const messageParts = action.payload.messageParts
          const prevMessageMap = { ...state.messageMap }
          const prevMessageIdsInThreadMap = { ...state.messageIdsInThreadMap }
          const prevThreadMap: ThreadMap = { ...state.threadMap }

          for (const { message, thread } of messageParts) {
            prevMessageMap[message.id] = message

            const messageIds: string[] =
              prevMessageIdsInThreadMap[message.threadId] ?? []
            prevMessageIdsInThreadMap[message.threadId] = messageIds.find(
              (id) => id === message.id
            )
              ? messageIds
              : [...messageIds, message.id]

            if (thread) {
              prevThreadMap[thread.id] = thread
            }
          }

          return {
            ...state,
            messageMap: prevMessageMap,
            messageIdsInThreadMap: prevMessageIdsInThreadMap,
            threadMap: prevThreadMap,
          }
        }
      )

      .addCase(
        pendingAction(MessagesEvent.ToggleThreadsReadStatus),
        (state, action: ToggleThreadsReadStatusPendingAction) => {
          const threads = action.meta.arg
          const ids = threads.map((thread) => thread.id)
          const threadMap = Object.keys(state.threadMap).reduce(
            (prevThreadMap, id) => {
              if (ids.includes(id)) {
                const thread = prevThreadMap[id]
                prevThreadMap[id] = {
                  ...thread,
                  unread: !thread.unread,
                }
                return prevThreadMap
              } else {
                return prevThreadMap
              }
            },
            { ...state.threadMap }
          )

          return { ...state, threadMap }
        }
      )

      .addCase(
        pendingAction(MessagesEvent.MarkThreadsReadStatus),
        (state, action: MarkThreadsReadStatusPendingAction) => {
          const threads = action.meta.arg
          const threadMap = markThreadsReadStatus(threads, state.threadMap)
          return { ...state, threadMap }
        }
      )
      .addCase(
        fulfilledAction(MessagesEvent.MarkThreadsReadStatus),
        (state, action: MarkThreadsReadStatusAction) => {
          const threads = action.meta.arg
          const threadMap = markThreadsReadStatus(threads, state.threadMap)
          return { ...state, threadMap }
        }
      )

      .addCase(
        fulfilledAction(MessagesEvent.DeleteThreads),
        (state, action: DeleteThreadsAction) => {
          const ids = action.payload
          const threadMap = { ...state.threadMap }
          const messageIdsInThreadMap = { ...state.messageIdsInThreadMap }

          ids.forEach((id) => {
            delete threadMap[id]
            delete messageIdsInThreadMap[id]
          })

          const messageMap = Object.keys(state.messageMap).reduce(
            (prevMessageMap, id) => {
              const { threadId } = state.messageMap[id]
              if (ids.includes(threadId)) {
                return prevMessageMap
              } else {
                prevMessageMap[id] = state.messageMap[id]
                return prevMessageMap
              }
            },
            {} as MessageMap
          )

          return {
            ...state,
            deletingState: ThreadDeletingState.Success,
            messageMap,
            threadMap,
            messageIdsInThreadMap,
          }
        }
      )

      .addCase(pendingAction(MessagesEvent.DeleteThreads), (state) => {
        return {
          ...state,
          deletingState: ThreadDeletingState.Deleting,
        }
      })

      .addCase(rejectedAction(MessagesEvent.DeleteThreads), (state) => {
        return {
          ...state,
          deletingState: ThreadDeletingState.Fail,
        }
      })

      .addCase(MessagesEvent.HideDeleteModal, (state) => {
        return {
          ...state,
          deletingState: null,
        }
      })

      .addCase(
        MessagesEvent.ChangeVisibilityFilter,
        (state, action: ChangeVisibilityFilterAction) => {
          const visibilityFilter = action.payload
          return { ...state, visibilityFilter }
        }
      )

      .addCase(
        MessagesEvent.ChangeSearchValue,
        (state, action: ChangeSearchValueAction) => {
          const searchValue = action.payload
          return { ...state, searchValue }
        }
      )

      .addCase(MessagesEvent.ClearAllThreads, (state) => {
        return {
          ...state,
          threadMap: {},
          messageMap: {},
          messageIdsInThreadMap: {},
        }
      })

      .addCase(
        fulfilledAction(DataSyncEvent.ReadAllIndexes),
        (state, action: ReadAllIndexesAction) => {
          return {
            ...state,
            threadMap: action.payload.threads,
            messageMap: action.payload.messages,
            messageIdsInThreadMap: Object.keys(action.payload.messages)
              .map((messageKey) => {
                return action.payload.messages[messageKey]
              })
              .reduce((prev: MessageIdsInThreadMap, message) => {
                const messageIds: string[] = prev[message.threadId] ?? []
                prev[message.threadId] = messageIds.find(
                  (id) => id === message.id
                )
                  ? messageIds
                  : [...messageIds, message.id]

                return prev
              }, {}),
            threadsState: ResultState.Loaded,
          }
        }
      )
  }
)
