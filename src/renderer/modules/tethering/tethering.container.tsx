import { connect } from "react-redux"
import Tethering from "Renderer/modules/tethering/tethering.component"
import { RootState } from "Renderer/store"

const mapStateToProps = (state: RootState) => ({
  disconnectedDevice: state.basicInfo.disconnectedDevice,
})

const mapDispatchToProps = (dispatch: any) => ({
  disconnectDevice: () => dispatch.basicInfo.disconnect(),
})

export default connect(mapStateToProps, mapDispatchToProps)(Tethering)