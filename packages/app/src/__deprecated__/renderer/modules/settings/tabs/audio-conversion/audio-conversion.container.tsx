/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { connect } from "react-redux"
import { RootModel } from "App/__deprecated__/renderer/models/models"
import { TmpDispatch } from "App/__deprecated__/renderer/store"
import AudioConversion from "App/__deprecated__/renderer/modules/settings/tabs/audio-conversion/audio-conversion.component"

const mapStateToProps = (state: RootModel) => {
  return state.settings
}

const mapDispatchToProps = (dispatch: TmpDispatch) => dispatch.settings

export default connect(mapStateToProps, mapDispatchToProps)(AudioConversion)