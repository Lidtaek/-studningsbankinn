
function makeUserContext (db) {
  const makeSelectUsers = require('../repo/users/select')
  const makeInsertUsers = require('../repo/users/insert')
  const makeUpdateUsers = require('../repo/users/update')
  const makeDeleteUsers = require('../repo/users/delete')
  const makePlaceRouter = require('../routes/places')

  const selectAnswers = makeSelectUsers(db)
  const insertAnswers = makeInsertUsers(db)
  const updateAnswers = makeUpdateUsers(db)
  const deleteAnswers = makeDeleteUsers(db)
  return makePlaceRouter(selectAnswers, insertAnswers, updateAnswers, deleteAnswers)
}

module.exports = makeUserContext
