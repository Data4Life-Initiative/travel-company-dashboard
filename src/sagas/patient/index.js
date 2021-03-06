import { call, put, takeLatest, all } from "redux-saga/effects";
import { patientActionTypes, dashboardActionTypes } from "../../actions_types";
import { Addpatient,  getConnections} from "../../apis";
import { message } from "antd";

function* PostAddPatient(action) {
  try {
    const responseData = yield call(Addpatient, action.payload);

    if (responseData.data.status === 200) {
      message.success("Patient data submitted successfully");
      yield put({
        type: dashboardActionTypes.clearDataPatient,
      });
    } else message.error(responseData.data.data.msg);

    yield put({
      type: patientActionTypes.addPatientSuccessfuly,
      value: responseData.data.data || [{ error: responseData.data.data }],
    });
  } catch (ex) {
    message.error(ex.response.data.data.msg);
    yield put({
      type: patientActionTypes.addPatientFailure,
      value: ex.response.data.data.msg,
    });
    console.log(ex.response);
  }
}

export function* postAddPatientAction() {
  yield takeLatest(patientActionTypes.addPatientStart, PostAddPatient);
}


function* GetPatientConnections(action) {
  try {
    const responseData = yield call(getConnections, action.payload);

    yield put({
      type: patientActionTypes.savePatientConnections,
      value: responseData.data || [{ error: responseData.data.data }],
    });
  } catch (ex) {
    yield put({
      type: patientActionTypes.getPatientConnectionsFailure,
      value: ex,
    });
    console.log(ex);
  }
}

export function* getPatientConnectionsAction() {
  yield takeLatest(patientActionTypes.getPatientConnections, GetPatientConnections);
}

export default function* patientSaga() {
  yield all([postAddPatientAction(), getPatientConnectionsAction()]);
}
