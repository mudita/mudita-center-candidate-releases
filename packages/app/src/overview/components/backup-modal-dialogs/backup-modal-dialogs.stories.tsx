/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { Meta } from "@storybook/react"
import { BackupStartModal } from "App/overview/components/backup-restore-deprecated/backup-process/backup-start-modal.component"
import Story from "Renderer/components/storybook/story.component"
import {
  BackupFailureModal,
  BackupModal,
  BackupSpinnerModal,
  BackupSuccessModal,
} from "App/overview/components/backup-modal-dialogs/backup-modal-dialogs"
import { action } from "@storybook/addon-actions"

export const BackupModalStory = () => {
  return (
    <Story transparentMode>
      <BackupModal
        open
        closeModal={action("Close Backup Modal")}
        onCloseButton={action("Cancel Backup Action")}
        onActionButtonClick={action("Create Backup Action")}
      />
    </Story>
  )
}

export const BackupSpinnerModalStory = () => {
  return (
    <Story transparentMode>
      <BackupSpinnerModal open />
    </Story>
  )
}

export const BackupFailureModalStory = () => {
  return (
    <Story transparentMode>
      <BackupFailureModal
        closeModal={action("Close Failure Backup Modal")}
        secondaryActionButtonClick={action("Go to Support Action")}
        mainActionButtonClick={action("Cancel Action")}
        open
      />
    </Story>
  )
}

export const BackupSuccessModalStory = () => {
  return (
    <Story transparentMode>
      <BackupSuccessModal open />
    </Story>
  )
}

export default {
  title: "Views|Overview/Backup Modal Dialogs",
  component: BackupStartModal,
} as Meta
