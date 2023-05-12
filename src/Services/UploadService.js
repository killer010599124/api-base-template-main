import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { loadEnv, setDate, showConsoleError } from '../Functions/GlobalFunctions';
import { checkUrl, isBase64 } from '../Functions/Validations';

loadEnv();

const { AWS_ID, AWS_KEY, AWS_S3_BUCKET, AWS_S3_ENDPOINT, AWS_S3_ENDPOINT_CONNECTION } = process.env;
const urlS3 = AWS_S3_ENDPOINT || null;

const myBucket = AWS_S3_BUCKET || 'delii';
const pathFile = 'src/Services/UploadService';

const s3 = new S3Client({
  endpoint: AWS_S3_ENDPOINT_CONNECTION, // Find your endpoint in the control panel, under Settings. Prepend "https://".
  forcePathStyle: false, // Configures to use subdomain/virtual calling format.
  region: 'nyc3',
  credentials: {
    accessKeyId: AWS_ID,
    secretAccessKey: AWS_KEY,
  },
});

/**
 *
 * @param {String} fileName File name
 * @param {String} base64 Base64 data file.
 * @return {Object|String}
 */
export async function uploadFile(fileName, base64) {
  const buf = Buffer.from(base64.replace(/^data:image\/\w+;base64,/, ''), 'base64');
  const params = new PutObjectCommand({
    Key: `${fileName}.jpg`,
    Body: buf,
    ACL: 'public-read',
    Bucket: myBucket,
    ContentEncoding: 'base64',
    ContentType: 'image/jpg',
  });

  return new Promise((response, reject) => {
    s3.send(params, (err, resp) => {
      if (err) {
        showConsoleError(`${pathFile}/uploadFile`, err);
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
export async function uploadFilePdf(fileName, base64) {
  const buf = Buffer.from(base64.replace(/^data:application\/\w+;base64,/, ''), 'base64');
  const data = new PutObjectCommand({
    Bucket: myBucket,
    Key: `${fileName}.pdf`,
    Body: buf,
    ACL: 'public-read',
    ContentEncoding: 'base64',
    ContentType: 'application/pdf',
  });

  return new Promise((response, reject) => {
    s3.send(data, (err, resp) => {
      if (err) {
        showConsoleError(`${pathFile}/uploadFilePdf`, err);
        reject(err);
      } else {
        response(resp);
      }
    });
  });
}

export async function updatePictureAction({ path, picture, beforePathUrl }) {
  const ret = { error: false, url: null, err: null };

  if (!picture || !path) {
    ret.error = true;
    ret.err = 'Disculpe, pero no se ha recibido la imagen o la ruta de guardado';
    return ret;
  }

  if (isBase64(picture)) {
    if (urlS3) {
      const nameFile = `${path}-${setDate()}`;
      await this.uploadFile(nameFile, picture);

      if (checkUrl(beforePathUrl)) await this.deleteFile(beforePathUrl);

      return { error: false, url: `${urlS3}/${nameFile}.jpg` };
    }
    return {
      error: true,
      err: 'Disculpe, pero ha ocurrido un error al obtener la información de S3.',
    };
  }
  if (checkUrl(picture)) {
    if (beforePathUrl && checkUrl(beforePathUrl) && beforePathUrl?.includes(urlS3))
      await this.deleteFile(beforePathUrl);

    ret.url = picture;
    return ret;
  }

  if (checkUrl(beforePathUrl)) await this.deleteFile(beforePathUrl);

  ret.error = false;

  return ret;
}

/**
 * @param {String} urlFile URL File
 * @return {Object|String}
 */
export async function deleteFile(urlFile) {
  if (urlFile.includes(AWS_S3_ENDPOINT_CONNECTION)) {
    const realNameFile = urlFile.split('com/');

    const params = new PutObjectCommand({
      Bucket: myBucket,
      Key: realNameFile[1],
    });

    return new Promise((response, reject) => {
      s3.send(params, (err, resp) => {
        if (err) {
          showConsoleError(`${pathFile}/deleteFile`, err);
          reject(err);
        } else {
          response(resp);
        }
      });
    });
  }
  return true;
}

export default {
  deleteFile,
  uploadFile,
  uploadFilePdf,
  updatePictureAction,
};
