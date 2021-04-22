function makeCreateUser (insertUser, selectUser, setUser) {
  return function creatUser (obj) {
    return insertUser(obj)
      .then(selectUser)
      .then(users => {
        const user = users[0]
        setUser(user)
        return user
      })
  }
}

module.exports = makeCreateUser
