import { FunctionComponent } from "Renderer/types/function-component.interface"
import Modal from "Renderer/components/core/modal/modal.component"
import { ModalSize } from "Renderer/components/core/modal/modal.interface"
import Icon from "Renderer/components/core/icon/icon.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import { TextDisplayStyle } from "Renderer/components/core/text/text.component"
import { backgroundColor } from "Renderer/styles/theming/theme-getters"
import theme from "Renderer/styles/theming/theme"
import StackedBarChart, {
  DisplayStyle,
} from "Renderer/components/core/stacked-bar-chart/stacked-bar-chart.component"
import React from "react"
import styled from "styled-components"
import { Message as MessageInterface } from "Renderer/interfaces/message.interface"
import { BaseModalProps } from "Renderer/modules/overview/backup-process/modals.interface"
import {
  LoadingModalText,
  ModalIcon,
} from "Renderer/modules/overview/backup-process/modals.styled"

const LoadingBar = styled(StackedBarChart)`
  margin: 3.2rem auto auto;
  max-width: 22rem;
`

interface BackupLoadingModalProps extends BaseModalProps {
  onBackupSuccess: () => void
  onBackupFailure: () => void
  body: MessageInterface
  subtitle: MessageInterface
  failed?: boolean
}

export const BackupLoadingModal: FunctionComponent<BackupLoadingModalProps> = ({
  onBackupSuccess,
  onBackupFailure,
  failed,
  title,
  body,
  subtitle,
  closeButtonLabel,
}) => {
  const countdown = setTimeout(() => {
    if (failed) {
      onBackupFailure()
    } else {
      onBackupSuccess()
    }
  }, 1500)

  const cancelCountdown = () => clearTimeout(countdown)

  return (
    <Modal
      size={ModalSize.Small}
      title={title}
      onClose={cancelCountdown}
      closeButtonLabel={closeButtonLabel}
    >
      <ModalIcon>
        <Icon type={Type.FilesManager} width={5} />
      </ModalIcon>
      <LoadingModalText
        message={subtitle}
        displayStyle={TextDisplayStyle.LargeBoldText}
      />
      <LoadingModalText
        message={body}
        displayStyle={TextDisplayStyle.MediumFadedLightText}
      />
      <LoadingBar
        chartData={[
          { value: 8, color: backgroundColor("chartBar")({ theme }) },
          {
            value: 2,
            color: backgroundColor("minor")({ theme }),
          },
        ]}
        displayStyle={DisplayStyle.Thin}
      />
    </Modal>
  )
}
