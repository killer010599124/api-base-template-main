"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.responseError = responseError;
exports.validateTokenApp = validateTokenApp;
var _jsonwebtoken = require("jsonwebtoken");
var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function responseError(res, err) {
  return res.status(401).json({
    err
  });
}
function getToken(req) {
  return req ? req.headers['x-access-token'] || req.body.token || req.headers.Authorization : null;
}
function validateTokenApp(req, res, next) {
  const token = getToken(req);
  if (!token) return responseError(res, 'Token is trash.');
  return _jsonwebtoken2.default.verify(token, process.env.SEED_JWT, async (err, decoded) => {
    if (err) return responseError(res, err.toString());
    if (decoded.data) {
      req.body.tokenId = decoded.data._id;
      req.body.tokenPhone = decoded.data.phone || null;
      req.body.tokenAuth = token;
      req.body.type = decoded.data.type;
      req.body.moduleToken = decoded.data.module;
      return next();
    }
    return responseError(res, 'Token is trash');
  });
}
exports.default = {
  validateTokenApp
};