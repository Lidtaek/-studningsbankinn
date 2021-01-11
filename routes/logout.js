const Router = require('express').Router

function makeLogoutRouter (logout) {
  const router = Router()

  router.post('/', (req, res, next) => {
    logout(req.user.token)
      .then(() => {
        res.clearCookie('STUDNINGSBANKINN_API').sendStatus(200)
      })
      .catch(next)
  })

  return router
}

module.exports = makeLogoutRouter
