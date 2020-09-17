import styled from "styled-components"
import Table, { Col, Row } from "Renderer/components/core/table/table.component"
import { borderColor } from "Renderer/styles/theming/theme-getters"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { CalendarEventProps } from "Renderer/modules/calendar/calendar.interface"
import { FormattedDate, FormattedTime } from "react-intl"
import React from "react"

export const EventsList = styled(Table)`
  --columnsTemplate: 5fr 3fr 3fr;
  --columnsGap: 4rem;
  border-top: solid 0.1rem ${borderColor("list")};
`

export const Header = styled(Text).attrs({
  displayStyle: TextDisplayStyle.LargeBoldText,
})`
  padding: 4rem 4rem 1.7rem 4rem;
`
export const Event: FunctionComponent<CalendarEventProps> = ({ event }) => {
  const { name, date } = event
  const [startDate, endDate] = date

  return (
    <Row>
      <Col>{name}</Col>
      <Col>
        <FormattedTime value={startDate} /> - <FormattedTime value={endDate} />
      </Col>
      <Col>
        <FormattedDate
          value={startDate}
          year="numeric"
          month="long"
          day="2-digit"
          weekday="long"
        />
      </Col>
    </Row>
  )
}