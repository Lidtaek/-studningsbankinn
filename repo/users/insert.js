const { genSaltSync, hashSync } = require('bcryptjs')
const uid = require('uid-safe')

function makeInsertUsers (db, updateUserStore) {
  return (user) => {
    // TODO: Not use sync versions
    let password
    if (user.password) {
      const salt = genSaltSync(10)
      password = hashSync(user.password, salt)
    }
    const token = uid.sync(24)
    updateUserStore(token, user)

    const params = [
      user.username,
      password,
      user.name,
      user.placeId,
      token
    ]

    const sql = `
      INSERT INTO users(
       username,
       password,
       name,
       placeid,
       token
      )
      VALUES (
        $1, $2, $3, $4, $5
      )
      RETURNING
        id`

    return db
      .query(sql, params)
      .then(res => res.rows[0].id)
  }
}

module.exports = makeInsertUsers
