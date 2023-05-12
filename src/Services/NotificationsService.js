import https from 'https';
import { loadEnv, showConsoleError, showConsoleLog } from '../Functions/GlobalFunctions';
import { titleNotifications } from '../Functions/GlobalStaticData';

loadEnv();

const { ONE_SIGNAL_KEY, ONE_SIGNAL_ID } = process.env;

const pathFile = 'Services/NotificationsService';

export async function sendNotification({ message, listNotifIds, title }) {
  try {
    const options = {
      host: 'onesignal.com',
      port: 443,
      path: '/api/v1/notifications',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Basic ${ONE_SIGNAL_KEY}`,
      },
    };

    const titleNotification = titleNotifications[message] || title || 'Tienes una nueva notificación de Delii.';

    // contentToNotification
    const dataToNotif = {
      app_id: ONE_SIGNAL_ID,
      data: {},
      contents: { en: titleNotification },
      include_player_ids: listNotifIds,
    };

    const req = https.request(options, (res) => {
      res.on('data', (response) => {
        showConsoleLog('Response:');
        showConsoleLog(response);
      });
    });

    req.on('error', (e) => {
      showConsoleError(`${pathFile}/sendMessage`, e);
    });

    req.write(JSON.stringify(dataToNotif));
    req.end();
  } catch (e) {
    showConsoleError(`${pathFile}/sendNotification`, e);
  }
}

export default {
  sendNotification,
};
