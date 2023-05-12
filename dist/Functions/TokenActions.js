"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTokenCode = getTokenCode;
var _jsonwebtoken = require("jsonwebtoken");
var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function getTokenCode(data) {
  return _jsonwebtoken2.default.sign({
    data
  }, process.env.SEED_JWT, {
    expiresIn: Number.parseInt(process.env.TIME_JWT_CODE, 10) || 31536000000 * 10
  });
}
exports.default = {
  getTokenCode
};