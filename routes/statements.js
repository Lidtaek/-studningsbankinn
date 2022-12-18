const Router = require('express').Router

function makeStatementsRouter (select, insert, update, del, score) {
  const router = Router()

  router.get('/', (req, res, next) => {
    return select(req.query, req.user)
      .then(list => res.json(list))
      .catch(next)
  })  

  router.put('/', (req, res, next) => {
    if (req.user && req.user.id) {
      return update(req.body)
        .then(obj => res.json(obj))
        .catch(next)
    }

    res.sendStatus(401)
  })

  router.post('/', (req, res, next) => {
    if (req.user && req.user.isAdmin) {
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

  router.post('/score', (req, res, next) => {
    return score(req.body, req.user)
      .then(list => res.json(list))
      .catch(next)
  })

  return router
}

module.exports = makeStatementsRouter
