/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import styled from "styled-components"
import {
  Col,
  Group,
  Labels,
  Row,
} from "App/__deprecated__/renderer/components/core/table/table.component"
import { defineMessages } from "react-intl"
import { Size } from "App/__deprecated__/renderer/components/core/input-checkbox/input-checkbox.component"
import { CalendarEvent } from "App/__deprecated__/calendar/store/calendar.interfaces"
import { UseTableSelect } from "App/__deprecated__/renderer/utils/hooks/useTableSelect"
import {
  BaseSelectableCalls,
  Checkbox,
} from "App/__deprecated__/renderer/components/rest/calls/calls-table.styled"
import { CalendarTestIds } from "App/__deprecated__/calendar/components/calendar/calendar-test-ids.enum"
import { List, AutoSizer, ListRowProps } from "react-virtualized"
import { intl } from "App/__deprecated__/renderer/utils/intl"
import EventsListDate from "App/__deprecated__/calendar/components/events-list-date/events-list-date.component"

const messages = defineMessages({
  unnamedEvent: {
    id: "module.calendar.unnamedEvent",
  },
})

const Table = styled(BaseSelectableCalls)`
  --columnsTemplate: 4rem 3fr 3fr;
`

export interface EventsListProps extends UseTableSelect<CalendarEvent> {
  events: CalendarEvent[]
  selectedEventIndex?: number
}

const EventsList: FunctionComponent<EventsListProps> = ({
  events,
  getRowStatus,
  noneRowsSelected,
  selectedEventIndex,
  selectRows,
  selectedRows,
}) => {
  const renderRow = ({ index, style }: ListRowProps) => {
    const { id, name, startDate, endDate } = events[index]
    const { selected } = getRowStatus(events[index])
    const onCheckboxToggle = () => {
      if (selected) {
        selectRows(selectedRows.filter((row) => row.id !== id))
      } else {
        selectRows([
          ...selectedRows,
          ...events.filter((event) => event.id === id),
        ])
      }
    }
    return (
      <Row
        active={selectedEventIndex === index}
        data-testid={CalendarTestIds.Event}
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        key={id + index}
        style={style}
      >
        <Col>
          <Checkbox
            checked={selected}
            onChange={onCheckboxToggle}
            size={Size.Small}
            visible={!noneRowsSelected}
          />
        </Col>
        <Col>{!name ? intl.formatMessage(messages.unnamedEvent) : name}</Col>
        <Col>
          <EventsListDate startDate={startDate} endDate={endDate} />
        </Col>
      </Row>
    )
  }
  return (
    <Table>
      <Group>
        <Labels>
          <Col />
          <Col />
        </Labels>
        <div>
          <AutoSizer disableHeight>
            {({ width }) => (
              <List
                height={595}
                width={width}
                scrollToIndex={selectedEventIndex}
                overscanRowCount={10}
                rowRenderer={renderRow}
                rowCount={events.length}
                rowHeight={64}
              />
            )}
          </AutoSizer>
        </div>
      </Group>
    </Table>
  )
}

export default EventsList
