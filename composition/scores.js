
function makeScoreComposition (db) {
  const makeSelectScore = require('../repo/scores/select')
  const makeInsertScore = require('../repo/scores/insert')
  const makeUpdateScore = require('../repo/scores/update')
  const makeDeleteScore = require('../repo/scores/delete')
  const makeScoreRouter = require('../routes/crud')

  const selectScore = makeSelectScore(db)
  const insertScore = makeInsertScore(db)
  const updateScore = makeUpdateScore(db)
  const deleteScore = makeDeleteScore(db)

  return makeScoreRouter(selectScore, insertScore, updateScore, deleteScore)
}

module.exports = makeScoreComposition
