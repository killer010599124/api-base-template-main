"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.showConsoleError = showConsoleError;
exports.showConsoleLog = showConsoleLog;
exports.checkIfExistFile = checkIfExistFile;
exports.loadEnv = loadEnv;
exports.getUrlS3 = getUrlS3;
exports.upperCaseFirstLettersWords = upperCaseFirstLettersWords;
exports.lastUpdate = lastUpdate;
exports.setDate = setDate;
exports.checkDate = checkDate;
exports.checkScheduler = checkScheduler;
exports.checkDocs = checkDocs;
exports.setValueFormatTwoDecimals = setValueFormatTwoDecimals;
exports.generateCodeToSMS = generateCodeToSMS;
exports.zeroPad = zeroPad;
exports.getResponseError = getResponseError;
exports.getResponse = getResponse;
exports.getBoolean = getBoolean;
exports.getLimitSkipSortSearch = getLimitSkipSortSearch;
exports.copyObjectParse = copyObjectParse;
exports.checkIfExistsRoleInList = checkIfExistsRoleInList;
exports.generateReferenceCode = generateReferenceCode;
exports.generateRandom = generateRandom;
var _fs = require("fs");
var _fs2 = _interopRequireDefault(_fs);
var _momentTimezone = require("moment-timezone");
var _momentTimezone2 = _interopRequireDefault(_momentTimezone);
var _path = require("path");
var _path2 = _interopRequireDefault(_path);
var _referralCodes = require("referral-codes");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const dotenv = require('dotenv');
function showConsoleError(pathFile, error) {
  console.error(`${(0, _momentTimezone2.default)().toISOString()} - Error: ${pathFile}`);
  console.error(`${error}`);
}
function showConsoleLog(msg) {
  console.log(`${(0, _momentTimezone2.default)().toISOString()} - ${msg}`);
}
function checkIfExistFile(value) {
  try {
    return _fs2.default.existsSync(value);
  } catch (err) {
    showConsoleError('src/server', err);
    return false;
  }
}
function loadEnv() {
  const pathEnvFile = process.env.NODE_ENV ? `.${process.env.NODE_ENV || 'development'}` : '';
  const pathEnv = _path2.default.resolve(__dirname, `../../.env${pathEnvFile}`);
  if (checkIfExistFile(pathEnv)) {
    dotenv.config({
      path: pathEnv
    });
  } else if (checkIfExistFile(_path2.default.resolve(__dirname, '../../.env'))) {
    dotenv.config({
      path: _path2.default.resolve(__dirname, '../../.env')
    });
  } else {
    // load env vars from system
    dotenv.config();
    if (process.env.NODE_ENV === 'development') {
      showConsoleError('src/server', 'No existe archivo de variable de entorno en el sistema. Asegúrese de contar con uno. ' + 'Para más información, leer el archivo README.md del proyecto.');
    }
    // process.exit(0);
  }
}

function getUrlS3() {
  return process.env.AWS_S3_ENDPOINT || null;
}
function upperCaseFirstLettersWords(words) {
  let ret = '';
  const arrayWords = words.trim().split(' ');
  for (let i = 0; i < arrayWords.length; i += 1) {
    arrayWords[i] = arrayWords[i].charAt(0).toUpperCase() + arrayWords[i].slice(1);
    ret += ` ${arrayWords[i]}`;
  }
  return ret.trim();
}
function lastUpdate(next) {
  this.updated_at = (0, _momentTimezone2.default)().tz('America/Bogota').unix();
  next();
}
function setDate() {
  return (0, _momentTimezone2.default)().tz('America/Bogota').unix();
}
function checkDate(timestamp) {
  if (timestamp) return _momentTimezone2.default.unix(timestamp).tz('America/Bogota').format('DD-MM-YYYY HH:mm:ss');
  return timestamp;
}
function checkScheduler(schedule) {
  if (schedule && schedule.length === 0) {
    const ret = [];
    for (let i = 0; i < 7; i += 1) ret.push({
      day: i,
      start: 480,
      end: 1080,
      active: false
    });
    return ret;
  }
  return schedule;
}
function checkDocs(docs) {
  if (docs && docs.length < 8) {
    const ret = [];
    for (let i = 0; i < 8; i += 1) {
      if (i === 0 && docs[i] && docs[i].name !== 'Logo') ret.push({
        img: null,
        name: 'Logo'
      });else if (!docs[i]) ret.push({
        img: null,
        name: 'Imagen'
      });else ret.push({
        img: docs[i].img || null,
        name: docs[i].name
      });
    }
    return ret;
  }
  return docs;
}
function setValueFormatTwoDecimals(value) {
  if (typeof value === 'string') return Number.parseFloat(value.fixed(2));
  return value;
}
function generateCodeToSMS(length = 4) {
  const {
    HABLAME_ENABLE
  } = process.env;
  let codeTemp = '1111';
  if (HABLAME_ENABLE === 'true') {
    const digits = '0123456789';
    codeTemp = '';
    for (let i = 0; i < length; i += 1) codeTemp += digits[Math.floor(Math.random() * 10)];
  }
  return codeTemp;
}
function zeroPad(num) {
  if (num) return num.toString().padStart(4, '0');
  return '0001';
}
function getResponseError(res, err, pathFile) {
  showConsoleError(`${pathFile}`, err);
  return res.status(500).json({
    err: err?.toString() || 'Error desconocido.'
  });
}
function getResponse(res, dataRet) {
  const {
    data,
    token,
    mss,
    errors,
    err
  } = dataRet;
  return res.status(dataRet.status || 500).json({
    mss,
    data,
    token,
    err,
    errors
  });
}
function getBoolean(value) {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') return value === 'true';
  return false;
}
function getLimitSkipSortSearch(data) {
  const inputList = ['created_at', 'name', 'status'];
  const {
    limit,
    page,
    value,
    input
  } = data;
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
  if (inputList.includes(`${input}`.toLowerCase())) retSort[input] = v;else retSort.created_at = -1;
  return {
    limit: retLimit,
    skip: retSkip,
    sort: retSort
  };
}
function copyObjectParse(obj = null) {
  if (obj === null || typeof obj !== 'object') return obj;
  return JSON.parse(JSON.stringify(obj));
}
function checkIfExistsRoleInList(rol, toCompare) {
  return toCompare.includes(rol) || false;
}
function generateReferenceCode(obj = {}) {
  const {
    length = 13,
    count = 1,
    charset,
    prefix,
    postfix,
    pattern
  } = obj || {};
  return (0, _referralCodes.generate)({
    length,
    count,
    charset,
    prefix,
    postfix,
    pattern
  });
}
function generateRandom(min = 0, max = 100) {
  const difference = max - min;
  let rand = Math.random();
  rand = Math.floor(rand * difference);
  rand += min;
  return rand;
}
exports.default = {
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
  zeroPad
};