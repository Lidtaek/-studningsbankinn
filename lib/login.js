const { compare } = require('bcryptjs')

function makeLogin (selectUsers, setUser) {
  return function login (username, password) {
    console.log('username', username)
    console.log('password', password)
    return selectUsers({ username }).then(users => {
      console.log('users', users)
      const user = users.length === 1 ? users[0] : undefined

      if (!user) {
        return undefined
      }

      return compare(password, user.password).then(success => {
        console.log('success', success)
        if (!success) {
          return undefined
        } else {
          return setUser(user).then(() => user)
        }
      })
    })
  }
}

module.exports = makeLogin
