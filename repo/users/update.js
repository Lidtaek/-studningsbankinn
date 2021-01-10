function makeUpdateUsers (db, updateUserStore) {
  return (user) => {
    const params = [
      user.name,
      user.placeId || null,
      user.id
    ]

    updateUserStore(user.token, user)

    const sql = `
      UPDATE users
      SET
        name = $1,
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
