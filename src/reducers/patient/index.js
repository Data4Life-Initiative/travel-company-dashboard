import { patientActionTypes } from "../../actions_types";
const initialState = {
    patient: { loading: false, connection_loading: false, connections: [], proofRecords:{} },
};
const PatientReducer = (state = initialState, action) => {
    switch (action.type) {
        case patientActionTypes.addPatientStart:
            return { ...state, loading: true };
        case patientActionTypes.addPatientSuccessfuly:
            return { ...state, patient: action.value, loading: false };
        case patientActionTypes.addPatientFailure:
            return { ...state, patient: null, loading: false };

        case patientActionTypes.getPatientConnections:
            return { ...state, connection_loading: true };
        case patientActionTypes.getPatientConnectionsFailure:
            return { ...state, connection_loading: false, connections: [] };
        case patientActionTypes.savePatientConnections:
            return { ...state, connection_loading: true, connections: action.value };
        case patientActionTypes.savePresentProofRecords:
            const proofRecords = {};
            for(const data of (action.value || [])){
                if(data.presentation && data.presentation.requested_proof.revealed_attrs["0_testdate_uuid"].raw){
                    const connectionIdUnique = data.connection_id + Math.random()
                    proofRecords[connectionIdUnique] = proofRecords[connectionIdUnique] || {}
                    if(proofRecords[connectionIdUnique].state !== 'verified'){
                        proofRecords[connectionIdUnique].state = data.state
                        proofRecords[connectionIdUnique].testDate =
                            data.presentation.requested_proof.revealed_attrs["0_testdate_uuid"].raw
                        proofRecords[connectionIdUnique].testResults =
                            data.presentation.requested_proof.revealed_attrs["0_testresult_uuid"].raw
                        proofRecords[connectionIdUnique].collectionDate =
                            data.created_at
                        proofRecords[connectionIdUnique].rawInfo = data;
                        proofRecords[connectionIdUnique].connectionID = data.connection_id ;
                    }
                }
            }
            return {
                ...state,
                proofRecords
            }
        default:
            return state;
    }
};
export default PatientReducer;
