
function makeStatementsComposition (db) {
  const makeSelectStatements = require('../repo/statements/select')
  const makeInsertStatements = require('../repo/statements/insert')
  const makeUpdateStatements = require('../repo/statements/update')
  const makeDeleteStatements = require('../repo/statements/delete')
  const makeStatementsRouter = require('../routes/crud')

  const selectStatements = makeSelectStatements(db)
  const insertStatements = makeInsertStatements(db)
  const updateStatements = makeUpdateStatements(db)
  const deleteStatements = makeDeleteStatements(db)

  return makeStatementsRouter(selectStatements, insertStatements, updateStatements, deleteStatements)
}

module.exports = makeStatementsComposition
