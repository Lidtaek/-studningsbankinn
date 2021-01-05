const Router = require('express').Router

function makePlacesRouter (selectPlaces) {
  const router = Router()

  router.get('/', (req, res, next) => {
    return selectPlaces(req.query)
      .then(places => res.json(places))
      .catch(next)
  })

  return router
}

module.exports = makePlacesRouter
