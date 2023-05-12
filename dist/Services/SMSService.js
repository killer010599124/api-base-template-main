"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendSMS = undefined;
exports.sendCodeSMS = sendCodeSMS;
exports.sendSMSNotification = sendSMSNotification;
var _requestPromise = require("request-promise");
var _requestPromise2 = _interopRequireDefault(_requestPromise);
var _GlobalFunctions = require("../Functions/GlobalFunctions");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const path = 'Services/SMSService';
(0, _GlobalFunctions.loadEnv)();
const sendSMS = exports.sendSMS = async (toNumber, sms, priority = false) => {
  const ret = {
    ok: false,
    data: undefined,
    error: undefined
  };
  try {
    const {
      HABLAME_URI,
      HABLAME_ACCOUNT,
      HABLAME_API_KEY,
      HABLAME_TOKEN
    } = process.env;
    if (!HABLAME_ACCOUNT || !HABLAME_API_KEY || !HABLAME_TOKEN || !HABLAME_URI) {
      ret.error = 'Error al momento de enviar el SMS.';
    } else {
      ret.data = await (0, _requestPromise2.default)({
        method: 'POST',
        uri: `${HABLAME_URI}/${priority ? 'priority' : 'marketing'}`,
        headers: {
          'Content-Type': 'application/json',
          Account: HABLAME_ACCOUNT,
          ApiKey: HABLAME_API_KEY,
          Token: HABLAME_TOKEN
        },
        body: {
          toNumber,
          sms
        },
        json: true
      });
      ret.ok = true;
    }
    return ret;
  } catch (e) {
    (0, _GlobalFunctions.showConsoleError)(e, `${path}/sendSMS`);
    ret.error = e.toString();
    return ret;
  }
};
async function sendCodeSMS(res, {
  phone,
  code
}) {
  try {
    await sendSMS(phone, `Delii Code: Estes es tu código de verificación: ${code}. Ingresalo para continuar.`);
    return (0, _GlobalFunctions.getResponse)(res, {
      status: 200,
      mss: 'Se ha enviado el código de verificación exitosamente.'
    });
  } catch (e) {
    (0, _GlobalFunctions.showConsoleError)(e, `${path}/sendCodeSMS`);
    return {
      err: e.toString(),
      ok: false
    };
  }
}
async function sendSMSNotification(phone, message, priority = false) {
  try {
    await sendSMS(phone, message, priority);
  } catch (e) {
    (0, _GlobalFunctions.showConsoleError)(e, `${path}/sendSMSNotification`);
  }
}
exports.default = {
  sendCodeSMS,
  sendSMSNotification
};