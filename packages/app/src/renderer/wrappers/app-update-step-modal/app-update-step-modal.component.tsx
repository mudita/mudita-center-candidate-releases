/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "Renderer/types/function-component.interface"
import React, { useEffect, useState } from "react"
import {
  AppUpdateAvailable,
  AppUpdateError,
  AppUpdateProgress,
} from "Renderer/wrappers/app-update-step-modal/app-update.modals"
import registerDownloadedAppUpdateListener from "App/main/functions/register-downloaded-app-update-listener"
import registerErrorAppUpdateListener from "App/main/functions/register-error-app-update-listener"
import installAppUpdateRequest from "Renderer/requests/install-app-update.request"
import downloadAppUpdateRequest from "Renderer/requests/download-app-update.request"

interface Properties {
  closeModal?: () => void
  appLatestVersion?: string
}

enum AppUpdateStep {
  Available,
  Downloading,
  Downloaded,
  Error,
}

const AppUpdateStepModal: FunctionComponent<Properties> = ({
  closeModal,
  appLatestVersion,
}) => {
  const [appUpdateStep, setAppUpdateStep] = useState<AppUpdateStep>(
    AppUpdateStep.Available
  )

  useEffect(() => {
    const unregister = registerDownloadedAppUpdateListener(() => {
      setAppUpdateStep(AppUpdateStep.Downloaded)
    })

    return () => unregister()
  })

  useEffect(() => {
    const unregister = registerErrorAppUpdateListener(() => {
      setAppUpdateStep(AppUpdateStep.Error)
    })
    return () => unregister()
  })

  const download = () => {
    setAppUpdateStep(AppUpdateStep.Downloading)
    void downloadAppUpdateRequest()
    install()
  }

  const install = () => {
    void installAppUpdateRequest()
  }

  return (
    <>
      <AppUpdateAvailable
        open={appUpdateStep === AppUpdateStep.Available}
        closeModal={closeModal}
        onActionButtonClick={download}
        appLatestVersion={appLatestVersion}
      />
      <AppUpdateProgress
        open={
          appUpdateStep === AppUpdateStep.Downloading ||
          appUpdateStep === AppUpdateStep.Downloaded
        }
      />
      <AppUpdateError
        open={appUpdateStep === AppUpdateStep.Error}
        closeModal={closeModal}
      />
    </>
  )
}

export default AppUpdateStepModal
