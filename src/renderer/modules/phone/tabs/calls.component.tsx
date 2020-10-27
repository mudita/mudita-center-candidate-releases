import React from "react"
import { Details } from "Renderer/components/rest/calls/call-details.types"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { noop } from "Renderer/utils/noop"
import { VisibilityFilter } from "App/renderer/models/calls/calls.interface"
import CallsHeader from "Renderer/components/rest/calls/calls-header.component"
import CallsTable from "Renderer/components/rest/calls/calls-table.component"
import useTableSelect from "Renderer/utils/hooks/useTableSelect"
import modalService from "Renderer/components/core/modal/modal.service"
import { defineMessages } from "react-intl"
import { intl, textFormatters } from "Renderer/utils/intl"
import DeleteModal from "Renderer/components/core/modal/delete-modal.component"
import { createFullName } from "Renderer/models/phone/phone.helpers"

const messages = defineMessages({
  title: { id: "view.name.calls.deleteTitle" },
  body: { id: "view.name.calls.deleteBody" },
})

export interface CallsProps {
  changeVisibilityFilter?: (filter: VisibilityFilter) => void
  calls: Details[]
  deleteCall?: (ids: string[]) => void
  isTopicThreadOpened: (phoneNumber: string) => boolean
  isContactCreated: (phoneNumber: string) => boolean
}

const Calls: FunctionComponent<CallsProps> = ({
  calls,
  changeVisibilityFilter = noop,
  deleteCall = noop,
  isTopicThreadOpened,
  isContactCreated,
}) => {
  const {
    selectedRows,
    getRowStatus,
    toggleRow,
    noneRowsSelected,
    toggleAll,
    allRowsSelected,
    resetRows,
  } = useTableSelect<Details>(calls)

  const openDeleteModal = (details: Details) => {
    const callerName =
      createFullName(details.caller) || details.caller.phoneNumber
    const callsCount = details.timesMissed || 1
    const modalConfig = {
      title: intl.formatMessage({ ...messages.title }),
      message: {
        ...messages.body,
        values: { ...textFormatters, num: callsCount, name: callerName },
      },
    }

    const handleDelete = async () => {
      modalService.rerenderModal(<DeleteModal {...modalConfig} deleting />)

      deleteCall([details.id])

      await modalService.closeModal()
    }

    modalService.openModal(
      <DeleteModal {...modalConfig} onDelete={handleDelete} />
    )
  }

  return (
    <>
      <CallsHeader
        changeVisibilityFilter={changeVisibilityFilter}
        toggleAll={toggleAll}
        allRowsSelected={allRowsSelected}
        deleteCall={deleteCall}
        selectedCalls={selectedRows}
        resetRows={resetRows}
      />
      <CallsTable
        deleteCall={openDeleteModal}
        calls={calls}
        getRowStatus={getRowStatus}
        toggleRow={toggleRow}
        noneRowsSelected={noneRowsSelected}
        isTopicThreadOpened={isTopicThreadOpened}
        isContactCreated={isContactCreated}
      />
    </>
  )
}

export default Calls
