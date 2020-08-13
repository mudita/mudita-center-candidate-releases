import React, { useEffect, useState } from "react"
import Button from "Renderer/components/core/button/button.component"
import ContactList from "Renderer/components/rest/phone/contact-list.component"
import ContactPanel, {
  ContactPanelProps,
} from "Renderer/components/rest/phone/contact-panel.component"
import { backgroundColor } from "Renderer/styles/theming/theme-getters"
import FunctionComponent from "Renderer/types/function-component.interface"
import styled from "styled-components"
import { TableWithSidebarWrapper } from "Renderer/components/core/table/table.component"
import ContactDetails, {
  ContactActions,
  ContactDetailsActions,
} from "Renderer/components/rest/phone/contact-details.component"
import useTableSidebar from "Renderer/utils/hooks/useTableSidebar"
import {
  Contact,
  NewContact,
  ResultsState,
  Store,
} from "Renderer/models/phone/phone.interface"
import ContactEdit, {
  defaultContact,
} from "Renderer/components/rest/phone/contact-edit.component"
import { noop } from "Renderer/utils/noop"
import modalService from "Renderer/components/core/modal/modal.service"
import SpeedDialModal from "Renderer/components/rest/phone/speed-dial-modal.component"
import BlockContactModal from "Renderer/components/rest/phone/block-contact-modal.component"
import { createFullName } from "Renderer/models/phone/phone.helpers"
import DevModeWrapper from "Renderer/components/rest/dev-mode-wrapper/dev-mode-wrapper.container"
import { intl, textFormatters } from "Renderer/utils/intl"
import DeleteModal from "App/renderer/components/core/modal/delete-modal.component"
import { ContactID } from "Renderer/models/phone/phone.typings"
import { findMultipleContacts } from "Renderer/models/phone/phone.helpers"

const ContactSection = styled.section`
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${backgroundColor("minor")};
`

export type PhoneProps = ContactActions &
  ContactPanelProps &
  ContactDetailsActions & {
    onSpeedDialSettingsSave: (contacts?: Contact[]) => void
    getContact: (id: ContactID) => Contact
    flatList: Contact[]
  } & Partial<Store>

