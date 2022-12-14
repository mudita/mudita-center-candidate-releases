/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { ModalSize } from "App/__deprecated__/renderer/components/core/modal/modal.interface"
import Text, {
  TextDisplayStyle,
} from "App/__deprecated__/renderer/components/core/text/text.component"
import { ModalText } from "App/contacts/components/sync-contacts-modal/sync-contacts.styled"
import Modal, {
  ModalProps,
} from "App/__deprecated__/renderer/components/core/modal/modal.component"
import { defineMessages, FormattedMessage } from "react-intl"
import { intl } from "App/__deprecated__/renderer/utils/intl"
import Icon from "App/__deprecated__/renderer/components/core/icon/icon.component"
import { ModalContent } from "App/__deprecated__/calendar/components/calendar-modals.styled"
import {
  ExternalProvider,
  Provider,
} from "App/__deprecated__/renderer/models/external-providers/external-providers.interface"
import { RoundIconWrapper } from "App/__deprecated__/renderer/components/core/modal-shared/modal-shared"
import { IconType } from "App/__deprecated__/renderer/components/core/icon/icon-type"

const messages = defineMessages({
  title: {
    id: "module.calendar.authorizationFailedTitle",
  },
  subtitle: {
    id: "module.calendar.authorizationFailedSubtitle",
  },
  body: {
    id: "module.calendar.authorizationFailedBody",
  },
  button: {
    id: "module.calendar.authorizationFailedButton",
  },
  google: {
    id: "component.modalProvidersGoogle",
  },
  apple: {
    id: "component.modalProvidersApple",
  },
  microsoft: {
    id: "component.modalProvidersMicrosoft",
  },
})

interface AuthorizationFailedModalProps extends ModalProps {
  provider: ExternalProvider
}

const AuthorizationFailedModal: FunctionComponent<
  AuthorizationFailedModalProps
> = ({ provider, ...props }) => {
  const providerName = (() => {
    switch (provider) {
      case Provider.Google:
        return intl.formatMessage(messages.google)
      case Provider.Apple:
        return intl.formatMessage(messages.apple)
      case Provider.Outlook:
        return intl.formatMessage(messages.microsoft)
    }
  })()

  return (
    <Modal
      {...props}
      size={ModalSize.Small}
      title={
        <FormattedMessage
          {...messages.title}
          values={{ provider: providerName }}
        />
      }
      closeButton={false}
      actionButtonLabel={intl.formatMessage(messages.button)}
    >
      <ModalContent>
        <RoundIconWrapper>
          <Icon type={IconType.CalendarIcon} width={4} />
        </RoundIconWrapper>
        <Text
          displayStyle={TextDisplayStyle.Headline4}
          message={messages.subtitle}
        />
        <ModalText
          displayStyle={TextDisplayStyle.Paragraph4}
          message={messages.body}
          color="secondary"
        />
      </ModalContent>
    </Modal>
  )
}

export default AuthorizationFailedModal
