"use strict";

var _path = require("path");
var _path2 = _interopRequireDefault(_path);
var _mongoose = require("mongoose");
var _mongoose2 = _interopRequireDefault(_mongoose);
var _GlobalFunctions = require("./Functions/GlobalFunctions");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class Database {
  constructor() {
    const dbHost = process.env.DDB_HOST || '';
    const dbName = process.env.DDB_NAME || '';
    const dbUser = process.env.DDB_USER || '';
    const dbPwd = process.env.DDB_PASSWORD || '';
    const dbAtlas = process.env.DDB_ATLAS || 'false';
    const dbCert = process.env.DDB_CERT || 'false';
    const dbDev = process.env.DDB_CERT_DEV || 'false';
    if (dbHost && dbName) {
      const mongoOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true
        // useCreateIndex: true,
      };

      _mongoose2.default.set('strictQuery', false);
      let connect;
      if (dbAtlas === 'true') {
        connect = `mongodb+srv://${dbHost}`;
        connect = connect.replace('<user>', dbUser);
        connect = connect.replace('<password>', dbPwd);
        connect = connect.replace('<dbname>', dbName);
        // connect += '&authSource=doadmin';
        if (dbCert === 'true') {
          mongoOptions.ssl = true;
          mongoOptions.sslCA = _path2.default.resolve(__dirname, `../ca-certificate${dbDev === 'true' ? '-dev' : ''}.crt`);
        }
      } else {
        const dbAuthString = dbUser !== '' ? `${dbUser}:${dbPwd}@` : '';
        connect = `mongodb://${dbAuthString}${encodeURIComponent(process.env.DDB_HOST)}:${encodeURIComponent(process.env.DDB_PORT)}/${encodeURIComponent(process.env.DDB_NAME)}`;
      }
      this.connection = _mongoose2.default.connect(connect, mongoOptions).catch(error => {
        console.log('error', error);
        (0, _GlobalFunctions.showConsoleError)('database', error);
      });
    } else {
      (0, _GlobalFunctions.showConsoleLog)('No existen parámetros para conectar la base de datos.');
    }
  }
}
const DB = new Database();
module.exports = DB;