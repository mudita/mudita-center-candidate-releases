import React from "react"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import "@testing-library/jest-dom/extend-expect"
import SettingsToggler, {
  Option,
} from "Renderer/components/rest/settings/settings-toggler.component"
import { fireEvent } from "@testing-library/dom"
import { ToggleState } from "Renderer/modules/settings/settings-toggle-state.enum"

test("off button is active by default", async () => {
  const onToggle = jest.fn()
  const { queryAllByRole } = renderWithThemeAndIntl(
    <SettingsToggler onToggle={onToggle} toggleValue={ToggleState.Off} />
  )
  const buttons = queryAllByRole("button")
  const offButton = buttons[0]

  expect(offButton).toHaveAttribute("data-testid", "toggler-active")
})

test("passed function is called with right argument", async () => {
  const onToggle = jest.fn()
  const { queryAllByRole } = renderWithThemeAndIntl(
    <SettingsToggler
      onToggle={onToggle}
      toggleValue={ToggleState.Off}
      optionToUpdate={Option.Autostart}
    />
  )
  const [, onButton] = queryAllByRole("button")

  await fireEvent.click(onButton)
  expect(onToggle).toBeCalledWith({
    [String(Option.Autostart)]: ToggleState.On,
  })
})

test("informs about toggle", async () => {
  const onToggle = jest.fn()
  const { queryAllByRole } = renderWithThemeAndIntl(
    <SettingsToggler onToggle={onToggle} />
  )
  const [, onButton] = queryAllByRole("button")
  await fireEvent.click(onButton)
  expect(onToggle).toHaveBeenCalled()
})
