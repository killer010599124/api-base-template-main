import fs from 'fs';
import moment from 'moment-timezone';
import path from 'path';
import { generate } from 'referral-codes';

const dotenv = require('dotenv');

export function showConsoleError(pathFile, error) {
  console.error(`${moment().toISOString()} - Error: ${pathFile}`);
  console.error(`${error}`);
}

export function showConsoleLog(msg) {
  console.log(`${moment().toISOString()} - ${msg}`);
}

export function checkIfExistFile(value) {
  try {
    return fs.existsSync(value);
  } catch (err) {
    showConsoleError('src/server', err);
    return false;
  }
}

export function loadEnv() {
  const pathEnvFile = process.env.NODE_ENV ? `.${process.env.NODE_ENV || 'development'}` : '';
  const pathEnv = path.resolve(__dirname, `../../.env${pathEnvFile}`);

  if (checkIfExistFile(pathEnv)) {
    dotenv.config({ path: pathEnv });
  } else if (checkIfExistFile(path.resolve(__dirname, '../../.env'))) {
    dotenv.config({ path: path.resolve(__dirname, '../../.env') });
  } else {
    // load env vars from system
    dotenv.config();
    if (process.env.NODE_ENV === 'development') {
      showConsoleError(
        'src/server',
        'No existe archivo de variable de entorno en el sistema. Asegúrese de contar con uno. ' +
          'Para más información, leer el archivo README.md del proyecto.'
      );
    }
    // process.exit(0);
  }
}

export function getUrlS3() {
  return process.env.AWS_S3_ENDPOINT || null;
}

export function upperCaseFirstLettersWords(words) {
  let ret = '';
  const arrayWords = words.trim().split(' ');
  for (let i = 0; i < arrayWords.length; i += 1) {
    arrayWords[i] = arrayWords[i].charAt(0).toUpperCase() + arrayWords[i].slice(1);
    ret += ` ${arrayWords[i]}`;
  }
  return ret.trim();
}

export function lastUpdate(next) {
  this.updated_at = moment().tz('America/Bogota').unix();
  next();
}

export function setDate() {
  return moment().tz('America/Bogota').unix();
}

export function checkDate(timestamp) {
  if (timestamp) return moment.unix(timestamp).tz('America/Bogota').format('DD-MM-YYYY HH:mm:ss');
  return timestamp;
}

export function checkScheduler(schedule) {
  if (schedule && schedule.length === 0) {
    const ret = [];
    for (let i = 0; i < 7; i += 1) ret.push({ day: i, start: 480, end: 1080, active: false });
    return ret;
  }
  return schedule;
}

export function checkDocs(docs) {
  if (docs && docs.length < 8) {
    const ret = [];
    for (let i = 0; i < 8; i += 1) {
      if (i === 0 && docs[i] && docs[i].name !== 'Logo') ret.push({ img: null, name: 'Logo' });
      else if (!docs[i]) ret.push({ img: null, name: 'Imagen' });
      else ret.push({ img: docs[i].img || null, name: docs[i].name });
    }
    return ret;
  }
  return docs;
}

export function setValueFormatTwoDecimals(value) {
  if (typeof value === 'string') return Number.parseFloat(value.fixed(2));
  return value;
}

export function generateCodeToSMS(length = 4) {
  const { HABLAME_ENABLE } = process.env;
  let codeTemp = '1111';

  if (HABLAME_ENABLE === 'true') {
    const digits = '0123456789';
    codeTemp = '';
    for (let i = 0; i < length; i += 1) codeTemp += digits[Math.floor(Math.random() * 10)];
  }

  return codeTemp;
}

export function zeroPad(num) {
  if (num) return num.toString().padStart(4, '0');
  return '0001';
}

export function getResponseError(res, err, pathFile) {
  showConsoleError(`${pathFile}`, err);
  return res.status(500).json({
    err: err?.toString() || 'Error desconocido.',
  });
}

export function getResponse(res, dataRet) {
  const { data, token, mss, errors, err } = dataRet;

  return res.status(dataRet.status || 500).json({
    mss,
    data,
    token,
    err,
    errors,
  });
}

export function getBoolean(value) {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') return value === 'true';
  return false;
}

export function getLimitSkipSortSearch(data) {
  const inputList = ['created_at', 'name', 'status'];
  const { limit, page, value, input } = data;
  let retLimit = 10;
  let retSkip = 0;
  const retSort = {};

  // limit
  if (/[0-9]/.test(`${limit}`)) {
    const x = Number.parseInt(limit.toString(), 10);
    if (x > 0) retLimit = x;
  }

  // skip
  if (/[0-9]/.test(`${page}`)) {
    const y = Number.parseInt(page.toString(), 10);
    if (y >= 1) retSkip = (y - 1) * retLimit;
  }

  // sort
  const v = value && /[1 -]/.test(value) && value.toString() === '1' ? 1 : -1;

  if (inputList.includes(`${input}`.toLowerCase())) retSort[input] = v;
  else retSort.created_at = -1;

  return { limit: retLimit, skip: retSkip, sort: retSort };
}

export function copyObjectParse(obj = null) {
  if (obj === null || typeof obj !== 'object') return obj;
  return JSON.parse(JSON.stringify(obj));
}

export function checkIfExistsRoleInList(rol, toCompare) {
  return toCompare.includes(rol) || false;
}

export function generateReferenceCode(obj = {}) {
  const { length = 13, count = 1, charset, prefix, postfix, pattern } = obj || {};
  return generate({
    length,
    count,
    charset,
    prefix,
    postfix,
    pattern,
  });
}

export function generateRandom(min = 0, max = 100) {
  const difference = max - min;
  let rand = Math.random();
  rand = Math.floor(rand * difference);
  rand += min;
  return rand;
}

export default {
  checkDate,
  checkDocs,
  checkIfExistFile,
  checkIfExistsRoleInList,
  checkScheduler,
  copyObjectParse,
  generateRandom,
  generateReferenceCode,
  getBoolean,
  getResponse,
  getResponseError,
  getUrlS3,
  getLimitSkipSortSearch,
  generateCodeToSMS,
  lastUpdate,
  loadEnv,
  setDate,
  setValueFormatTwoDecimals,
  showConsoleError,
  showConsoleLog,
  upperCaseFirstLettersWords,
  zeroPad,
};
