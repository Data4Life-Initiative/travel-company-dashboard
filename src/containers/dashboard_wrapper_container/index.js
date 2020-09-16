import { connect } from "react-redux";
import { getHotspotData, getPatientConnections } from "../../actions";

import DashboradWrapperComponent from "../../components/dashboard_wrapper_component";
const mapDipatchToSprops = { getHotspotData, getPatientConnections };
function mapStateToProps(state) {
  return {
    dashboardData: state.data.auth,
    patient: state.data.patient
  };
}
export const DashboradWrapperContainer = connect(
  mapStateToProps,
  mapDipatchToSprops
)(DashboradWrapperComponent);
