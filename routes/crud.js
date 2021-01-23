const Router = require('express').Router

function makeCrudRouter (select, insert, update, del) {
  const router = Router()

  router.get('/', (req, res, next) => {
    return select(req.query, req.user)
      .then(places => res.json(places))
      .catch(next)
  })

  router.put('/', (req, res, next) => {
    if (req.user) {
      return update(req.body)
        .then(id => res.json({ id }))
        .catch(next)
    }

    res.sendStatus(401)
  })

  router.post('/', (req, res, next) => {
    if (req.user && req.user.isAdmin) {
      return insert(req.body)
        .then(id => res.json({ id }))
        .catch(next)
    }

    res.sendStatus(401)
  })

  router.delete('/', (req, res, next) => {
    if (req.user && req.user.isAdmin) {
      return del(req.body)
        .then(id => res.json({ id }))
        .catch(next)
    }

    res.sendStatus(401)
  })

  return router
}

module.exports = makeCrudRouter
