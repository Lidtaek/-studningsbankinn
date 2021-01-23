function makeCreateUser (insertUser, selectUser, setUser) {
  return function creatUser (obj) {
    return insertUser(obj)
      .then(selectUser)
      .then(users => setUser(users[0]))
  }
}

module.exports = makeCreateUser
