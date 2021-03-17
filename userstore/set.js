
function makeSetUser (redisClient) {
  return (user) => {
    return new Promise((resolve, reject) => {
      redisClient.set(user.token, JSON.stringify(user), (err, reply) => {
        if (err) {
          return reject(new Error(err))
        }
        return resolve(reply)
      }
      )
    })
  }
}

module.exports = makeSetUser
