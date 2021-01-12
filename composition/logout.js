
function makeLogoutComposition (redis) {
  const makeDelUser = require('../userstore/del')
  const delUser = makeDelUser(redis)

  const makeLogoutRouter = require('../routes/logout')
  const logoutRouter = makeLogoutRouter(delUser)

  return logoutRouter
}

module.exports = makeLogoutComposition
