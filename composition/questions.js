
function makeQuestionsComposition (db) {
  const makeSelectQuestions = require('../repo/questions/select')
  const makeInsertQuestions = require('../repo/questions/insert')
  const makeUpdateQuestions = require('../repo/questions/update')
  const makeRemoveQuestions = require('../repo/questions/remove')
  const makeDeleteQuestion = require('../repo/questions/delete')
  const makeDeleteQuestionFromAnswers = require('../repo/answers/deleteQuestion')
  const makeDeleteQuestionFromQuestionnaire = require('../repo/questionnaires/deleteQuestion')
  
  const makePlaceRouter = require('../routes/crud')

  const selectQuestions = makeSelectQuestions(db)
  const insertQuestions = makeInsertQuestions(db)
  const updateQuestions = makeUpdateQuestions(db)
  const removeQuestion = makeRemoveQuestions(makeDeleteQuestion, makeDeleteQuestionFromAnswers, makeDeleteQuestionFromQuestionnaire, db)

  return makePlaceRouter(selectQuestions, insertQuestions, updateQuestions, removeQuestion)
}

module.exports = makeQuestionsComposition
