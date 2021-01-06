const Router = require('express').Router

function makePlacesRouter (select, insert) {
  const router = Router()

  router.get('/', (req, res, next) => {
    return select(req.query)
      .then(places => res.json(places))
      .catch(next)
  })

  router.post('/', (req, res, next) => {
    return insert(req.body)
      .then(id => res.json({ id }))
      .catch(next)
  })

  return router
}

module.exports = makePlacesRouter
