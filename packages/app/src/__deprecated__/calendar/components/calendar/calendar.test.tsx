/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import { Router } from "react-router"
import history from "App/__deprecated__/renderer/routes/history"
import React from "react"
import { calendarSeed } from "App/__deprecated__/seeds/calendar"
import { CalendarTestIds } from "App/__deprecated__/calendar/components/calendar/calendar-test-ids.enum"
import { mockAllIsIntersecting } from "react-intersection-observer/test-utils"
import { Provider } from "react-redux"
import store from "App/__deprecated__/renderer/store"
import CalendarUI from "App/__deprecated__/calendar/components/calendar/calendar.component"
import { mockedCalendars } from "App/__mocks__/calendars-list"

const defaultProps = {
  events: calendarSeed.events,
  calendars: mockedCalendars,
  loadCalendars: jest.fn(),
  loadEvents: jest.fn(),
  _devClearAllEvents: jest.fn(),
  setEvents: jest.fn(),
}

jest.mock("react-virtualized", () => {
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const ReactVirtualized = jest.requireActual("react-virtualized")
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return {
    ...ReactVirtualized,
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
    AutoSizer: ({ children }: any) => children({ height: 1000, width: 1000 }),
  }
})

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/ban-types
const renderer = (extraProps?: {}) => {
  const props = {
    ...defaultProps,
    ...extraProps,
  }

  return renderWithThemeAndIntl(
    <Router history={history}>
      <Provider store={store}>
        <CalendarUI {...props} />
      </Provider>
    </Router>
  )
}

test("renders correct amount of events", () => {
  const { getAllByTestId } = renderer()
  mockAllIsIntersecting(true)
  expect(getAllByTestId(CalendarTestIds.Event)).toHaveLength(
    calendarSeed.events.length
  )
})

test("empty state renders when there is no events available", () => {
  const { getByTestId } = renderer({ events: [] })
  expect(getByTestId(CalendarTestIds.NoEvents)).toBeInTheDocument()
})
