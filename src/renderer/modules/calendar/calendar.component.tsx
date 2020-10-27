import { defineMessages } from "react-intl"
import React, { useEffect, useRef, useState } from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import CalendarPanel from "Renderer/components/rest/calendar/calendar-panel.component"
import { noop } from "Renderer/utils/noop"
import { CalendarProps } from "Renderer/modules/calendar/calendar.interface"
import { calendarSeed } from "App/seeds/calendar"
import {
  Event,
  EventsList,
  Header,
} from "Renderer/modules/calendar/calendar.styled"
import modalService from "Renderer/components/core/modal/modal.service"
import {
  SyncCalendarModal,
  SynchronizingModal,
  SynchronizingFinishedModal,
  SynchronizingFailedModal,
} from "Renderer/components/rest/calendar/calendar.modals"
import { TemplatesTestIds } from "Renderer/modules/messages/tabs/templates.enum"
import { EmptyState } from "Renderer/components/core/table/table.component"

const messages = defineMessages({
  allEvents: {
    id: "view.name.calendar.allEvents",
  },
  emptyStateTitle: { id: "view.name.calendar.noEvents" },
  emptyStateDescription: {
    id: "view.name.calendar.noEventsDescription",
  },
})

const Calendar: FunctionComponent<CalendarProps> = ({
  events = calendarSeed,
}) => {
  const [, setSync] = useState(1)
  const timeout = useRef<NodeJS.Timeout>()

  const removeTimeoutHandler = () => {
    if (timeout.current) {
      clearTimeout(timeout.current)
    }
  }

  const closeModal = () => modalService.closeModal()

  const openSynchronizingFinishedModal = async () => {
    await modalService.closeModal()
    await modalService.openModal(
      <SynchronizingFinishedModal onDone={closeModal} />
    )
  }

  const openSynchronizingFailedModal = async () => {
    await modalService.closeModal()
    await modalService.openModal(
      <SynchronizingFailedModal onRefresh={openSynchronizingModal} />
    )
  }

  const openSynchronizingModal = async () => {
    await modalService.closeModal()
    await modalService.openModal(<SynchronizingModal />)
    timeout.current = setTimeout(() => {
      setSync((prevSync) => {
        if (prevSync % 3 === 0) {
          openSynchronizingFailedModal()
        } else {
          openSynchronizingFinishedModal()
        }
        return prevSync + 1
      })
    }, 1500)
  }
  const openSyncCalendarModal = async () => {
    await modalService.openModal(
      <SyncCalendarModal onGoogleButtonClick={openSynchronizingModal} />
    )
  }

  useEffect(() => () => removeTimeoutHandler(), [])

  return (
    <>
      <CalendarPanel
        events={events}
        onEventSelect={noop}
        onEventValueChange={noop}
        onSynchroniseClick={openSyncCalendarModal}
      />
      <Header message={messages.allEvents} />
      {events.length > 0 ? (
        <EventsList>
          {events.map((item) => (
            <Event key={item.id} event={item} />
          ))}
        </EventsList>
      ) : (
        <EmptyState
          title={messages.emptyStateTitle}
          description={messages.emptyStateDescription}
          data-testid={TemplatesTestIds.EmptyState}
        />
      )}
    </>
  )
}

export default Calendar
