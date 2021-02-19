import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import ExportErrorModal from "App/calendar/components/export-error-modal/export-error-modal.component"
import React from "react"
import { ExportErrorModalTestIds } from "App/calendar/components/export-error-modal/export-error-modal-test-ids.enum"

const renderer = (props = {}) =>
  renderWithThemeAndIntl(<ExportErrorModal {...props} />)


test("subtitle has correct text", () => {
  const { getByTestId } = renderer()
  expect(getByTestId(ExportErrorModalTestIds.Subtitle)).toHaveTextContent(
    "[value] view.name.calendar.modal.exportFailed.subtitle"
  )
})

test("body has correct text", () => {
  const { getByTestId } = renderer()
  expect(getByTestId(ExportErrorModalTestIds.Body)).toHaveTextContent(
    "[value] view.name.calendar.modal.exportFailed.body"
  )
})
