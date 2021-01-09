function makeDeleteUsers (db) {
  return (user) => {
    const params = [
      user.id
    ]

    const sql = `
      DELETE FROM
        users
      WHERE
        id = $1
      RETURNING
        id`

    return db
      .query(sql, params)
      .then(res => res.rows[0].id)
  }
}

module.exports = makeDeleteUsers
