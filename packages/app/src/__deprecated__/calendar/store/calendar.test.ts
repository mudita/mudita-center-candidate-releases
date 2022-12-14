/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { init } from "@rematch/core"
import calendar from "App/__deprecated__/calendar/store/calendar"
import { mockedCalendars } from "App/__mocks__/calendars-list"
import { eventsData } from "App/__deprecated__/seeds/calendar"
import { getSortedEvents } from "App/__deprecated__/calendar/store/calendar.helpers"
import { ResultState } from "App/contacts/reducers/contacts.interface"
import Mock = jest.Mock
import getEvents from "App/__deprecated__/renderer/requests/get-events.request"

jest.mock("App/__deprecated__/renderer/requests/get-events.request", () =>
  jest.fn(() => ({ data: [{ id: "1" }, { id: "2" }] }))
)

const initStore = () =>
  init({
    models: { calendar },
  })

let store = initStore()

beforeEach(() => {
  store = initStore()
})

afterEach(() => {
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-explicit-any
  ;(getEvents as any).mockClear()
})

test("store returns initial state", () => {
  expect(store.getState()).toMatchInlineSnapshot(`
    Object {
      "calendar": Object {
        "calendars": Array [],
        "events": Array [],
        "resultState": 2,
      },
    }
  `)
})

test("calendars are set properly", () => {
  store.dispatch.calendar.setCalendars(mockedCalendars)
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  expect(store.getState().calendar.calendars).toStrictEqual(mockedCalendars)
})

test("calendars are cleared properly", () => {
  store.dispatch.calendar.setCalendars(mockedCalendars)
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  expect(store.getState().calendar.calendars).toHaveLength(
    mockedCalendars.length
  )
  store.dispatch.calendar.clearCalendars()
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  expect(store.getState().calendar.calendars).toHaveLength(0)
})

test("events are set properly", () => {
  store.dispatch.calendar.setEvents(eventsData)
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  expect(store.getState().calendar.events).toHaveLength(eventsData.length)
})

test("events are sorted by startDate properly", () => {
  const unsortedEvents = [
    {
      id: "test-event-1",
      name: "Felix's Birthday",
      startDate: "2020-01-01T10:00:00.000Z",
      endDate: "2020-01-01T13:00:00.000Z",
    },
    {
      id: "test-event-3",
      name: "Felix's Birthday 3",
      startDate: "2222-02-03T10:00:00.000Z",
      endDate: "2222-02-03T13:00:00.000Z",
    },
    {
      id: "test-event-2",
      name: "Felix's Birthday 2",
      startDate: "2020-01-02T15:00:00.000Z",
      endDate: "2020-01-02T13:00:00.000Z",
    },
  ]

  const sortedEvents = getSortedEvents(unsortedEvents)

  expect(sortedEvents).toHaveLength(unsortedEvents.length)

  for (let i = 0; i < sortedEvents.length - 1; i++) {
    expect(new Date(sortedEvents[i].startDate).getTime()).toBeLessThanOrEqual(
      new Date(sortedEvents[i + 1].startDate).getTime()
    )
  }
})

test("events are cleared properly", () => {
  const events = [
    {
      id: "test-event-1",
      name: "Felix's Birthday",
      startDate: "2020-01-01T10:00:00.000Z",
      endDate: "2020-01-01T13:00:00.000Z",
    },
    {
      id: "test-event-3",
      name: "Felix's Birthday 3",
      startDate: "2222-02-03T10:00:00.000Z",
      endDate: "2222-02-03T13:00:00.000Z",
    },
    {
      id: "test-event-2",
      name: "Felix's Birthday 2",
      startDate: "2020-01-02T15:00:00.000Z",
      endDate: "2020-01-02T13:00:00.000Z",
    },
  ]
  store.dispatch.calendar.setEvents(events)
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  expect(store.getState().calendar.events).toHaveLength(events.length)
  store.dispatch.calendar._devClearAllEvents()
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  expect(store.getState().calendar.events).toHaveLength(0)
})

test("starts with an empty result state", () => {
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  expect(store.getState().calendar.resultState).toBe(ResultState.Empty)
})

test("doesn't load the calendar data if it's already loading", async () => {
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/await-thenable
  await store.dispatch.calendar.loadData()
  expect(getEvents).toHaveBeenCalled()
})

test("it doesn't load when it's already loading", async () => {
  await Promise.all([
    store.dispatch.calendar.loadData(),
    store.dispatch.calendar.loadData(),
  ])
  expect(getEvents).toHaveBeenCalledTimes(1)
})

test("stores the events after data is loaded", async () => {
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/await-thenable
  await store.dispatch.calendar.loadData()
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  expect(store.getState().calendar.events).toEqual([{ id: "1" }, { id: "2" }])
})

test("starts with the empty result state", () => {
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  expect(store.getState().calendar.resultState).toBe(ResultState.Empty)
})

test("sets the loading state when data is in the loading process", async () => {
  jest.spyOn(store.dispatch.calendar, "setResultState")
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/await-thenable
  await store.dispatch.calendar.loadData()
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
  expect((store.dispatch.calendar.setResultState as any).mock.calls[0][0]).toBe(
    ResultState.Loading
  )
})

test("sets the loaded state when data loading is complete", async () => {
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/await-thenable
  await store.dispatch.calendar.loadData()
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  expect(store.getState().calendar.resultState).toBe(ResultState.Loaded)
})

test("sets the error result when loading events fails", async () => {
  ;(getEvents as Mock).mockReturnValue({ error: new Error("failed") })
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/await-thenable
  await store.dispatch.calendar.loadData()
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  expect(store.getState().calendar.resultState).toBe(ResultState.Error)
})
