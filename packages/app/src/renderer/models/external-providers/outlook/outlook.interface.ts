/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

export interface OutlookAuthSuccessResponse {
  access_token: string
  refresh_token?: string
}

export interface OutlookAuthErrorResponse {
  error: string
}

export enum OutLookScope {
  Contacts = "contacts",
}

export interface OutlookProviderState {
  [OutLookScope.Contacts]: Partial<OutlookAuthSuccessResponse>
}

interface OutlookContactAddress {
  street?: string
  city?: string
  postalCode?: string
  countryOrRegion?: string
}

export interface OutlookContactResourceItem {
  id: string
  givenName?: string
  surname?: string
  mobilePhone?: string
  homePhones?: string[]
  businessPhones?: string[]
  homeAddress?: OutlookContactAddress
  businessAddress?: OutlookContactAddress
  otherAddress?: OutlookContactAddress
  emailAddresses?: Array<{
    address: string
    name: string
  }>
  personalNotes?: string
}
