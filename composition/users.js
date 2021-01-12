
function makeUserComposition (db, redis) {
  const makeSelectUsers = require('../repo/users/select')
  const makeInsertUsers = require('../repo/users/insert')
  const makeUpdateUsers = require('../repo/users/update')
  const makeDeleteUsers = require('../repo/users/delete')
  const makePlaceRouter = require('../routes/crud')

  const makeSetUser = require('../userstore/set')
  const setUser = makeSetUser(redis)

  const selectUsers = makeSelectUsers(db)
  const insertUsers = makeInsertUsers(db, setUser)
  const updateUsers = makeUpdateUsers(db, setUser)
  const deleteUsers = makeDeleteUsers(db)
  return makePlaceRouter(selectUsers, insertUsers, updateUsers, deleteUsers)
}

module.exports = makeUserComposition
