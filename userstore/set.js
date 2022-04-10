
function makeSetUser (redisClient) {
  return (user) => {
    return redisClient.set(user.token, JSON.stringify(user))
  }
}

module.exports = makeSetUser
