
function makeDelUser (redisClient) {
  return (token) => {    
    return redisClient.del(token)        
  }
}

module.exports = makeDelUser
