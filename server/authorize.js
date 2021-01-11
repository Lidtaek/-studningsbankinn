const parseCookie = require('cookie').parse
const makeGetUser = require('../userstore/get')
function makeAuthorize (redisClient, logger) {
  const getUser = makeGetUser(redisClient)

  return function authorize () {
    return (req, res, next) => {
      const token = getToken(req.headers)
      if (token) {
        return getUser(token)
          .then(reply => {
            if (!reply) {
              return res.sendStatus(401)
            }

            req.user = JSON.parse(reply)
            return next()
          })
          .catch(err => {
            logger.error('Error authorizing')
            logger.error(err)
            return res.sendStatus(401)
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
    token = parseCookie(headers.cookie).STUDNINGSBANKINN_API
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
