import * as React from "react"
import { Redirect, Route, Switch } from "react-router"

import AppWrapper from "Renderer/wrappers/app-wrapper"

import FilesManager from "Renderer/modules/filesManager/files-manager.component"
import Help from "Renderer/modules/help/help.component"
import Meditation from "Renderer/modules/meditation/meditation.component"
import Messages from "Renderer/modules/messages/messages.component"
import Music from "Renderer/modules/music/music.component"
import News from "Renderer/modules/news/news.component"
import OverviewContainer from "Renderer/modules/overview/overview.container"
import Phone from "Renderer/modules/phone/phone.compnent"
import Settings from "Renderer/modules/settings/settings.component"
import Tethering from "Renderer/modules/tethering/tethering.component"
import Tools from "Renderer/modules/tools/tools.component"

import { URL_MAIN } from "Renderer/constants/urls"

export default () => (
  <AppWrapper>
    <Switch>
      <Redirect exact from={URL_MAIN.root} to={URL_MAIN.overview} />
      <Route path={URL_MAIN.filesManager} component={FilesManager} />
      <Route path={URL_MAIN.help} component={Help} />
      <Route path={URL_MAIN.meditation} component={Meditation} />
      <Route path={URL_MAIN.messages} component={Messages} />
      <Route path={URL_MAIN.music} component={Music} />
      <Route path={URL_MAIN.news} component={News} />
      <Route path={URL_MAIN.overview} component={OverviewContainer} />
      <Route path={URL_MAIN.phone} component={Phone} />
      <Route path={URL_MAIN.settings} component={Settings} />
      <Route path={URL_MAIN.tethering} component={Tethering} />
      <Route path={URL_MAIN.tools} component={Tools} />
      <Redirect to={URL_MAIN.overview} />
    </Switch>
  </AppWrapper>
)