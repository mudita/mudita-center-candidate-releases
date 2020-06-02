import { ChangeEvent } from "react"

export interface Caller {
  id: string
  firstName: string
  lastName: string
  phoneNumber: string
}

export interface Message {
  id: string
  date: string
  content: string[]
  interlocutor?: boolean
  author: {
    firstName: string
    lastName: string
  }
}

export interface Topic {
  id: string
  caller: Caller
  unread: boolean
  messages: Message[]
  contact: boolean
}

export enum VisibilityFilter {
  All = "all",
  Unread = "unread",
}

export type StateProps = Readonly<{
  topics?: Topic[]
  searchValue: string
  visibilityFilter?: VisibilityFilter
}>

export type ComponentProps = StateProps &
  Readonly<{
    changeSearchValue?: (event: ChangeEvent<HTMLInputElement>) => void
    changeVisibilityFilter?: (filter: VisibilityFilter) => void
    list: Topic[]
  }>
