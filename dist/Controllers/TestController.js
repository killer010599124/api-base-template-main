"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.myTest = myTest;
exports.myTest404 = myTest404;
var _GlobalFunctions = require("../Functions/GlobalFunctions");
/*
  Example method for controller

 */

const path = 'Controllers/TestController';
function myTest(req, res) {
  try {
    return (0, _GlobalFunctions.getResponse)(res, {
      status: 200,
      mss: 'Test API Template'
    });
  } catch (e) {
    return (0, _GlobalFunctions.getResponseError)(res, e, `${path}/myTest`);
  }
}
function myTest404(req, res) {
  try {
    return (0, _GlobalFunctions.getResponse)(res, {
      status: 404,
      mss: 'Not found!'
    });
  } catch (e) {
    return (0, _GlobalFunctions.getResponseError)(res, e, `${path}/myTest404`);
  }
}
exports.default = {
  myTest,
  myTest404
};