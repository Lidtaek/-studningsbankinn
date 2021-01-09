const { genSaltSync, hashSync } = require('bcryptjs')

function makeInsertUsers (db) {
  return (user) => {
    // TODO: Not use sync versions
    const salt = genSaltSync(10)
    const password = hashSync(user.password, salt)

    const params = [
      user.username,
      password,
      user.name,
      user.placeId
    ]

    const sql = `
      INSERT INTO users(
       username,
       password,
       name,
       placeid
      )
      VALUES (
        $1, $2, $3, $4
      )
      RETURNING
        id`

    return db
      .query(sql, params)
      .then(res => res.rows[0].id)
  }
}

module.exports = makeInsertUsers
