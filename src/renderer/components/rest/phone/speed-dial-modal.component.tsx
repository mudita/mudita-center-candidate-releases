import React from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import Modal from "Renderer/components/core/modal/modal.component"
import { ModalSize } from "Renderer/components/core/modal/modal.interface"
import { noop } from "Renderer/utils/noop"
import { Contact } from "Renderer/models/phone/phone.typings"
import Table, {
  Col,
  Labels,
  Row,
  RowSize,
} from "Renderer/components/core/table/table.component"
import styled, { css } from "styled-components"
import { defineMessages } from "react-intl"
import { intl } from "Renderer/utils/intl"
import { createFullName } from "Renderer/models/phone/phone.helpers"
import InputSelect, {
  RenderListItemProps,
  renderSearchableText,
  SelectInputItem,
} from "Renderer/components/core/input-select/input-select.component"
import { SpeedDialProps } from "Renderer/components/rest/phone/speed-dial-modal.container"

const SpeedDialTable = styled(Table)`
  --labelBackground: none;
  margin: 1.6rem 0 4rem 0;
`

const ModalComponent = styled(Modal)`
  ${Labels} {
    border: none;

    ${Col} {
      :first-child {
        padding-left: 0;
      }
    }
  }
`

const messages = defineMessages({
  title: { id: "view.name.phone.contacts.modal.speedDial.title" },
  saveButton: { id: "view.name.phone.contacts.modal.speedDial.saveButton" },
  cancelButton: { id: "view.name.phone.contacts.modal.speedDial.cancelButton" },
  speedDialLabel: {
    id: "view.name.phone.contacts.modal.speedDial.speedDialLabel",
  },
  contactLabel: { id: "view.name.phone.contacts.modal.speedDial.contactLabel" },
  none: {
    id: "view.name.phone.contacts.edit.speedDialKeyEmptyOption",
  },
})

const valueRender = (item: Contact) => createFullName(item)
const itemRender = ({
  item,
  searchString,
  props,
}: RenderListItemProps<Contact>) => {
  const name = createFullName(item)

  if (name) {
    return (
      <SelectInputItem {...props}>
        {renderSearchableText(name, searchString)}
      </SelectInputItem>
    )
  }

  return <SelectInputItem {...props} />
}
const filterFn = (item: Contact, query: string) => {
  const fullName = createFullName(item).toLowerCase()
  return fullName.includes(query.toLowerCase())
}

const StyledInputSelect = styled(InputSelect)`
  label {
    border: 0;
    padding-top: 1rem;
  }
`

const SpeedDialModal: FunctionComponent<SpeedDialProps> = ({
  editContact,
  onSave = noop,
  onClose = noop,
  flatList = [],
}) => {
  const speedDialList = Array.from({ length: 9 })
    .fill(null)
    .map((_, i) => {
      const speedDial = i + 1

      return {
        [speedDial]: flatList.find(
          (contact) => contact.speedDial === speedDial
        ),
      }
    })

  const availableContacts = flatList.filter(
    (item: Contact) =>
      item.id !== "0" && (Boolean(item.firstName) || Boolean(item.lastName))
  )

  return (
    <ModalComponent
      title={intl.formatMessage(messages.title)}
      size={ModalSize.Medium}
      onActionButtonClick={onSave}
      actionButtonLabel={intl.formatMessage(messages.saveButton)}
      onClose={onClose}
      closeButtonLabel={intl.formatMessage(messages.cancelButton)}
    >
      <SpeedDialTable>
        <Labels size={RowSize.Small}>
          <Col>{intl.formatMessage(messages.speedDialLabel)}</Col>
          <Col>{intl.formatMessage(messages.contactLabel)}</Col>
        </Labels>
        {speedDialList.map((item: Record<number, Contact | undefined>, i) => {
          const speedDial = i + 1
          const contact = item[speedDial]

          const onChange = (contact: Contact) => {
            editContact(contact.id, { ...contact, speedDial })
          }

          return (
            <Row size={RowSize.Small} key={i}>
              <Col>{speedDial}</Col>
              <Col>
                <StyledInputSelect
                  searchable
                  options={availableContacts}
                  value={
                    contact
                      ? contact
                      : { firstName: intl.formatMessage(messages.none) }
                  }
                  emptyOption={intl.formatMessage(messages.none)}
                  renderValue={valueRender}
                  renderListItem={itemRender}
                  onSelect={onChange}
                  filteringFunction={filterFn}
                  listStyles={css`
                    max-height: 30rem;
                  `}
                />
              </Col>
            </Row>
          )
        })}
      </SpeedDialTable>
    </ModalComponent>
  )
}

export default SpeedDialModal
