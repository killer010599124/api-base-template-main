import rp from 'request-promise';
import { getResponse, loadEnv, showConsoleError } from '../Functions/GlobalFunctions';

const path = 'Services/SMSService';

loadEnv();

export const sendSMS = async (toNumber, sms, priority = false) => {
  const ret = {
    ok: false,
    data: undefined,
    error: undefined,
  };

  try {
    const { HABLAME_URI, HABLAME_ACCOUNT, HABLAME_API_KEY, HABLAME_TOKEN } = process.env;

    if (!HABLAME_ACCOUNT || !HABLAME_API_KEY || !HABLAME_TOKEN || !HABLAME_URI) {
      ret.error = 'Error al momento de enviar el SMS.';
    } else {
      ret.data = await rp({
        method: 'POST',
        uri: `${HABLAME_URI}/${priority ? 'priority' : 'marketing'}`,
        headers: {
          'Content-Type': 'application/json',
          Account: HABLAME_ACCOUNT,
          ApiKey: HABLAME_API_KEY,
          Token: HABLAME_TOKEN,
        },
        body: {
          toNumber,
          sms,
        },
        json: true,
      });

      ret.ok = true;
    }

    return ret;
  } catch (e) {
    showConsoleError(e, `${path}/sendSMS`);
    ret.error = e.toString();
    return ret;
  }
};

export async function sendCodeSMS(res, { phone, code }) {
  try {
    await sendSMS(phone, `Delii Code: Estes es tu código de verificación: ${code}. Ingresalo para continuar.`);
    return getResponse(res, {
      status: 200,
      mss: 'Se ha enviado el código de verificación exitosamente.',
    });
  } catch (e) {
    showConsoleError(e, `${path}/sendCodeSMS`);
    return {
      err: e.toString(),
      ok: false,
    };
  }
}

export async function sendSMSNotification(phone, message, priority = false) {
  try {
    await sendSMS(phone, message, priority);
  } catch (e) {
    showConsoleError(e, `${path}/sendSMSNotification`);
  }
}

export default {
  sendCodeSMS,
  sendSMSNotification,
};
