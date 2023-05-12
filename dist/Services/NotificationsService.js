"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendNotification = sendNotification;
var _https = require("https");
var _https2 = _interopRequireDefault(_https);
var _GlobalFunctions = require("../Functions/GlobalFunctions");
var _GlobalStaticData = require("../Functions/GlobalStaticData");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
(0, _GlobalFunctions.loadEnv)();
const {
  ONE_SIGNAL_KEY,
  ONE_SIGNAL_ID
} = process.env;
const pathFile = 'Services/NotificationsService';
async function sendNotification({
  message,
  listNotifIds,
  title
}) {
  try {
    const options = {
      host: 'onesignal.com',
      port: 443,
      path: '/api/v1/notifications',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Basic ${ONE_SIGNAL_KEY}`
      }
    };
    const titleNotification = _GlobalStaticData.titleNotifications[message] || title || 'Tienes una nueva notificación de Delii.';

    // contentToNotification
    const dataToNotif = {
      app_id: ONE_SIGNAL_ID,
      data: {},
      contents: {
        en: titleNotification
      },
      include_player_ids: listNotifIds
    };
    const req = _https2.default.request(options, res => {
      res.on('data', response => {
        (0, _GlobalFunctions.showConsoleLog)('Response:');
        (0, _GlobalFunctions.showConsoleLog)(response);
      });
    });
    req.on('error', e => {
      (0, _GlobalFunctions.showConsoleError)(`${pathFile}/sendMessage`, e);
    });
    req.write(JSON.stringify(dataToNotif));
    req.end();
  } catch (e) {
    (0, _GlobalFunctions.showConsoleError)(`${pathFile}/sendNotification`, e);
  }
}
exports.default = {
  sendNotification
};