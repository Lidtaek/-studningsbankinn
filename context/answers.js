
function makeAnswersContext (db) {
  const makeSelectAnswers = require('../repo/answers/select')
  const makeInsertAnswers = require('../repo/answers/insert')
  const makeUpdateAnswers = require('../repo/answers/update')
  const makeDeleteAnswers = require('../repo/answers/delete')
  const makePlaceRouter = require('../routes/places')

  const selectAnswers = makeSelectAnswers(db)
  const insertAnswers = makeInsertAnswers(db)
  const updateAnswers = makeUpdateAnswers(db)
  const deleteAnswers = makeDeleteAnswers(db)
  return makePlaceRouter(selectAnswers, insertAnswers, updateAnswers, deleteAnswers)
}

module.exports = makeAnswersContext
