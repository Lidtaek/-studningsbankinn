
function makeLoginComposition (db, redis, isProduction) {
  const makeSelectUsers = require('../repo/users/select')
  const selectUsers = makeSelectUsers(db)

  const makeSetUser = require('../userstore/set')
  const setUser = makeSetUser(redis)

  const makeLogin = require('../lib/login')
  const login = makeLogin(selectUsers, setUser)

  const makeLoginRouter = require('../routes/login')
  const loginRouter = makeLoginRouter(login, isProduction)

  return loginRouter
}

module.exports = makeLoginComposition
