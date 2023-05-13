import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';
import MyRouterFile from './Routes/MyRouterFile';
import { app, startServer } from './ServerWebsocket';
import { loadEnv } from './Functions/GlobalFunctions';
import _404Router from './Routes/_404Router';

import './database';

loadEnv();

const { LOGS_FORMAT, NODE_ENV, PORT, SENTRY_DNS, SENTRY_ENABLE, SENTRY_ENV } = process.env;
const { graphqlHTTP } = require('express-graphql');

// import schemas   //
const schema = require('./Models/schema/schema');
// settings
app.use(morgan(LOGS_FORMAT || 'dev'));
app.use(cors());

// middleware
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

// show only in develop or testing
if (NODE_ENV !== 'production') app.use(express.static('public'));

// ---------------set API------------ //


app.use('/api/order', graphqlHTTP({
  schema,
  graphiql:true
}));


app.use('/', MyRouterFile);
app.use('/*', _404Router);



if (SENTRY_DNS && SENTRY_ENABLE === 'true') {
  Sentry.init({
    environment: SENTRY_ENV || 'development',
    dsn: SENTRY_DNS,
    integrations: [new Sentry.Integrations.Http({ tracing: true }), new Tracing.Integrations.Express({ app })],
    tracesSampleRate: 1.0,
  });

  // RequestHandler creates a separate execution context using domains, so that every
  // transaction/span/breadcrumb is attached to its own Hub  instance
  app.use(Sentry.Handlers.requestHandler());
  // TracingHandler creates a trace for every incoming request
  app.use(Sentry.Handlers.tracingHandler());
  // The error handler must be before any other error middleware and after all controllers
  app.use(Sentry.Handlers.errorHandler());
}

startServer(PORT, async () => {
  console.log('================================================');
  console.log(`Server running on port: ${PORT}`);
  console.log('================================================');
});
