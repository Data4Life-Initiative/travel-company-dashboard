export const apiUrl = "https://mydata4life-api.igrant.io/v1/";
const orgID = '5f52c287c67001000100f9e8'
export const isProduction = true;
export const pollDataExchangeInfo = `https://cloudagent.igrant.io/v1/${orgID}/admin/present-proof/records?qr_id=`
export const qrBaseURl = `https://cloudagent.igrant.io/v1/${orgID}/admin/igrantio-operator/data-exchange/qr-link/`
export const ariesURL = `https://cloudagent.igrant.io/v1/${orgID}/admin` 
export const connectionsEndpoint = `https://cloudagent.igrant.io/v1/${orgID}/admin/connections?state=active`
export const websocketEndpoint = 'wss://demo-socket.igrant.io:443/ws/demo/';
export const apiKey = 'ApiKey eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI1ZjVhOTRkYmM2NzAwMTAwMDEwMGZhMmYiLCJleHAiOjE2MzA5MDg4NTN9.7yzf-iSB2ju7Rs-tJQPwcv7N2IK9Yp-qXsVfjbYpqQ4'
const QRVerificationID = 'b15ef445-0083-47c0-be56-2bd4922fdcbc'
export const createQrEndpoint = `https://cloudagent.igrant.io/v1/${orgID}/admin/igrantio-operator/data-exchange/qr/${QRVerificationID}`
const verificationID = 'b15ef445-0083-47c0-be56-2bd4922fdcbc'
export const fetchVerificatiorRecordUrl = `https://cloudagent.igrant.io/v1/${orgID}/admin/present-proof/records?auto_data_ex_id=${verificationID}&state=verified`