/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { EnvironmentConfig } from "App/feature-flags/types"
import { Feature, Environment } from "App/feature-flags/constants"

export const features: EnvironmentConfig = {
  // TODO [CP-1003] determinate toggle usefulness
  [Feature.ProductionReleaseOnly]: {
    [Environment.Development]: false,
    [Environment.Production]: true,
    [Environment.AlphaProduction]: false,
  },
  // TODO [CP-1003] determinate toggle usefulness
  [Feature.TestProductionReleaseOnly]: {
    [Environment.Development]: false,
    [Environment.Production]: false,
    [Environment.AlphaProduction]: true,
  },
  // TODO [CP-1003] determinate toggle usefulness
  [Feature.AllReleaseListAvailable]: {
    [Environment.Development]: true,
    [Environment.Production]: false,
    [Environment.AlphaProduction]: false,
  },

  // Separated Features
  [Feature.MessagesSearchEnabled]: {
    [Environment.Development]: true,
    [Environment.Production]: false,
    [Environment.AlphaProduction]: false,
  },
  [Feature.MessagesDeleteEnabled]: {
    [Environment.Development]: true,
    [Environment.Production]: false,
    [Environment.AlphaProduction]: false,
  },
  [Feature.MessagesForwardEnabled]: {
    [Environment.Development]: true,
    [Environment.Production]: false,
    [Environment.AlphaProduction]: false,
  },
  [Feature.MessagesResendEnabled]: {
    [Environment.Development]: true,
    [Environment.Production]: false,
    [Environment.AlphaProduction]: false,
  },
  [Feature.MessagesThreadDeleteEnabled]: {
    [Environment.Development]: true,
    [Environment.Production]: false,
    [Environment.AlphaProduction]: false,
  },
  [Feature.LoggerEnabled]: {
    [Environment.Development]: true,
    [Environment.Production]: true,
    [Environment.AlphaProduction]: true,
  },
  [Feature.LogsScrubbingEnabled]: {
    [Environment.Development]: false,
    [Environment.Production]: true,
    [Environment.AlphaProduction]: true,
  },
  [Feature.DeveloperModeEnabled]: {
    [Environment.Development]: true,
    [Environment.Production]: false,
    [Environment.AlphaProduction]: true,
  },
  [Feature.FilesManagerEnabled]: {
    [Environment.Development]: true,
    [Environment.Production]: false,
    [Environment.AlphaProduction]: false,
  },
  [Feature.MessagesTemplatesTabEnabled]: {
    [Environment.Development]: true,
    [Environment.Production]: false,
    [Environment.AlphaProduction]: false,
  },
  [Feature.MuditaCenterPrereleaseEnabled]: {
    [Environment.Development]: true,
    [Environment.Production]: false,
    [Environment.AlphaProduction]: false,
  },
  [Feature.MessagesThreadAttachContactEnabled]: {
    [Environment.Development]: true,
    [Environment.Production]: false,
    [Environment.AlphaProduction]: false,
  },
  [Feature.MessagesThreadAttachTemplateEnabled]: {
    [Environment.Development]: true,
    [Environment.Production]: false,
    [Environment.AlphaProduction]: false,
  },
  [Feature.MessagesThreadCallsEnabled]: {
    [Environment.Development]: true,
    [Environment.Production]: false,
    [Environment.AlphaProduction]: false,
  },
  [Feature.MessagesThreadDetailsMarkAsReadEnabled]: {
    [Environment.Development]: true,
    [Environment.Production]: false,
    [Environment.AlphaProduction]: false,
  },
  [Feature.MessagesCallFromThreadEnabled]: {
    [Environment.Development]: true,
    [Environment.Production]: false,
    [Environment.AlphaProduction]: false,
  },
  [Feature.ContactForwardEnabled]: {
    [Environment.Development]: true,
    [Environment.Production]: false,
    [Environment.AlphaProduction]: false,
  },
  [Feature.ContactBlockingEnabled]: {
    [Environment.Development]: true,
    [Environment.Production]: false,
    [Environment.AlphaProduction]: false,
  },
  [Feature.ContactPhoneFieldIconsEnabled]: {
    [Environment.Development]: true,
    [Environment.Production]: false,
    [Environment.AlphaProduction]: false,
  },
  [Feature.ContactExportEnabled]: {
    [Environment.Development]: true,
    [Environment.Production]: false,
    [Environment.AlphaProduction]: false,
  },
  [Feature.TetheringEnabled]: {
    [Environment.Development]: true,
    [Environment.Production]: false,
    [Environment.AlphaProduction]: false,
  },
  [Feature.SettingsNotificationTabEnabled]: {
    [Environment.Development]: true,
    [Environment.Production]: false,
    [Environment.AlphaProduction]: false,
  },
  [Feature.SettingsAudioConversionTabEnabled]: {
    [Environment.Development]: true,
    [Environment.Production]: false,
    [Environment.AlphaProduction]: false,
  },
  [Feature.PhoneDialTabEnabled]: {
    [Environment.Development]: true,
    [Environment.Production]: false,
    [Environment.AlphaProduction]: false,
  },
  [Feature.PhoneTabEnabled]: {
    [Environment.Development]: true,
    [Environment.Production]: false,
    [Environment.AlphaProduction]: false,
  },
  [Feature.ToolsTabEnabled]: {
    [Environment.Development]: true,
    [Environment.Production]: false,
    [Environment.AlphaProduction]: false,
  },
  [Feature.MusicTabEnabled]: {
    [Environment.Development]: true,
    [Environment.Production]: false,
    [Environment.AlphaProduction]: false,
  },
  [Feature.CalendarTabEnabled]: {
    [Environment.Development]: true,
    [Environment.Production]: false,
    [Environment.AlphaProduction]: false,
  },
  [Feature.MeditationTabEnabled]: {
    [Environment.Development]: true,
    [Environment.Production]: false,
    [Environment.AlphaProduction]: false,
  },
  [Feature.RecoveryModeTabEnabled]: {
    [Environment.Development]: true,
    [Environment.Production]: false,
    [Environment.AlphaProduction]: false,
  },
  [Feature.YourPureIconsEnabled]: {
    [Environment.Development]: true,
    [Environment.Production]: false,
    [Environment.AlphaProduction]: false,
  },
}
