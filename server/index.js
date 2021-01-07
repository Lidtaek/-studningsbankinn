require('dotenv').config()

const pg = require('pg')
const redis = require('redis')
const logger = require('heroku-logger')
const createApp = require('./app')
const makePlacesContext = require('../context/places')
const makeQuestionsContext = require('../context/questions')
const makeQuestionCategoriesContext = require('../context/questioncategories')

const pgPool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
})
const redisClient = redis.createClient({
  url: process.env.REDIS_URL
})

const isProduction = process.env.NODE_ENV === 'production'

const app = createApp(isProduction)

app.use('/places', makePlacesContext(pgPool))
app.use('/questions', makeQuestionsContext(pgPool))
app.use('/questioncategories', makeQuestionCategoriesContext(pgPool))

const port = process.env.PORT || 3001
app.listen(port, () => {
  logger.info('server running on port ' + port)
})
