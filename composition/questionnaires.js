
function makeQuestionnairesComposition (db) {
  const makeSelectQuestionnaires = require('../repo/questionnaires/select')
  const makeInsertQuestionnaires = require('../repo/questionnaires/insert')
  const makeUpdateQuestionnaires = require('../repo/questionnaires/update')
  const makeDeleteQuestionnaires = require('../repo/questionnaires/delete')
  const makePlaceRouter = require('../routes/crud')

  const selectQuestionnaires = makeSelectQuestionnaires(db)
  const insertQuestionnaires = makeInsertQuestionnaires(db)
  const updateQuestionnaires = makeUpdateQuestionnaires(db, makeInsertQuestionnaires, makeDeleteQuestionnaires)
  const deleteQuestionnaires = makeDeleteQuestionnaires(db)

  return makePlaceRouter(selectQuestionnaires, insertQuestionnaires, updateQuestionnaires, deleteQuestionnaires)
}

module.exports = makeQuestionnairesComposition
