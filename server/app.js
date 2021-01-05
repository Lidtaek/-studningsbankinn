
const express = require('express')
const compression = require('compression')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const enforceHttps = require('express-sslify').HTTPS
const cors = require('cors')

function createApp (isProduction) {
   const app = express()

  if (isProduction) {
    app.use(enforceHttps({
      trustProtoHeader: true
    }))
    app.use(compression())
    app.use(helmet({
      contentSecurityPolicy: false
    }))
  }

  app.use(cors())
  app.use(bodyParser.json({ limit: '40mb' }))
  app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }))

  return app
}

module.exports = createApp
