const parseCookie = require('cookie').parse

function makeAuthorize (redisClient, logger) {
  return function authorize () {
    return (req, res, next) => {
      return next()

      const token = getToken(req.headers)
      if (token) {
        console.log(token)
        redisClient.get(token, (err, reply) => {
          if (err) {
            logger.error('Error authorizing')
            logger.error(err)
            return res.sendStatus(401)
          }
          if (!reply) {
            return res.sendStatus(401)
          }

          req.user = JSON.parse(reply)
          return next()
        })
      } else {
        return res.sendStatus(401)
      }
    }
  }
}

function getToken (headers) {
  let token
  if (headers.cookie) {
    token = parseCookie(headers.cookie).FRI_API_TOKEN
  }

  if (headers.authorization) {
    const parts = headers.authorization.split(' ')
    if (parts.length === 2 && parts[0] === 'Bearer') {
      token = parts[1]
    }
  }
  return token
}

module.exports = makeAuthorize
