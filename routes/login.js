const Router = require('express').Router

function makeLoginRouter (login, isProduction) {
  const router = Router()

  router.post('/', (req, res, next) => {
    const username = req.body.username
    const password = req.body.password

    return login(username, password)
      .then(user => {
        if (user && user.token) {
          res
            .cookie(
              'STUDNINGSGRUNNUR_API',
              user.token,
              {
                domain: '.herokuapp.com',
                secure: isProduction,
                maxAge: 2147483647000,
                httpOnly: true,
                sameSite: true,
                path: '/'
              }
            )
            .json({
              name: user.name,
              username: user.username,
              isAdmin: user.isAdmin,
              placeId: user.placeId,
              placeName: user.placeName
            })
        } else {
          res.sendStatus(401)
        }
      })
      .catch(next)
  })

  return router
}

module.exports = makeLoginRouter
