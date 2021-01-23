
const makeSelectUsers = require('../repo/users/select')
const makeInsertUsers = require('../repo/users/insert')
const makeUpdateUsers = require('../repo/users/update')
const makeDeleteUsers = require('../repo/users/delete')
const makePlaceRouter = require('../routes/crud')
const makeCreateUser = require('../lib/user')
const makeSetUser = require('../userstore/set')

function makeUserComposition (db, redis) {
  const selectUsers = makeSelectUsers(db)
  const insertUsers = makeInsertUsers(db)
  const updateUsers = makeUpdateUsers(db)
  const deleteUsers = makeDeleteUsers(db)

  const setUser = makeSetUser(redis)

  const createUser = makeCreateUser(insertUsers, selectUsers, setUser)
  const editUser = makeCreateUser(updateUsers, selectUsers, setUser)

  return makePlaceRouter(selectUsers, createUser, editUser, deleteUsers)
}

module.exports = makeUserComposition
