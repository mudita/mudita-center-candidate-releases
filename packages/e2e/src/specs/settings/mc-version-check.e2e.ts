/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { version } from "../../../../app/package.json"
import SettingsPage from "../../page-objects/settings.page"
import NavigationTabs from "../../page-objects/tabs.page"

describe("Checking Mudita Center version", () => {
  before(async () => {
    // Waiting for device connected through USB
    await browser.executeAsync((done) => {
      setTimeout(done, 10000)
    })
  })

  it("Application should have the same version as in package.json", async () => {
    const appVersionFromPackageJson = version

    const newsTab = await NavigationTabs.settingsTab
    await newsTab.waitForDisplayed()
    await newsTab.click()
    await browser.executeAsync((done) => {
      setTimeout(done, 2000)
    })

    const tabAbout = await SettingsPage.aboutTab
    await tabAbout.waitForDisplayed()
    await tabAbout.click()
    await browser.executeAsync((done) => {
      setTimeout(done, 2000)
    })
    const appVersionFromAppField =
      await SettingsPage.aboutInstalledVersionTextLabel
    const appVersionFromAppTextValue = await appVersionFromAppField.getText()
    const appVersionFromApp = appVersionFromAppTextValue.split(": ")[1]
    await expect(appVersionFromApp).toEqual(appVersionFromPackageJson)
  })
})
