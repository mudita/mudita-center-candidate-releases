/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  GoogleProviderState,
  Scope,
} from "Renderer/models/external-providers/google/google.interface"
import { AxiosRequestConfig } from "axios"

export enum Provider {
  Google = "google",
  Apple = "apple",
  Microsoft = "microsoft",
  Pure = "pure",
}

export type ExternalProvider = Exclude<Provider, Provider.Pure>

export interface ExternalProvidersState {
  google: GoogleProviderState
}

export interface RequestWrapperPayload {
  axiosProps: AxiosRequestConfig
  scope: Scope
  tries?: number
}
