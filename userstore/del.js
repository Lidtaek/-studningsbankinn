function makeDelUser (redisClient) {
  return (token) => {
    return new Promise((resolve, reject) => {
      redisClient.del(token, (err, reply) => {
        if (err) {
          return reject(new Error(err))
        }
        return resolve(reply)
      })
    })
  }
}

module.exports = makeDelUser