const Phone: FunctionComponent<PhoneProps> = (props) => {
  const {
    addContact = noop,
    editContact = noop,
    deleteContacts = noop,
    contactList = [],
    flatList,
    onSearchTermChange,
    onManageButtonClick,
    onCall,
    onMessage,
    onSpeedDialSettingsSave,
    savingContact,
    getContact,
  } = props
  const { openSidebar, closeSidebar, activeRow } = useTableSidebar<Contact>()
  const [newContact, setNewContact] = useState<NewContact>()
  const [editedContact, setEditedContact] = useState<Contact>()
  const [contacts, setContacts] = useState(contactList)
  const detailsEnabled = activeRow && !newContact && !editedContact

  const speedDialFindQuery = ({ speedDial }: any) => Boolean(speedDial)
  const speedDialMapQuery = (item: ContactID) => getContact(item)
  const speedDialSortQuery = (a: Contact, b: Contact) => {
    if (a.speedDial && b.speedDial) {
      if (a.speedDial > b.speedDial) {
        return 1
      } else if (a.speedDial < b.speedDial) {
        return -1
      }

      return 0
    }

    return 0
  }
  const speedDialContactsBase = findMultipleContacts(
    flatList,
    speedDialFindQuery
  )

  const speedDialContacts = speedDialContactsBase
    ?.map(speedDialMapQuery)
    .sort(speedDialSortQuery)

  useEffect(() => {
    setContacts(contactList)
  }, [contactList])

  const handleNameUpdate = ({
    firstName,
    lastName,
  }: Pick<Contact, "firstName" | "lastName">) => {
    if (!editedContact) {
      setNewContact({
        ...(newContact as Contact),
        firstName,
        lastName,
      })
    }
  }

  const handleAddingContact = () => {
    closeSidebar()
    setNewContact(defaultContact)
  }

  const cancelAddingContact = () => {
    closeSidebar()
    setNewContact(undefined)
  }

  const saveNewContact = (contact: Contact) => {
    addContact(contact)
    cancelAddingContact()
  }

  const handleEditingContact = (contact: Contact) => {
    closeSidebar()
    setEditedContact(contact)
  }

  const cancelEditingContact = (contact?: Contact) => {
    closeSidebar()
    setEditedContact(undefined)
    openSidebar(contact as Contact)
  }

  const saveEditedContact = (contact: Contact) => {
    setEditedContact(contact)
    editContact(contact.id, contact)
    cancelEditingContact(contact)
    openSidebar(contact)
  }

  const openDeleteModal = (contact: Contact) => {
    const handleDelete = async () => {
      modalService.rerenderModal(
        <DeleteModal
          deleting
          title={intl.formatMessage({
            id: "view.name.phone.contacts.modal.delete.title",
          })}
          text={intl.formatMessage(
            {
              id: "view.name.phone.contacts.modal.delete.text",
            },
            { name: createFullName(contact), ...textFormatters }
          )}
        />
      )
      await deleteContacts([contact])
      modalService.closeModal()
      closeSidebar()
    }

    modalService.openModal(
      <DeleteModal
        onDelete={handleDelete}
        title={intl.formatMessage({
          id: "view.name.phone.contacts.modal.delete.title",
        })}
        text={intl.formatMessage(
          {
            id: "view.name.phone.contacts.modal.delete.text",
          },
          { name: createFullName(contact), ...textFormatters }
        )}
      />
    )
  }

  const handleUnblock = async (contact: Contact) => {
    const unblockedContact: Contact = {
      ...contact,
      blocked: false,
    }
    await editContact(unblockedContact.id, unblockedContact)
    if (detailsEnabled) {
      openSidebar(unblockedContact)
    }
  }

  const openBlockModal = (contact: Contact) => {
    const handleBlock = async () => {
      modalService.rerenderModal(
        <BlockContactModal contact={contact} blocking />
      )
      const blockedContact: Contact = {
        ...contact,
        blocked: true,
        favourite: false,
      }
      await editContact(blockedContact.id, blockedContact)
      await modalService.closeModal()

      if (detailsEnabled) {
        openSidebar(blockedContact)
      }
    }

    modalService.openModal(
      <BlockContactModal contact={contact} onBlock={handleBlock} />
    )
  }

  const openSpeedDialModal = () => {
    modalService.openModal(
      <SpeedDialModal
        onSave={onSpeedDialSettingsSave}
        contacts={flatList}
        speedDialContacts={speedDialContacts}
      />
    )
  }

  const _devClearContacts = () => setContacts([])
  const _devLoadDefaultContacts = () => setContacts(contactList)

  return (
    <>
      <DevModeWrapper>
        <p>Messages on list: {contacts.length}</p>
        <Button onClick={_devClearContacts} label="Remove all contacts" />
        <br />
        <Button
          onClick={_devLoadDefaultContacts}
          label="Load default contact list"
        />
      </DevModeWrapper>
      <ContactSection>
        <ContactPanel
          onSearchTermChange={onSearchTermChange}
          onManageButtonClick={onManageButtonClick}
          onNewButtonClick={handleAddingContact}
        />
        <TableWithSidebarWrapper>
          <ContactList
            activeRow={activeRow}
            contactList={contacts}
            onSelect={openSidebar}
            onExport={noop}
            onForward={noop}
            onUnblock={handleUnblock}
            onBlock={openBlockModal}
            onDelete={openDeleteModal}
            onCheck={noop}
            newContact={newContact}
            editedContact={editedContact}
            resultsState={ResultsState.Loaded}
          />
          {newContact && (
            <ContactEdit
              onCancel={cancelAddingContact}
              onSpeedDialSettingsOpen={openSpeedDialModal}
              onSave={saveNewContact}
              onNameUpdate={handleNameUpdate}
              saving={savingContact}
            />
          )}
          {editedContact && (
            <ContactEdit
              contact={editedContact}
              onCancel={cancelEditingContact}
              onSpeedDialSettingsOpen={openSpeedDialModal}
              onSave={saveEditedContact}
              saving={savingContact}
            />
          )}
          {detailsEnabled && (
            <ContactDetails
              getContact={getContact}
              contact={activeRow as Contact}
              onClose={closeSidebar}
              onExport={noop}
              onForward={noop}
              onUnblock={handleUnblock}
              onBlock={openBlockModal}
              onDelete={openDeleteModal}
              onEdit={handleEditingContact}
              onCall={onCall}
              onMessage={onMessage}
            />
          )}
        </TableWithSidebarWrapper>
      </ContactSection>
    </>
  )
}

export default Phone
