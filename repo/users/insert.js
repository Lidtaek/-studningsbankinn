function makeInsertUsers (db) {
  return (user) => {
    const params = [
      user.username,
      user.password,
      user.name,
      user.placeid
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
