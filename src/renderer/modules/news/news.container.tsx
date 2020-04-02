import { connect } from "react-redux"
import { RootModel } from "Renderer/models/models"
import { select } from "Renderer/store"
import News from "Renderer/modules/news/news.component"

const selection = select((models: any) => ({
  sortedIds: models.muditaNews.sortedIds,
}))

const mapStateToProps = (state: RootModel) => {
  return {
    ...state.muditaNews,
    ...state.networkStatus,
    ...selection(state, null),
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  loadData: () => dispatch.muditaNews.loadData(),
  loadOfflineData: () => dispatch.muditaNews.loadOfflineData(),
})

export default connect(mapStateToProps, mapDispatchToProps)(News)
