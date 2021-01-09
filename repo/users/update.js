function makeUpdateUsers (db) {
  return (user) => {
    const params = [
      user.name,
      user.placeId,
      user.id
    ]

    const sql = `
      UPDATE users
      SET
        username = $1,
        placeid = $2
      WHERE
        id = $3
      RETURNING
        id`

    return db
      .query(sql, params)
      .then(res => res.rows[0].id)
  }
}

module.exports = makeUpdateUsers
