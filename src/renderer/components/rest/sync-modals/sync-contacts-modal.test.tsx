import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import React from "react"
import SyncContactsModal from "Renderer/components/rest/sync-modals/sync-contacts-modal.component"
import { SyncContactsModalTestIds } from "Renderer/components/rest/sync-modals/sync-contacts-modal-test-ids.enum"

const renderer = (extraProps?: {}) => {
  const props = {
    ...extraProps,
  }
  return renderWithThemeAndIntl(<SyncContactsModal {...props} />)
}

test("apple button calls right function", () => {
  const onAppleButtonClick = jest.fn()
  const { getByText } = renderer({ onAppleButtonClick })
  getByText("[value] view.name.phone.contacts.appleButtonText").click()
  expect(onAppleButtonClick).toBeCalled()
})

test("google button calls right function", () => {
  const onGoogleButtonClick = jest.fn()
  const { getByText } = renderer({ onGoogleButtonClick })
  getByText("[value] view.name.phone.contacts.googleButtonText").click()
  expect(onGoogleButtonClick).toBeCalled()
})

test("manual import button calls right function", () => {
  const onManualImportClick = jest.fn()
  const { getByText, getByTestId } = renderer({ onManualImportClick })
  getByText("[value] view.name.phone.contacts.manualImportText").click()
  expect(onManualImportClick).toHaveBeenCalledWith(
    getByTestId(SyncContactsModalTestIds.FileInput)
  )
})
