/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import Modal from "App/__deprecated__/renderer/components/core/modal/modal.component"
import { ModalSize } from "App/__deprecated__/renderer/components/core/modal/modal.interface"
import { noop } from "App/__deprecated__/renderer/utils/noop"
import styled from "styled-components"
import Text, {
  TextDisplayStyle,
} from "App/__deprecated__/renderer/components/core/text/text.component"
import { defineMessages } from "react-intl"
import { intl, textFormatters } from "App/__deprecated__/renderer/utils/intl"
import Icon from "App/__deprecated__/renderer/components/core/icon/icon.component"
import { LoaderType } from "App/__deprecated__/renderer/components/core/loader/loader.interface"
import Loader from "App/__deprecated__/renderer/components/core/loader/loader.component"
import { createFullName } from "App/contacts/helpers/contacts.helpers"
import { Contact } from "App/contacts/reducers/contacts.interface"
import { IconType } from "App/__deprecated__/renderer/components/core/icon/icon-type"

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    white-space: pre-wrap;
    text-align: center;
    line-height: 2.2rem;
    margin-top: 3.2rem;
  }
`

const messages = defineMessages({
  title: { id: "module.contacts.blockTitle" },
  text: { id: "module.contacts.blockText" },
  cancelButton: { id: "module.contacts.blockCancelButton" },
  blockButton: { id: "module.contacts.blockButton" },
})

interface DeleteContactModalProps {
  contact: Contact
  onBlock?: () => void
  onClose?: () => void
  blocking?: boolean
}

const BlockContactModal: FunctionComponent<DeleteContactModalProps> = ({
  onBlock = noop,
  onClose = noop,
  blocking,
  contact,
}) => {
  return (
    <Modal
      title={intl.formatMessage(messages.title)}
      size={ModalSize.Small}
      onActionButtonClick={onBlock}
      actionButtonLabel={
        blocking ? (
          <Loader size={2} type={LoaderType.Spinner} />
        ) : (
          intl.formatMessage(messages.blockButton)
        )
      }
      onClose={onClose}
      closeButtonLabel={intl.formatMessage(messages.cancelButton)}
    >
      <ModalContent>
        <Icon type={IconType.DeleteBig} width={12} height={12} />
        <Text
          displayStyle={TextDisplayStyle.Paragraph3}
          message={{
            ...messages.text,
            values: { name: createFullName(contact), ...textFormatters },
          }}
        />
      </ModalContent>
    </Modal>
  )
}

export default BlockContactModal
