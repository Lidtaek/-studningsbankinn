const Router = require('express').Router

function makeCrudRouter (select, insert, update, del) {
  const router = Router()

  router.get('/', (req, res, next) => {
    return select(req.query, req.user)
      .then(list => res.json(list))
      .catch(next)
  })

  router.put('/', (req, res, next) => {
    if (req.user) {
      return update(req.body, req.user)
        .then(obj => res.json(obj))
        .catch(next)
    }

    res.sendStatus(401)
  })

  router.post('/', (req, res, next) => {
    if (req.user) {
      return insert(req.body, req.user)
        .then(obj => res.json(obj))
        .catch(next)
    }

    res.sendStatus(401)
  })

  router.delete('/', (req, res, next) => {
    if (req.user && req.user.isAdmin) {
      return del(req.body)
        .then(obj => res.json(obj))
        .catch(next)
    }

    res.sendStatus(401)
  })

  return router
}

module.exports = makeCrudRouter
