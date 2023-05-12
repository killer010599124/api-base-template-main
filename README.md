# Delii - API Template

## Install

- Clone this repository: `git clone git@github.com:DeliiApp/api-base-template.git`

- You must have MongoDB installed.

- Configure the `.env` (default), `.env.development` or `.env.production` file with the system params.

- The database's params must be indicates in the .env.\* file.

- To init Websocket with Redis adapter is necessary enable the value `REDIS_ACTIVE=true` in `.env` file. If you won't use Redis adapter, but you want to use Websockets, set value `REDIS_ACTIVE=false` (this value is default).

- Commands

```
  # Install dependencies
  $ npm i

  # Build for production server
  $ npm run build

  # Generate API Doc
  $ npm run docs

  # Review, preformat, build the code and generate docs before create commit
  $ npm run precommit

  # Serve with hot reload at localhost:9000 to dev
  $ npm run dev

  # Run Server in production
  $ npm run start

  # Confirms that the server works
  http://localhost:9000/api
  http://yourdomain.com/api

  # Access to documentation in the broswer
  http://localhost:9000/apidoc
  http://yourdomain.com/apidoc
```

## Server config

```
  # SERVER API
  # dev = develop, test = testing, release= produccion
  PORT=9000
  # LOGS_FORMAT: dev | combined | common | short | tiny
  # (default: dev | recommended: combined)
  LOGS_FORMAT=dev
```

## Database params

```
  ## Only enable if DB is Mongo Atlas or Mongo SRV
  DDB_ATLAS=true
  ## The link connect must paste without => 'mongodb+srv://'
  DDB_HOST=<user>:<password>@cluster-example.server-db.net/<dbname>?extraParam1=value&extraParam2=value
  DDB_PORT=27017
  DDB_NAME=namedb
  DDB_USER=user
  DDB_PASSWORD=password
  # Indicate if is required 'cert.crt'. In case of 'true' = the certificate must called 'ca-certificate.crt' in the './' project path
  DDB_CERT=true
  # Indicate if the certificate is to develop (only apply if DDB_CERT = true). In case of 'true', the certificate muts called 'ca-certificate-dev.crt'
  #DDB_CERT_DEV=true
```

## AWS (Amazon Web Services) params

```
AWS_ID=ID_AWS
AWS_KEY=KEY_AWS
## You must remove the last '/'. Must end only with '.com'
AWS_S3_BUCKET=my-bucket
AWS_S3_ENDPOINT=https://my-bucket.nyc3.digitaloceanspaces.com
AWS_S3_ENDPOINT_CONNECTION=https://nyc3.digitaloceanspaces.com
```

## Redis params

```
# REDIS
# if you want enable, change value to true
REDIS_ACTIVE=false
REDIS_HOST="redis://server.host.com"
REDIS_USER="default"
REDIS_PASS=""
```

## HABLAME Service (SMS) params (Optional)

```
# HABLAME API
HABLAME_ENABLE=false
HABLAME_URI="https://api101.hablame.co/api/sms/v2.1/send/"
HABLAME_ACCOUNT="your-account"
HABLAME_API_KEY="your-api-key"
HABLAME_TOKEN="your-token"
```

## Push notifications service params (OneSignal) (Optional)

```
# ONE SIGNAL
ONE_SIGNAL_ID=""
ONE_SIGNAL_KEY=""
```

## SENTRY Service params

If you want enable the sentry services, change the value of `SENTRY_ENABLE` to `true` and assign the `SENTRY_DNS` value.

**NOTE**: If you are in a development environment, we recommend not enabling this section, unless you need to do some verification in Sentry. To do this, you must indicate the value of `SENTRY_ENV` with the value of your environment. Eg: `development`, ..., `custom-env`

```
# SENTRY
SENTRY_ENABLE=false
SENTRY_ENV=development
SENTRY_DNS=
```

## Configure Send Mail

To send mail you must configure the credentials in your .env file, just find the # MAILER comment and complete the require data:

```
  USER_AUTH_MAIL=
  PASS_AUTH_MAIL=
  HOST_MAIL=
  PORT_MAIL=

  # emails to BCC when sending the invoice separated by comma
  BCC=""
```

## To use API is required session token, to verify Authenticated in the Middleware of the API

```
Add in the headers the value to check session logged:
'x-access-token': token

Where, token is a recived value for the login action.
```

## More documentation about Express.js

- Official documentation [Express.js docs](https://expressjs.com).

## Others docs

- [AWS Node.js Docs](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/welcome.html).
- [Arcgis for JavaScript](https://developers.arcgis.com/javascript/latest/).
- [Redis project - GitHub](https://github.com/NodeRedis/node-redis).
- [Epayco Docs](https://docs.epayco.co/definition).
- [Hablame.co (SMS Service) Docs](https://developer.hablame.co/).
- [One Signal (Notifications Service) Docs](https://documentation.onesignal.com/reference/create-notification).
- [MongoDB Docs](https://docs.mongodb.com/drivers/node/current/).
- [Mongoose Docs](https://mongoosejs.com/docs/).
