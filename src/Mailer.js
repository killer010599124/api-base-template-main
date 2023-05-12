import nodemailer from 'nodemailer';
import { loadEnv } from './Functions/GlobalFunctions';

loadEnv();

export default function Mailer() {
  const { HOST_MAIL, PORT_MAIL, USER_AUTH_MAIL, PASS_AUTH_MAIL } = process.env;
  if (HOST_MAIL !== '' && PORT_MAIL !== '' && USER_AUTH_MAIL !== '' && PASS_AUTH_MAIL !== '') {
    return nodemailer.createTransport({
      host: HOST_MAIL,
      port: PORT_MAIL,
      auth: {
        user: USER_AUTH_MAIL,
        pass: PASS_AUTH_MAIL,
      },
    });
  }
  return null;
}
