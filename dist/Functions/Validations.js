"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkNameOrLastName = checkNameOrLastName;
exports.checkIdentification = checkIdentification;
exports.checkIdentificationType = checkIdentificationType;
exports.validateUrl = validateUrl;
exports.checkPhone = checkPhone;
exports.checkPassword = checkPassword;
exports.checkEmail = checkEmail;
exports.checkObjectId = checkObjectId;
exports.isBase64 = isBase64;
exports.checkUrl = checkUrl;
exports.checkSlug = checkSlug;
exports.checkTitlesOrDescriptions = checkTitlesOrDescriptions;
exports.checkCoordinate = checkCoordinate;
function checkNameOrLastName(value) {
  return value && /^([A-Z\u00C0-\u024F\u1E00-\u1EFF]?)+([[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]+[,.]?[ ]?|[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]+['-]]?)+$/.test(`${value}`);
}
function checkIdentification(value) {
  return value && /^([CC|CT|TI|PE|PAS]){2,3}[0-9]{5,20}$/.test(value.toUpperCase());
}
function checkIdentificationType(value) {
  return value && /^([CC|CT|TI|PE|PAS]){2,3}/.test(value.toUpperCase());
}
function validateUrl(value) {
  return /^(?:(?:(?:https?|ftp):)?\/\/)?(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(`${value}`);
}
function checkPhone(value) {
  return value && /^[+]?[(]?([0-9]{2})?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(`${value}`);
}
function checkPassword(value) {
  return value && /^(?=.*\d)?(?=.*[A-Z])?(?=.*[a-z]?)?(?=.*[^\w\d\s:]?)([^\s]){6,25}$/.test(`${value}`);
}
function checkEmail(value) {
  return value && /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(`${value}`);
}
function checkObjectId(id) {
  return /^[0-9a-fA-F]{24}$/.test(id);
}
function isBase64(base64, doc = false) {
  if (!base64) return false;
  if (doc) return base64.includes('data:application/pdf');
  return base64.includes('data:image/');
}
function checkUrl(value) {
  return /^(?:(?:(?:http?|https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(`${value}`);
}
function checkSlug(value) {
  return value && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(`${value}`);
}
function checkTitlesOrDescriptions(value) {
  return value && /^[a-zA-ZÁÉÍÓÚÀÈÌÒÙàèìòùáéíóúÂÊÎÔÛâêîôûÄËÏÖÜäëïöüñÑ0-9\s.,#*?¿¡!()\-+"'/@]{3,2000}/g.test(`${value}`);
}
function checkCoordinate(coord = null) {
  return /^[-+]?\d+(\.\d+)?$/.test(`${coord}`.trim());
}
exports.default = {
  checkCoordinate,
  checkNameOrLastName,
  checkIdentification,
  checkIdentificationType,
  checkEmail,
  checkObjectId,
  checkPhone,
  checkPassword,
  checkSlug,
  checkTitlesOrDescriptions,
  checkUrl,
  isBase64,
  validateUrl
};