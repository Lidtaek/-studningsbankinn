
function makeStatementsComposition (db) {
  const makeSelectStatements = require('../repo/statements/select')
  const makeInsertStatements = require('../repo/statements/insert')
  const makeUpdateStatements = require('../repo/statements/update')
  const makeDeleteStatements = require('../repo/statements/delete')
  const makeScoreStatements = require('../repo/statements/score')
  const makeStatementsRouter = require('../routes/statements')

  const selectStatements = makeSelectStatements(db)
  const insertStatements = makeInsertStatements(db)
  const updateStatements = makeUpdateStatements(db)
  const deleteStatements = makeDeleteStatements(db)
  const scoreStatements = makeScoreStatements(db)

  return makeStatementsRouter(selectStatements, insertStatements, updateStatements, deleteStatements, scoreStatements)
}

module.exports = makeStatementsComposition
