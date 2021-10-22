/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "Renderer/types/function-component.interface"
import React, { ComponentProps } from "react"
import ModalDialog from "Renderer/components/core/modal-dialog/modal-dialog.component"
import { intl } from "Renderer/utils/intl"
import { ModalText } from "App/contacts/components/sync-contacts-modal/sync-contacts.styled"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { defineMessages } from "react-intl"
import { ModalSize } from "Renderer/components/core/modal/modal.interface"
import styled from "styled-components"
import InputComponent from "Renderer/components/core/input-text/input-text.component"
import {
  DisplayStyle,
  Type,
} from "Renderer/components/core/button/button.config"
import Button from "Renderer/components/core/button/button.component"
import { FieldValues, useForm } from "react-hook-form"

enum FieldKeys {
  SecretKey = "secretKey",
}

export interface BackupSetSecretKeyFieldValues extends FieldValues {
  [FieldKeys.SecretKey]: string
}

const messages = defineMessages({
  backupSetSecretKeyModalHeaderTitle: {
    id: "module.overview.backupSetSecretKeyModalHeaderTitle",
  },
  backupSetSecretKeyModalDescription: {
    id: "module.overview.backupSetSecretKeyModalDescription",
  },
  backupSetSecretKeyModalMainButton: {
    id: "module.overview.backupSetSecretKeyModalMainButton",
  },
  backupSetSecretKeyModalInputLabel: {
    id: "module.overview.backupSetSecretKeyModalInputLabel",
  },
})

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;

  & > p:first-of-type {
    text-align: left;
    margin-top: calc(-4rem + 0.8rem);
  }
`

const Form = styled.form`
  margin-top: 4.8rem;
  display: flex;
  flex-direction: column;
  padding: 0 0.8rem;
`

const FormInputLabel = styled(Text)``

const FormInput = styled(InputComponent)`
  padding: 0.6rem 0;
`

const ButtonWrapper = styled.div`
  margin-top: 5.6rem;
  display: flex;
  justify-content: center;
`

const ButtonWithRotatingIcon = styled(Button)``

const Modal: FunctionComponent<ComponentProps<typeof ModalDialog>> = ({
  children,
  size = ModalSize.Small,
  ...props
}) => (
  <ModalDialog
    size={size}
    title={intl.formatMessage(messages.backupSetSecretKeyModalHeaderTitle)}
    {...props}
  >
    <ModalContent>{children}</ModalContent>
  </ModalDialog>
)

interface BackupSetSecretKeyModalProps
  extends ComponentProps<typeof ModalDialog> {
  onSecretKeySet: (secretKey: string) => void
}

// TODO: Provide some abstraction to hide structure modal behind core
//  https://appnroll.atlassian.net/browse/CP-757
export const BackupSetSecretKeyModal: FunctionComponent<BackupSetSecretKeyModalProps> =
  ({ onSecretKeySet, ...props }) => {
    const { register, handleSubmit } = useForm<BackupSetSecretKeyFieldValues>({
      mode: "onChange",
    })

    const handleSubmitClick = handleSubmit((data) => {
      onSecretKeySet(data.secretKey)
    })

    return (
      <Modal
        closeButton={false}
        title={intl.formatMessage(messages.backupSetSecretKeyModalHeaderTitle)}
        {...props}
      >
        <ModalText
          displayStyle={TextDisplayStyle.MediumFadedText}
          message={messages.backupSetSecretKeyModalDescription}
        />
        <Form onSubmit={handleSubmitClick}>
          <FormInputLabel
            displayStyle={TextDisplayStyle.SmallFadedText}
            message={messages.backupSetSecretKeyModalInputLabel}
          />
          <FormInput
            type={"password"}
            {...register(FieldKeys.SecretKey)}
          />
          <ButtonWrapper>
            <ButtonWithRotatingIcon
              type={Type.Submit}
              displayStyle={DisplayStyle.Primary}
              label={intl.formatMessage(
                messages.backupSetSecretKeyModalMainButton
              )}
            />
          </ButtonWrapper>
        </Form>
      </Modal>
    )
  }