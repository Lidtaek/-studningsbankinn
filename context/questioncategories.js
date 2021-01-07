
function makeQuestionsContext (db) {
  const makeSelectQuestionCategories = require('../repo/questioncategories/select')
  const makeInsertQuestionCategories = require('../repo/questioncategories/insert')
  const makeUpdateQuestionCategories = require('../repo/questioncategories/update')
  const makeDeleteQuestionCategories = require('../repo/questioncategories/delete')
  const makePlaceRouter = require('../routes/places')

  const selectQuestionCategories = makeSelectQuestionCategories(db)
  const insertQuestionCategories = makeInsertQuestionCategories(db)
  const updateQuestionCategories = makeUpdateQuestionCategories(db)
  const deleteQuestionCategories = makeDeleteQuestionCategories(db)

  return makePlaceRouter(selectQuestionCategories, insertQuestionCategories, updateQuestionCategories, deleteQuestionCategories)
}

module.exports = makeQuestionsContext
