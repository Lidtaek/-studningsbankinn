const Router = require('express').Router

function makePlacesRouter (select, insert, update, del) {
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

  router.put('/', (req, res, next) => {
    return update(req.body)
      .then(id => res.json({ id }))
      .catch(next)
  })

  router.delete('/', (req, res, next) => {
    return del(req.body)
      .then(id => res.json({ id }))
      .catch(next)
  })

  return router
}

module.exports = makePlacesRouter
