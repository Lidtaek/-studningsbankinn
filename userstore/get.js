
function makeGetUser (redisClient) {
  return (token) => {
    return redisClient.get(token)
  }
}

module.exports = makeGetUser
