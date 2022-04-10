function makeGetUser (redisClient) {
  return (token) => {
    return new Promise((resolve, reject) => {
      redisClient.get(token, (err, reply) => {
        if (err) {
          return reject(new Error(err))
        }
        return resolve(reply)
      }
      )
    })
  }
}

module.exports = makeGetUser