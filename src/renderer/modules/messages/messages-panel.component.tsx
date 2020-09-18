import React, { ChangeEvent, useState } from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { UnreadFilters } from "Renderer/components/rest/messages/topics-table.component"
import ButtonToggler from "Renderer/components/core/button-toggler/button-toggler.component"
import { intl, textFormatters } from "Renderer/utils/intl"
import { searchIcon } from "Renderer/components/core/input-text/input-text.elements"
import Button from "Renderer/components/core/button/button.component"
import ButtonComponent from "Renderer/components/core/button/button.component"
import {
  DisplayStyle,
  Size as ButtonSize,
} from "Renderer/components/core/button/button.config"
import { noop } from "Renderer/utils/noop"
import { Type } from "Renderer/components/core/icon/icon.config"
import { UseTableSelect } from "Renderer/utils/hooks/useTableSelect"
import {
  Topic,
  VisibilityFilter,
} from "Renderer/models/messages/messages.interface"
import { messages } from "Renderer/components/rest/messages/templates/templates-panel.component"
import { Size } from "Renderer/components/core/input-checkbox/input-checkbox.component"
import {
  ButtonWrapper,
  MessageFiltersWrapper,
  MessagesButtonTogglerItem,
  MessageSelectionManager,
  SearchInput,
} from "Renderer/modules/messages/messages-panel.styled"
import { MessagePanelTestIds } from "Renderer/modules/messages/messages-panel-test-ids.enum"
import modalService from "Renderer/components/core/modal/modal.service"
import { uniqBy } from "lodash"
import { defineMessages } from "react-intl"
import { isNameAvailable } from "Renderer/components/rest/messages/is-name-available"
import { createFullName } from "Renderer/models/phone/phone.helpers"
import DeleteModal from "Renderer/components/core/modal/delete-modal.component"

const toggleState = [
  intl.formatMessage({
    id: "view.name.messages.allMessages",
  }),
  intl.formatMessage({
    id: "view.name.messages.unreadOnly",
  }),
] as const

const deleteModalMessages = defineMessages({
  title: { id: "view.name.messages.deleteModal.title" },
  text: { id: "view.name.messages.deleteModal.text" },
  uniqueText: { id: "view.name.messages.deleteModal.uniqueText" },
})

const panelMessages = defineMessages({
  markAsReadButton: { id: "view.name.messages.markAsRead" },
})

interface Props {
  showAllMessages?: () => void
  hideReadMessages?: () => void
  selectedConversations: Topic[]
  deleteConversation: (ids: string[]) => void
  searchValue: string
  changeSearchValue?: (event: ChangeEvent<HTMLInputElement>) => void
  selectedItemsCount: number
  allItemsSelected?: boolean
  toggleAll?: UseTableSelect<Topic>["toggleAll"]
  resetRows: UseTableSelect<Topic>["resetRows"]
  visibilityFilter?: VisibilityFilter
  markAsRead: (ids: string[]) => void
}

const MessagesPanel: FunctionComponent<Props> = ({
  showAllMessages = noop,
  hideReadMessages = noop,
  searchValue,
  changeSearchValue,
  selectedItemsCount,
  allItemsSelected,
  toggleAll = noop,
  deleteConversation,
  selectedConversations,
  resetRows,
  visibilityFilter,
  markAsRead,
}) => {
  const [activeLabel, setActiveLabel] = useState(toggleState[0])
  const selectionMode = selectedItemsCount > 0
  const openDeleteModal = () => {
    const selectedConversationsIds = selectedConversations.map(({ id }) => id)
    const uniqueSelectedRows = uniqBy(selectedConversations, "caller.id")
    const uniqueCaller = uniqueSelectedRows[0].caller
    const nameAvailable = isNameAvailable(uniqueCaller)
    const caller = nameAvailable
      ? createFullName(uniqueCaller)
      : uniqueCaller.primaryPhoneNumber
    const textIntlValues = {
      num: allItemsSelected ? -1 : selectedConversationsIds.length,
      ...textFormatters,
    }
    const onDelete = () => {
      deleteConversation(selectedConversationsIds)
      resetRows()
      modalService.closeModal()
    }
    const modalConfig = {
      title: intl.formatMessage(deleteModalMessages.title),
      message:
        uniqueSelectedRows.length > 1
          ? {
              ...deleteModalMessages.text,
              values: {
                ...textIntlValues,
              },
            }
          : {
              ...deleteModalMessages.uniqueText,
              values: {
                ...textIntlValues,
                caller,
              },
            },
      onDelete,
      onClose: resetRows,
    }
    modalService.openModal(<DeleteModal {...modalConfig} />)
  }
  const openModal = () => openDeleteModal()
  const onMarkAsRead = () => {
    const selectedConversationsIds = selectedConversations.map(({ id }) => id)
    markAsRead(selectedConversationsIds)
    resetRows()
  }
  return (
    <MessageFiltersWrapper selectionMode={selectionMode}>
      {!selectionMode && (
        <UnreadFilters data-testid={MessagePanelTestIds.FilterButtons}>
          <ButtonToggler>
            {toggleState.map((label, i) => {
              const toggle = () => {
                i === 0 ? showAllMessages() : hideReadMessages()
                setActiveLabel(label)
              }
              return (
                <MessagesButtonTogglerItem
                  key={i}
                  label={label}
                  onClick={toggle}
                  active={activeLabel === label}
                />
              )
            })}
          </ButtonToggler>
        </UnreadFilters>
      )}
      {selectionMode ? (
        <MessageSelectionManager
          selectedItemsNumber={selectedItemsCount}
          allItemsSelected={Boolean(allItemsSelected)}
          message={{ id: "view.name.messages.conversations.selectionsNumber" }}
          checkboxSize={Size.Large}
          onToggle={toggleAll}
          buttons={[
            visibilityFilter === VisibilityFilter.Unread && (
              <ButtonComponent
                key="read"
                label={intl.formatMessage(panelMessages.markAsReadButton)}
                displayStyle={DisplayStyle.Link1}
                Icon={Type.Check}
                onClick={onMarkAsRead}
                data-testid={
                  MessagePanelTestIds.SelectionManagerMarkAsReadButton
                }
              />
            ),
            <ButtonComponent
              key="delete"
              label={intl.formatMessage(messages.deleteButton)}
              displayStyle={DisplayStyle.Link1}
              Icon={Type.Delete}
              onClick={openModal}
              data-testid={MessagePanelTestIds.SelectionManagerDeleteButton}
            />,
          ]}
          data-testid={MessagePanelTestIds.SelectionManager}
        />
      ) : (
        <SearchInput
          type={"search"}
          label={intl.formatMessage({
            id: "view.name.messages.search",
          })}
          outlined
          defaultValue={searchValue}
          onChange={changeSearchValue}
          leadingIcons={[searchIcon]}
        />
      )}
      <ButtonWrapper>
        <Button
          displayStyle={DisplayStyle.Primary}
          size={ButtonSize.FixedBig}
          label={intl.formatMessage({
            id: "view.name.messages.newMessage",
          })}
          onClick={noop}
          Icon={Type.PlusSign}
        />
      </ButtonWrapper>
    </MessageFiltersWrapper>
  )
}

export default MessagesPanel
