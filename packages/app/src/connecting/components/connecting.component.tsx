/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useEffect, useState } from "react"
import { useHistory } from "react-router"
import { PayloadAction } from "@reduxjs/toolkit"
import { URL_MAIN, URL_ONBOARDING, URL_OVERVIEW } from "Renderer/constants/urls"
import ConnectingContent from "App/connecting/components/connecting-content.component"
import ErrorConnectingModal from "App/connecting/components/error-connecting-modal"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import PasscodeModal from "App/passcode-modal/passcode-modal.component"
import { togglePureSimulation } from "App/dev-mode/store/dev-mode.helpers"
import { DeviceResponseStatus } from "Backend/adapters/device-response.interface"
import registerFirstPhoneConnection from "App/connecting/requests/register-first-phone-connection"

const simulatePhoneConnectionEnabled = process.env.simulatePhoneConnection

const Connecting: FunctionComponent<{
  loaded: boolean
  locked: boolean
  unlockDevice: (code: number[]) => Promise<PayloadAction<DeviceResponseStatus>>
  getUnlockStatus: () => Promise<PayloadAction<DeviceResponseStatus>>
  phoneLockTime: number | undefined
  initialModalsShowed: boolean
}> = ({
  loaded,
  locked,
  unlockDevice,
  getUnlockStatus,
  phoneLockTime,
  initialModalsShowed,
}) => {
  const [error, setError] = useState(false)

  useEffect(() => {
    if (simulatePhoneConnectionEnabled) {
      togglePureSimulation()
    }
  }, [simulatePhoneConnectionEnabled])

  const [dialogOpen, setDialogOpen] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!locked && loaded) {
        history.push(URL_OVERVIEW.root)
      }
    }, 500)

    if (locked && initialModalsShowed) {
      setDialogOpen(true)
    }
    return () => clearTimeout(timeout)
  }, [loaded, locked, initialModalsShowed])

  useEffect(() => {
    let mounted = true;
    const timeout = setTimeout(() => {
      if (mounted) {
        setError(true)
      }
      // the value is a little higher than API timeout which is set to 30000
    }, 35000)

    return () => {
      mounted = false
      clearTimeout(timeout)
    }
  }, [loaded])

  useEffect(() => {
    registerFirstPhoneConnection()
  }, [])

  const history = useHistory()

  const onCancel = () => {
    // TODO: do some logic to connect to the phone, add cancelling logic
    // This redirect is only for testing purposes

    // TODO: on success call registerFirstPhoneConnection function
    history.push(URL_ONBOARDING.troubleshooting)
  }

  const close = () => {
    setDialogOpen(false)
    history.push(URL_MAIN.news)
  }

  return (
    <>
      {error && <ErrorConnectingModal open closeModal={close} />}
      <PasscodeModal
        openModal={dialogOpen}
        close={close}
        openBlocked={phoneLockTime}
        unlockDevice={unlockDevice}
        getUnlockStatus={getUnlockStatus}
      />
      <ConnectingContent onCancel={onCancel} />
    </>
  )
}

export default Connecting