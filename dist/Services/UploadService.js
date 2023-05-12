"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadFile = uploadFile;
exports.uploadFilePdf = uploadFilePdf;
exports.updatePictureAction = updatePictureAction;
exports.deleteFile = deleteFile;
var _clientS = require("@aws-sdk/client-s3");
var _GlobalFunctions = require("../Functions/GlobalFunctions");
var _Validations = require("../Functions/Validations");
(0, _GlobalFunctions.loadEnv)();
const {
  AWS_ID,
  AWS_KEY,
  AWS_S3_BUCKET,
  AWS_S3_ENDPOINT,
  AWS_S3_ENDPOINT_CONNECTION
} = process.env;
const urlS3 = AWS_S3_ENDPOINT || null;
const myBucket = AWS_S3_BUCKET || 'delii';
const pathFile = 'src/Services/UploadService';
const s3 = new _clientS.S3Client({
  endpoint: AWS_S3_ENDPOINT_CONNECTION,
  // Find your endpoint in the control panel, under Settings. Prepend "https://".
  forcePathStyle: false,
  // Configures to use subdomain/virtual calling format.
  region: 'nyc3',
  credentials: {
    accessKeyId: AWS_ID,
    secretAccessKey: AWS_KEY
  }
});

/**
 *
 * @param {String} fileName File name
 * @param {String} base64 Base64 data file.
 * @return {Object|String}
 */
async function uploadFile(fileName, base64) {
  const buf = Buffer.from(base64.replace(/^data:image\/\w+;base64,/, ''), 'base64');
  const params = new _clientS.PutObjectCommand({
    Key: `${fileName}.jpg`,
    Body: buf,
    ACL: 'public-read',
    Bucket: myBucket,
    ContentEncoding: 'base64',
    ContentType: 'image/jpg'
  });
  return new Promise((response, reject) => {
    s3.send(params, (err, resp) => {
      if (err) {
        (0, _GlobalFunctions.showConsoleError)(`${pathFile}/uploadFile`, err);
        reject(err);
      } else {
        response(resp);
      }
    });
  });
}

/**
 *
 * @param {String} fileName File name
 * @param {String} base64 Base64 data pdf file.
 * @return {Object|String}
 */
async function uploadFilePdf(fileName, base64) {
  const buf = Buffer.from(base64.replace(/^data:application\/\w+;base64,/, ''), 'base64');
  const data = new _clientS.PutObjectCommand({
    Bucket: myBucket,
    Key: `${fileName}.pdf`,
    Body: buf,
    ACL: 'public-read',
    ContentEncoding: 'base64',
    ContentType: 'application/pdf'
  });
  return new Promise((response, reject) => {
    s3.send(data, (err, resp) => {
      if (err) {
        (0, _GlobalFunctions.showConsoleError)(`${pathFile}/uploadFilePdf`, err);
        reject(err);
      } else {
        response(resp);
      }
    });
  });
}
async function updatePictureAction({
  path,
  picture,
  beforePathUrl
}) {
  const ret = {
    error: false,
    url: null,
    err: null
  };
  if (!picture || !path) {
    ret.error = true;
    ret.err = 'Disculpe, pero no se ha recibido la imagen o la ruta de guardado';
    return ret;
  }
  if ((0, _Validations.isBase64)(picture)) {
    if (urlS3) {
      const nameFile = `${path}-${(0, _GlobalFunctions.setDate)()}`;
      await this.uploadFile(nameFile, picture);
      if ((0, _Validations.checkUrl)(beforePathUrl)) await this.deleteFile(beforePathUrl);
      return {
        error: false,
        url: `${urlS3}/${nameFile}.jpg`
      };
    }
    return {
      error: true,
      err: 'Disculpe, pero ha ocurrido un error al obtener la información de S3.'
    };
  }
  if ((0, _Validations.checkUrl)(picture)) {
    if (beforePathUrl && (0, _Validations.checkUrl)(beforePathUrl) && beforePathUrl?.includes(urlS3)) await this.deleteFile(beforePathUrl);
    ret.url = picture;
    return ret;
  }
  if ((0, _Validations.checkUrl)(beforePathUrl)) await this.deleteFile(beforePathUrl);
  ret.error = false;
  return ret;
}

/**
 * @param {String} urlFile URL File
 * @return {Object|String}
 */
async function deleteFile(urlFile) {
  if (urlFile.includes(AWS_S3_ENDPOINT_CONNECTION)) {
    const realNameFile = urlFile.split('com/');
    const params = new _clientS.PutObjectCommand({
      Bucket: myBucket,
      Key: realNameFile[1]
    });
    return new Promise((response, reject) => {
      s3.send(params, (err, resp) => {
        if (err) {
          (0, _GlobalFunctions.showConsoleError)(`${pathFile}/deleteFile`, err);
          reject(err);
        } else {
          response(resp);
        }
      });
    });
  }
  return true;
}
exports.default = {
  deleteFile,
  uploadFile,
  uploadFilePdf,
  updatePictureAction
};