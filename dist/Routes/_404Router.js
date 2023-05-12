"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _express = require("express");
var _express2 = _interopRequireDefault(_express);
var _TestController = require("../Controllers/TestController");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = _express2.default.Router();

/* ADS */
router.route('/*').delete(_TestController.myTest404).get(_TestController.myTest404).post(_TestController.myTest404).put(_TestController.myTest404);
exports.default = router;