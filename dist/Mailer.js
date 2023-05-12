"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Mailer;
var _nodemailer = require("nodemailer");
var _nodemailer2 = _interopRequireDefault(_nodemailer);
var _GlobalFunctions = require("./Functions/GlobalFunctions");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
(0, _GlobalFunctions.loadEnv)();
function Mailer() {
  const {
    HOST_MAIL,
    PORT_MAIL,
    USER_AUTH_MAIL,
    PASS_AUTH_MAIL
  } = process.env;
  if (HOST_MAIL !== '' && PORT_MAIL !== '' && USER_AUTH_MAIL !== '' && PASS_AUTH_MAIL !== '') {
    return _nodemailer2.default.createTransport({
      host: HOST_MAIL,
      port: PORT_MAIL,
      auth: {
        user: USER_AUTH_MAIL,
        pass: PASS_AUTH_MAIL
      }
    });
  }
  return null;
}