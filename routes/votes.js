const Router = require('express').Router

function makeVotesRouter (select, insert) {
  const router = Router()

  router.get('/', (req, res, next) => {
    return select(req.query, req.clientIp)
      .then(list => res.json(list))
      .catch(next)
  })

  router.post('/', (req, res, next) => {
    return insert(req.body, req.clientIp)
      .then(obj => res.json(obj))
      .catch(next)
  })

  return router
}

module.exports = makeVotesRouter
