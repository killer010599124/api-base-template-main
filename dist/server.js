"use strict";

var _cors = require("cors");
var _cors2 = _interopRequireDefault(_cors);
var _express = require("express");
var _express2 = _interopRequireDefault(_express);
var _morgan = require("morgan");
var _morgan2 = _interopRequireDefault(_morgan);
var _node = require("@sentry/node");
var Sentry = _interopRequireWildcard(_node);
var _tracing = require("@sentry/tracing");
var Tracing = _interopRequireWildcard(_tracing);
var _MyRouterFile = require("./Routes/MyRouterFile");
var _MyRouterFile2 = _interopRequireDefault(_MyRouterFile);
var _ServerWebsocket = require("./ServerWebsocket");
var _GlobalFunctions = require("./Functions/GlobalFunctions");
var _404Router2 = require("./Routes/_404Router");
var _404Router3 = _interopRequireDefault(_404Router2);
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
(0, _GlobalFunctions.loadEnv)();
const {
  LOGS_FORMAT,
  NODE_ENV,
  PORT,
  SENTRY_DNS,
  SENTRY_ENABLE,
  SENTRY_ENV
} = process.env;

/*
  Cron to check due dates

  If you need to execute cron jobs, you can uncomment this area.
  Import 'node-cron' and set yours tasks
 */
// if (NODE_ENV !== 'development') {
//   cron.schedule(
//     '1 0 * * *',
//     async () => {
//       GlobalFunctions.showConsoleLog('Iniciando actividades programadas.');
//       await myFunctionCronJob();
//       GlobalFunctions.showConsoleLog('Finalizada actividades programadas.');
//     },
//     { scheduled: true }
//   );
// }

// settings
_ServerWebsocket.app.use((0, _morgan2.default)(LOGS_FORMAT || 'dev'));
_ServerWebsocket.app.use((0, _cors2.default)());

// middleware
_ServerWebsocket.app.use(_express2.default.json({
  limit: '25mb'
}));
_ServerWebsocket.app.use(_express2.default.urlencoded({
  extended: true,
  limit: '25mb'
}));

// show only in develop or testing
if (NODE_ENV !== 'production') _ServerWebsocket.app.use(_express2.default.static('public'));
_ServerWebsocket.app.use('/', _MyRouterFile2.default);
_ServerWebsocket.app.use('/*', _404Router3.default);
if (SENTRY_DNS && SENTRY_ENABLE === 'true') {
  Sentry.init({
    environment: SENTRY_ENV || 'development',
    dsn: SENTRY_DNS,
    integrations: [new Sentry.Integrations.Http({
      tracing: true
    }), new Tracing.Integrations.Express({
      app: _ServerWebsocket.app
    })],
    tracesSampleRate: 1.0
  });

  // RequestHandler creates a separate execution context using domains, so that every
  // transaction/span/breadcrumb is attached to its own Hub  instance
  _ServerWebsocket.app.use(Sentry.Handlers.requestHandler());
  // TracingHandler creates a trace for every incoming request
  _ServerWebsocket.app.use(Sentry.Handlers.tracingHandler());
  // The error handler must be before any other error middleware and after all controllers
  _ServerWebsocket.app.use(Sentry.Handlers.errorHandler());
}
(0, _ServerWebsocket.startServer)(PORT, async () => {
  console.log('================================================');
  console.log(`Server running on port: ${PORT}`);
  console.log('================================================');
});