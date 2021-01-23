function makeUpdateUsers (db) {
  return (user) => {
    const params = [
      user.name,
      user.placeId || null,
      user.placeCategoryId || null,
      user.id
    ]

    const sql = `
      UPDATE users
      SET
        name = $1,
        placeid = $2,
        placecategoryid = $3
      WHERE
        id = $4
      RETURNING
        id`

    return db
      .query(sql, params)
      .then(res => ({ id: res.rows[0].id }))
  }
}

module.exports = makeUpdateUsers
