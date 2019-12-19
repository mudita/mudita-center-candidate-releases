import { ChangeEvent } from "react"

export interface Caller {
  id: string
  forename: string
  surname: string
  phone: string
  avatar?: string
}

export interface Message {
  id: string
  date: string
  content: string
  isCaller: boolean
}

export interface Topic {
  id: string
  caller: Caller
  unread: boolean
  messages: Message[]
}

export enum VisibilityFilter {
  All = "all",
  Unread = "unread",
}

export type StateProps = Readonly<{
  topics: Topic[]
  searchValue: string
  visibilityFilter: VisibilityFilter
}>

export type ComponentProps = StateProps &
  Readonly<{
    changeSearchValue: (event: ChangeEvent<HTMLInputElement>) => void
    changeVisibilityFilter: (filter: VisibilityFilter) => void
    list: Topic[]
  }>
