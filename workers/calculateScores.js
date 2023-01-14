require('dotenv').config()

const cron = require('node-cron')
const pg = require('pg')
const makeSelectAnswers = require('../repo/answers/select')
const makeInsertScores = require('../repo/scores/insert')

const pgPool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
})

const task = cron.schedule('00 00 15 jan,apr,jul,oct *', () => {
  console.log('starting job')
  const today = new Date().getFullYear() + '-' + new Date().getMonth()+1 + '-' + new Date().getDate()
  const selectAnswers = makeSelectAnswers(pgPool)
  const insertScores = makeInsertScores(pgPool)

  selectAnswers({}, { id: 13 }).then(answers => {
    console.log('got answers')
    const placeIds = answers
      .map(item => item.placeId)
      .filter((item, index, self) => self.indexOf(item) === index)

    const data = placeIds.map(placeId => {
      const answersByPlace = answers.filter(item => item.placeId === placeId)
      const count = answersByPlace.length
      const yesCount = answersByPlace.filter(item => item.answer).length
      return  [placeId, Math.round(yesCount/count * 100), today]
    })

    return insertScores(data).then(() => {
      console.log('inserted scores')
    })
  })
})

task.start()