require('dotenv').config()

const pg = require('pg')
const redis = require('redis')
const logger = require('heroku-logger')
const createApp = require('./app')
const makeAuthorize = require('./authorize')
const makePlacesContext = require('../context/places')
const makeQuestionsContext = require('../context/questions')
const makeQuestionCategoriesContext = require('../context/questioncategories')
const makeAnswersContext = require('../context/answers')
const makeUsersContext = require('../context/users')
const makeLoginContext = require('../context/login')
const makeLogoutContext = require('../context/logout')

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
const authorize = makeAuthorize(redisClient, logger)

app.use('/login', makeLoginContext(pgPool, redisClient, isProduction))
app.use(authorize())
app.use('/logout', makeLogoutContext(redisClient))
app.use('/places', makePlacesContext(pgPool))
app.use('/questions', makeQuestionsContext(pgPool))
app.use('/questioncategories', makeQuestionCategoriesContext(pgPool))
app.use('/answers', makeAnswersContext(pgPool))
app.use('/users', makeUsersContext(pgPool, redisClient))

app.get('/user', (req, res) => {
  if (req.user) {
    return res.json(req.user)
  }

  return res.sendStatus(404)
})

const port = process.env.PORT || 3001
app.listen(port, () => {
  logger.info('server running on port ' + port)
})
