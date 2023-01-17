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

//const task = cron.schedule('00 00 15 jan,apr,jul,oct *', () => {
  console.log('starting job')
  const today = new Date().getFullYear() + '-' + new Date().getMonth()+1 + '-' + new Date().getDate()
  const selectAnswers = makeSelectAnswers(pgPool)
  const insertScores = makeInsertScores(pgPool)

  selectAnswers({}, { id: 13 }).then(answers => {
    const data = []
    answers.forEach(answer => {
      const last = data[data.length - 1] || []
      if (last[0] !== answer.placeId || last[1] !== answer.questionCategoryId) {
        const line = [
          answer.placeId,
          answer.questionCategoryId,
          0,
          0,
          0,
          today
        ]

        data.push(line)
      }

      last[2] += answer.answer === true ? 1 : 0
      last[3] += answer.answer === false ? 1 : 0
      last[4] += answer.answer === null ? 1 : 0
    })    
    
    return insertScores(data).then(() => {
      console.log('inserted scores')
    })
  })
//})

// task.start()

