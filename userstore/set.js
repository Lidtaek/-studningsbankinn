
function makeSetUser (redisClient) {
  return (token, user) => {
    redisClient.set(token, JSON.stringify({
      name: user.name,
      username: user.username,
      isAdmin: user.isAdmin,
      placeId: user.placeId,
      placeName: user.placeName
    }))
  }
}

module.exports = makeSetUser
