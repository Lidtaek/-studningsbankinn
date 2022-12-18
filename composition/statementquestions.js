
function makeStatementQuestionsComposition (db) {
  const makeSelectStatementQuestions = require('../repo/statementquestions/select')
  const makeInsertStatementQuestions = require('../repo/statementquestions/insert')
  const makeUpdateStatementQuestions = require('../repo/statementquestions/update')
  const makeDeleteStatementQuestions = require('../repo/statementquestions/delete')
  const makeStatementQuestionsRouter = require('../routes/crud')

  const selectStatementQuestions = makeSelectStatementQuestions(db)
  const insertStatementQuestions = makeInsertStatementQuestions(db)
  const updateStatementQuestions = makeUpdateStatementQuestions(db)
  const deleteStatementQuestions = makeDeleteStatementQuestions(db)

  return makeStatementQuestionsRouter(selectStatementQuestions, insertStatementQuestions, updateStatementQuestions, deleteStatementQuestions)
}

module.exports = makeStatementQuestionsComposition
