/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { connect } from "react-redux"
import { History, LocationState } from "history"
import { PayloadAction } from "@reduxjs/toolkit"
import Contacts from "App/contacts/components/contacts/contacts.component"
import { noop } from "App/__deprecated__/renderer/utils/noop"
import { ReduxRootState, TmpDispatch } from "App/__deprecated__/renderer/store"
import { RootModel } from "App/__deprecated__/renderer/models/models"
import { URL_MAIN } from "App/__deprecated__/renderer/constants/urls"
import createRouterPath from "App/__deprecated__/renderer/utils/create-router-path"
import {
  Contact,
  ContactID,
  NewContact,
} from "App/contacts/reducers/contacts.interface"

import {
  ExternalProvider,
  Provider,
} from "App/__deprecated__/renderer/models/external-providers/external-providers.interface"
import externalProvidersStore from "App/__deprecated__/renderer/store/external-providers"
import {
  contactDatabaseFactory,
  getFlatList,
} from "App/contacts/helpers/contacts.helpers"
import { exportContacts } from "App/contacts/helpers/export-contacts/export-contacts"
import { ContactErrorResponse } from "App/contacts/components/contacts/contacts.interface"
import { isThreadOpenedSelector } from "App/messages/selectors"
import { createNewContact } from "App/contacts/actions/create-new-contacts.action"
import { deleteContacts } from "App/contacts/actions/delete-contacts.action"
import { importContact } from "App/contacts/actions/import-contact.action"
import { addNewContactsToState } from "App/contacts/actions/base.action"
import { getContactSelector } from "App/contacts/selectors/get-contact.selector"
import { speedDialChosenListSelector } from "App/contacts/selectors/speed-dial-chosen-list.selector"
import { flatListSelector } from "App/contacts/selectors/flat-list.selector"
import { contactListSelector } from "App/contacts/selectors/contact-list.selector"
import { authorize } from "App/contacts/actions/authorize.action"
import { editContact } from "App/contacts/actions/edit-contact.action"
import { resetAllItems, selectAllItems, toggleItem } from "App/contacts/actions"

const mapStateToProps = (state: RootModel & ReduxRootState) => {
  const { contacts, auth } = state
  const contactsList = contactListSelector(state)

  return {
    ...auth,
    selectedItems: state.contacts.selectedItems.rows,
    allItemsSelected:
      state.contacts.selectedItems.rows.length === contactsList.length,
    resultState: contacts.resultState,
    contactList: contactsList,
    flatList: flatListSelector(state),
    speedDialChosenList: speedDialChosenListSelector(state),
    getContact: (id: string) => getContactSelector(id)(state),
    isThreadOpened: (phoneNumber: string) =>
      isThreadOpenedSelector(phoneNumber)(state),
  }
}

const mapDispatchToProps = (dispatch: TmpDispatch) => {
  return {
    ...dispatch.auth,
    exportContacts: exportContacts,
    onMessage: (history: History<LocationState>, phoneNumber: string) =>
      history.push(createRouterPath(URL_MAIN.messages, { phoneNumber })),
    onSpeedDialSettingsSave: noop,
    loadContacts: async (provider: ExternalProvider) => {
      let contacts: Contact[]

      switch (provider) {
        case Provider.Google:
          contacts =
            (await externalProvidersStore.dispatch.google.getContacts()) as unknown as Contact[]
          return getFlatList(contactDatabaseFactory(contacts))
        case Provider.Apple:
          return
        case Provider.Outlook:
          contacts =
            (await externalProvidersStore.dispatch.outlook.getContacts()) as unknown as Contact[]
          return getFlatList(contactDatabaseFactory(contacts))
      }
    },
    addNewContact: async (
      contact: NewContact
    ): Promise<ContactErrorResponse | void> =>
      dispatch(createNewContact(contact)),
    importContact: async (contact: NewContact): Promise<string | void> =>
      dispatch(importContact(contact)),
    editContact: async (
      contact: Contact
    ): Promise<PayloadAction<ContactErrorResponse | undefined>> =>
      dispatch(editContact(contact)),
    deleteContacts: async (ids: ContactID[]): Promise<string | void> =>
      dispatch(deleteContacts(ids)),
    authorize: async (
      provider: ExternalProvider
    ): Promise<string | undefined> => dispatch(authorize(provider)),
    addNewContactsToState: async (contacts: Contact[]): Promise<void> =>
      dispatch(addNewContactsToState(contacts)),
    resetAllItems: () => dispatch(resetAllItems()),
    selectAllItems: () => dispatch(selectAllItems()),
    toggleItem: (id: string) => dispatch(toggleItem(id)),
    // TODO: Add proper actions
    onForward: noop,
    onBlock: noop,
    onSelect: noop,
    onCall: noop,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Contacts)
