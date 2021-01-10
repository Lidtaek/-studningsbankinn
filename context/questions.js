
function makeQuestionsContext (db) {
  const makeSelectQuestions = require('../repo/questions/select')
  const makeInsertQuestions = require('../repo/questions/insert')
  const makeUpdateQuestions = require('../repo/questions/update')
  const makeDeleteQuestions = require('../repo/questions/delete')
  const makePlaceRouter = require('../routes/crud')

  const selectQuestions = makeSelectQuestions(db)
  const insertQuestions = makeInsertQuestions(db)
  const updateQuestions = makeUpdateQuestions(db)
  const deleteQuestions = makeDeleteQuestions(db)

  return makePlaceRouter(selectQuestions, insertQuestions, updateQuestions, deleteQuestions)
}

module.exports = makeQuestionsContext
