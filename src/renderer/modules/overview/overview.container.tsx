import { connect } from "react-redux"
import { InitialState as BasicInfoInitialState } from "Renderer/models/basic-info/interfaces"
import Overview from "Renderer/modules/overview/overview.component"

const mapStateToProps = ({
  basicInfo,
}: {
  basicInfo: BasicInfoInitialState
}) => ({
  ...basicInfo,
})

const mapDispatchToProps = (dispatch: any) => ({
  loadData: () => dispatch.basicInfo.loadData(),
  disconnectDevice: () => dispatch.basicInfo.disconnect(),
  changeSim: () => dispatch.basicInfo.changeSim(),
})

export default connect(mapStateToProps, mapDispatchToProps)(Overview)
