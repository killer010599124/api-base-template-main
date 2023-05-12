"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _express = require("express");
var _express2 = _interopRequireDefault(_express);
var _TestController = require("../Controllers/TestController");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const myRouterFile = _express2.default.Router();

// ===================================================================================

// ruta de pruebas
myRouterFile.route('/').delete(_TestController.myTest).get(_TestController.myTest).post(_TestController.myTest).put(_TestController.myTest);

// ===================================================================================
exports.default = myRouterFile;