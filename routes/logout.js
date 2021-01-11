const Router = require('express').Router

function makeLogoutRouter (logout, isProduction) {
  const router = Router()

  router.post('/', (req, res, next) => {
    logout(req.user.token)
      .then(() => {
        res
          .clearCookie(
            'STUDNINGSBANKINN_API',
            {
              domain: 'studningsbankinn.is',
              secure: isProduction,
              maxAge: 0,
              httpOnly: true,
              sameSite: true,
              path: '/'
            }
          )
          .sendStatus(200)
      })
      .catch(next)
  })

  return router
}

module.exports = makeLogoutRouter
