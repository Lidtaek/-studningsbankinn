
function makeSetUser (redisClient) {
  return (token, user) => {
    return new Promise((resolve, reject) => {
      console.log(user)
      redisClient.set(token, JSON.stringify(user), (err, reply) => {
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
